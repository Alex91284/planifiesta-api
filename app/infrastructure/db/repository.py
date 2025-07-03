from sqlalchemy.orm import Session
from app.infrastructure.db import models
from app.core.schemas import EventoCreate

def create_event(db: Session, evento_data: EventoCreate):
    evento = models.Evento(**evento_data.dict())
    db.add(evento)
    db.commit()
    db.refresh(evento)
    return evento

def get_all_events(db: Session):
    return db.query(models.Evento).all()

def get_event_by_id(db: Session, evento_id: int):
    return db.query(models.Evento).filter(models.Evento.id == evento_id).first()

def update_event(db: Session, evento_id: int, evento_data: dict):
    evento = get_event_by_id(db, evento_id)
    if not evento:
        return None
    for key, value in evento_data.items():
        setattr(evento, key, value)
    db.commit()
    db.refresh(evento)
    return evento

def delete_event(db: Session, evento_id: int):
    evento = get_event_by_id(db, evento_id)
    if not evento:
        return None
    db.delete(evento)
    db.commit()
    return evento
