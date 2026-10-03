from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from markdown_notes.config import settings
from markdown_notes.routers.notes import router as note_router

app = FastAPI(
    title="Markdown Note-Taking API",
    debug=settings.debug
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=note_router)

@app.get("/health")
async def health():
    return {"ok": True} 