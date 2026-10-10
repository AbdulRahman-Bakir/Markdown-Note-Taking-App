import uvicorn
from markdown_notes.config import settings
def main() -> None:
    uvicorn.run("markdown_notes.main:app", host=settings.host, port=settings.port, reload=settings.debug)