from pydantic import BaseModel

class Aporte(BaseModel):
    dia: int
    monto: int
