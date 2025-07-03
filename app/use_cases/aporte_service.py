from sqlalchemy.orm import Session
from app.core.schemas import AporteCreate
from app.infrastructure.db import aporte_repository

def crear_aporte(db: Session, datos: AporteCreate):
    return aporte_repository.crear_aporte(db, datos)

def listar_aportes(db: Session, evento_id: int):
    return aporte_repository.obtener_aportes_por_evento(db, evento_id)

def calcular_presupuesto(db: Session, evento_id: int, dia: int):
    return aporte_repository.obtener_total_hasta_dia(db, evento_id, dia)
