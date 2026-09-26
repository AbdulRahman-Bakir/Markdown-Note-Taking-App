from datetime import datetime
from pydantic import BaseModel, Field

class NoteCreate(BaseModel):
    title: str = Field(min_length=1, max_length=1000)
    content: str = Field(min_length=10)
    
class NoteListItem(BaseModel):
    id: int
    title: str
    create_at: datetime
    
    model_config = {"from_attributes": True}
    
class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}
    
class RenderedNoteResponse(BaseModel):
    id: int
    title: str
    html: str
    
class GrammarRequest(BaseModel):
    content: str = Field(min_length=1)