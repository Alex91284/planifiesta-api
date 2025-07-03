from sqlalchemy.orm import Session
from app.core.schemas import InvitacionCreate, EstadoInvitacion
from app.infrastructure.db.models import Invitacion

def crear_invitacion(db: Session, datos: InvitacionCreate):
    invitacion = Invitacion(**datos.dict())
    db.add(invitacion)
    db.commit()
    db.refresh(invitacion)
    return invitacion

def actualizar_estado(db: Session, invitacion_id: int, estado: EstadoInvitacion):
    invitacion = db.query(Invitacion).filter(Invitacion.id == invitacion_id).first()
    if not invitacion:
        return None
    invitacion.estado = estado
    db.commit()
    db.refresh(invitacion)
    return invitacion

def obtener_todas(db: Session):
    return db.query(Invitacion).all()

def obtener_por_id(db: Session, invitacion_id: int):
    return db.query(Invitacion).filter(Invitacion.id == invitacion_id).first()

