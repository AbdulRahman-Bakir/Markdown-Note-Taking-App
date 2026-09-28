from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from markdown_notes.database import get_db
from markdown_notes.schemas.note import NoteCreate, NoteResponse, NoteListItem
from markdown_notes.models.note import Note

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


