from pathlib import Path
import markdown
import requests
import nh3

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from markdown_notes.database import get_db
from markdown_notes.schemas.note import(
    NoteCreate,
    NoteResponse,
    NoteListItem,
    RenderedNoteResponse,
    GrammarRequest,
    GrammarResponse
    ) 
from markdown_notes.models.note import Note
from markdown_notes.config import settings

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/", response_model=NoteResponse)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = Note(
        title = note.title,
        content = note.content,
    )
    
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return db_note

@router.get("/", response_model=list[NoteListItem])
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()

@router.get("/{note_id}", response_model=NoteResponse)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    
    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )
    
    return note

@router.put("/{note_id}", response_model=NoteResponse)
def update_note(note_id: int, note_data: NoteCreate, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    
    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )
        
    note.title = note_data.title
    note.content = note_data.content
    
    db.commit()
    db.refresh(note)
    
    return note

@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.get(Note, note_id)
    
    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )
    
    db.delete(note)
    db.commit()
    
    return {"message":"Note deleted successfully"}


@router.post("/upload", response_model=NoteResponse)
async def upload_note(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if Path(file.filename).suffix.lower() != ".md":
        raise HTTPException(
            status_code=400,
            detail="Only .md files are allowed"
        )
    
    content = await file.read()
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=413,
            detail="File is too large"
        )
    
    try:
        markdown_text = content.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="File must be UTF-8 encoded."
        )
    if len(markdown_text.strip()) < 10:
        raise HTTPException(
            status_code=400,
            detail="File content must be at least 10 characters."
        )
    
    title = Path(file.filename).stem
    note = Note(
        title=title,
        content=markdown_text
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    
    return note

@router.get("/{note_id}/html", response_class=HTMLResponse)
def render_note_html(
    note_id: int,
    db: Session = Depends(get_db)
):
    note = db.get(Note, note_id)
    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )
    html = markdown.markdown(
        note.content,
        extensions=["tables", "fenced_code"]
        )
    html = nh3.clean(html)
    
    return HTMLResponse(content=html, status_code=200)
    
@router.post("/grammar")
def check_grammar(request: GrammarRequest):
    try:
        response = requests.post(
            settings.grammar_api_url,
            data={
                "text":request.content,
                "language":"en-US"
            },
            timeout=10
        )
        response.raise_for_status()
        
    except requests.RequestException:
        raise HTTPException(
            status_code=502,
            detail="Grammar checking service is unvailable"
        )
    
    
    data = response.json()
    
    matches = []
    for match in data["matches"]:
        matches.append(
            {
                "message": match["message"],
                "replacements": [
                    replacement["value"]
                    for replacement in match["replacements"]
                ],
                "offset": match["offset"],
                "length": match["length"],
                "sentence": match["sentence"],
            }
        )
        
    return {"matches": matches}