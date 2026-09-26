from fastapi import FastAPI
from markdown_notes.config import settings

app = FastAPI(
    title="Markdown Note-Taking API",
    debug=settings.debug
)

@app.get("/health")
async def health():
    return {"ok": True} 