from sqlalchemy.orm import Session
from app.infrastructure.db.models import Aporte
from app.core.schemas import AporteCreate
from sqlalchemy import func


def crear_aporte(db: Session, datos: AporteCreate):
    aporte = Aporte(**datos.dict())
    db.add(aporte)
    db.commit()
    db.refresh(aporte)
    return aporte

def obtener_aportes_por_evento(db: Session, evento_id: int):
    return db.query(Aporte).filter(Aporte.evento_id == evento_id).all()

def obtener_total_hasta_dia(db: Session, evento_id: int, dia: int):
    return db.query(Aporte).filter(
        Aporte.evento_id == evento_id,
        Aporte.dia <= dia
    ).with_entities(func.sum(Aporte.monto)).scalar() or 0.0
