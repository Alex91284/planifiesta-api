from sqlalchemy.orm import Session
from app.core.schemas import AporteCreate
from app.infrastructure.db import aporte_repository, models

def crear_aporte(db: Session, datos: AporteCreate):
    nuevo = models.Aporte(**datos.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def listar_aportes(db: Session):
    return db.query(models.Aporte).all()

def listar_aportes_por_evento(db: Session, evento_id: int):
    return db.query(models.Aporte).filter_by(evento_id=evento_id).all()

def obtener_total_hasta_dia(db: Session, evento_id: int, dia: int):
    return db.query(models.Aporte)\
             .filter(models.Aporte.evento_id == evento_id)\
             .filter(models.Aporte.dia <= dia)\
             .with_entities(models.Aporte.monto)\
             .all()
