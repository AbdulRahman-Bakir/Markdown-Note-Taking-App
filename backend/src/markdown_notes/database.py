from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from markdown_notes.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False}
)

class Base(DeclarativeBase):
    pass


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

