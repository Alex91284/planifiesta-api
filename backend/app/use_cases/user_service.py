from sqlalchemy.orm import Session
from app.core.schemas import UsuarioCreate
from app.infrastructure.db import user_repository

def crear_usuario(db: Session, usuario_data: UsuarioCreate):
    return user_repository.crear_usuario(db, usuario_data)

def listar_usuarios(db: Session):
    return user_repository.obtener_usuarios(db)

def obtener_usuario(db: Session, usuario_id: int):
    return user_repository.obtener_usuario_por_id(db, usuario_id)
