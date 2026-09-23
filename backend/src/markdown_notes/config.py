from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

class Settings(BaseSettings):
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 8000
    uploads_dir: Path = Path("uploads")
    max_upload_bytes: int = 1000000
    cors_origins: list[str] = ["http://localhost:5173"]
    grammar_api_url: str = "https://api.languagetool.org/v2/check"
    
    
    model_config = SettingsConfigDict(env_file=".env")
    
settings = Settings()