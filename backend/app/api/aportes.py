# app/api/aportes.py

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from app.infrastructure.db.session import get_db
from app.use_cases import aporte_service, budget_optimizer
from app.infrastructure.db.models import Aporte
from app.core.schemas import AporteCreate, AporteOut

router = APIRouter()

@router.post("/aportes", response_model=AporteOut)
def registrar_aporte(aporte: AporteCreate, db: Session = Depends(get_db)):
    return aporte_service.crear_aporte(db, aporte)

@router.get("/aportes", response_model=List[AporteOut])
def listar_aportes(db: Session = Depends(get_db)):
    return aporte_service.listar_aportes(db)

@router.get("/aportes/{evento_id}", response_model=List[AporteOut])
def listar_aportes_por_evento(evento_id: int, db: Session = Depends(get_db)):
    return aporte_service.listar_aportes_por_evento(db, evento_id)

@router.get("/presupuesto")
def presupuesto(evento_id: int = Query(...), dia: int = Query(...), db: Session = Depends(get_db)):
    aportes_db = db.query(Aporte).filter(Aporte.evento_id == evento_id).all()

    aportes = [
        {
            "dia": a.dia,
            "monto": a.monto,
        }
        for a in aportes_db
    ]

    resultado = budget_optimizer.calcular_presupuesto(dia, aportes)

    return resultado
