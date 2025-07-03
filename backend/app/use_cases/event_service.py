from sqlalchemy.orm import Session
from app.core.schemas import EventoCreate
from app.infrastructure.db import repository
from app.core.schemas import EventoUpdate

def crear_evento(db: Session, evento_data: EventoCreate):
    return repository.create_event(db, evento_data)

def actualizar_evento(db: Session, evento_id: int, evento_data: EventoUpdate):
    return repository.update_event(db, evento_id, evento_data.dict(exclude_unset=True))

def eliminar_evento(db: Session, evento_id: int):
    return repository.delete_event(db, evento_id)

def listar_eventos(db: Session):
    return repository.get_all_events(db)
