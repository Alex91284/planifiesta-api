from sqlalchemy.orm import Session
from app.core.schemas import UsuarioCreate
from app.infrastructure.db.models import Usuario

def crear_usuario(db: Session, usuario_data: UsuarioCreate):
    nuevo = Usuario(**usuario_data.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def obtener_usuarios(db: Session):
    return db.query(Usuario).all()

def obtener_usuario_por_id(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.id == usuario_id).first()
