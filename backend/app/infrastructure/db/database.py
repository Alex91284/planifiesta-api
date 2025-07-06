import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
from dotenv import load_dotenv

load_dotenv()

# DB_USER = os.getenv("POSTGRES_USER")
# DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = os.getenv("DB_PORT")
# DB_NAME = os.getenv("POSTGRES_DB")

#Conexión a la base de datos con Docker
DATABASE_URL = settings.DATABASE_URL

#Conexión a la base de datos sin Docker
# DATABASE_URL=f"postgresql://postgres:postgres@localhost:5432/planifiesta_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
