from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.core.schemas import AporteCreate, AporteOut
from app.infrastructure.db.database import SessionLocal
from app.use_cases import aporte_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/aportes", response_model=AporteOut)
def registrar_aporte(aporte: AporteCreate, db: Session = Depends(get_db)):
    return aporte_service.crear_aporte(db, aporte)

@router.get("/aportes/{evento_id}", response_model=List[AporteOut])
def listar_aportes(evento_id: int, db: Session = Depends(get_db)):
    return aporte_service.listar_aportes(db, evento_id)

@router.get("/presupuesto")
def presupuesto(evento_id: int = Query(...), dia: int = Query(...), db: Session = Depends(get_db)):
    total = aporte_service.calcular_presupuesto(db, evento_id, dia)
    return {"evento_id": evento_id, "dia": dia, "total": total}
