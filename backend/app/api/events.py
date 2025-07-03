from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.db.database import SessionLocal
from app.core.schemas import EventoCreate, EventoOut, EventoUpdate
from app.use_cases import event_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/eventos", response_model=EventoOut)
def crear_evento(evento: EventoCreate, db: Session = Depends(get_db)):
    return event_service.crear_evento(db, evento)

@router.get("/eventos", response_model=list[EventoOut])
def listar_eventos(db: Session = Depends(get_db)):
    return event_service.listar_eventos(db)

@router.put("/eventos/{evento_id}", response_model=EventoOut)
def actualizar_evento(evento_id: int, evento_data: EventoUpdate, db: Session = Depends(get_db)):
    evento = event_service.actualizar_evento(db, evento_id, evento_data)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return evento

@router.delete("/eventos/{evento_id}")
def eliminar_evento(evento_id: int, db: Session = Depends(get_db)):
    evento = event_service.eliminar_evento(db, evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return {"message": "Evento eliminado correctamente"}
