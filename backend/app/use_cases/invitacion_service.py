from sqlalchemy.orm import Session
from app.core.schemas import InvitacionCreate, EstadoInvitacion
from app.infrastructure.db import invitacion_repository

def invitar_usuario(db: Session, datos: InvitacionCreate):
    return invitacion_repository.crear_invitacion(db, datos)

def responder_invitacion(db: Session, invitacion_id: int, estado: EstadoInvitacion):
    return invitacion_repository.actualizar_estado(db, invitacion_id, estado)

def listar_invitaciones(db: Session):
    return invitacion_repository.obtener_todas(db)

def obtener_invitacion(db: Session, invitacion_id: int):
    return invitacion_repository.obtener_por_id(db, invitacion_id)

