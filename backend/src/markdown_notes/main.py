from fastapi import FastAPI

from markdown_notes.config import settings
from markdown_notes.routers.notes import router as note_router

app = FastAPI(
    title="Markdown Note-Taking API",
    debug=settings.debug
)

app.include_router(router=note_router)

@app.get("/health")
async def health():
    return {"ok": True} 