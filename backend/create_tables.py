from app.infrastructure.db.database import Base, engine
from app.infrastructure.db.models import Evento

print("Creando tablas en PostgreSQL...")
Base.metadata.create_all(bind=engine)
