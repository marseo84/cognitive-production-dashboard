from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Cognitive Production Analytics API"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173"]
    DB_URL: str = "sqlite+aiosqlite:///./data.db"
    DEBUG: bool = True

    # use model config to specify env file
    model_config = SettingsConfigDict(
        env_file = ".env",
        case_sensitive=True
    )


settings = Settings()
