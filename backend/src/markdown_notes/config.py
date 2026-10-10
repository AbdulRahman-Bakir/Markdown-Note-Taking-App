from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 8000
    max_upload_bytes: int = 1000000
    cors_origins: list[str] = ["http://localhost:5173"]
    grammar_api_url: str = "https://api.languagetool.org/v2/check"
    database_url: str = "sqlite:///./markdown_notes.db"
    
    model_config = SettingsConfigDict(env_file=".env")
    
settings = Settings()