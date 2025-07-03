from typing import List
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app.core.schemas import InvitacionCreate, InvitacionOut, InvitacionRespuesta
from app.use_cases import invitacion_service
from app.infrastructure.db.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/invitaciones", response_model=InvitacionOut)
def crear_invitacion(invitacion: InvitacionCreate, db: Session = Depends(get_db)):
    return invitacion_service.invitar_usuario(db, invitacion)

@router.put("/invitaciones/{invitacion_id}", response_model=InvitacionOut)
def actualizar_estado(invitacion_id: int, respuesta: InvitacionRespuesta, db: Session = Depends(get_db)):
    resultado = invitacion_service.responder_invitacion(db, invitacion_id, respuesta.estado)
    if not resultado:
        raise HTTPException(status_code=404, detail="Invitación no encontrada")
    return resultado

@router.get("/invitaciones", response_model=List[InvitacionOut])
def listar_invitaciones(db: Session = Depends(get_db)):
    return invitacion_service.listar_invitaciones(db)

@router.get("/invitaciones/{invitacion_id}", response_model=InvitacionOut)
def obtener_invitacion(invitacion_id: int = Path(...), db: Session = Depends(get_db)):
    invitacion = invitacion_service.obtener_invitacion(db, invitacion_id)
    if not invitacion:
        raise HTTPException(status_code=404, detail="Invitación no encontrada")
    return invitacion

