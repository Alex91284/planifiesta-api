from enum import Enum
from pydantic import BaseModel, EmailStr
from typing import Optional


class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    tipo_usuario: str  # 'anfitrion' o 'invitado'

class UsuarioOut(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    tipo_usuario: str

    class Config:
        from_attributes = True

class UsuarioEventoOut(BaseModel):  # para anidarlo en EventoOut
    id: int
    nombre: str

    class Config:
        from_attributes = True

class EventoCreate(BaseModel):
    nombre: str
    descripcion: str | None = None
    anfitrion_id: int  # ID del usuario que crea el evento

class EventoUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None

class EventoOut(BaseModel):
    id: int
    nombre: str
    descripcion: str | None = None
    anfitrion_id: int  # muestra información del anfitrión

    class Config:
        from_attributes = True

class EstadoInvitacion(str, Enum):
    pendiente = "pendiente"
    aceptado = "aceptado"
    rechazado = "rechazado"

class InvitacionCreate(BaseModel):
    evento_id: int
    usuario_id: int

class InvitacionRespuesta(BaseModel):
    estado: EstadoInvitacion

class InvitacionOut(BaseModel):
    id: int
    evento_id: int
    usuario_id: int
    estado: EstadoInvitacion

    class Config:
        from_attributes = True

class AporteCreate(BaseModel):
    usuario_id: int
    evento_id: int
    dia: int  # Día del mes
    monto: int

class AporteOut(BaseModel):
    id: int
    usuario_id: int
    evento_id: int
    dia: int
    monto: int

    class Config:
        from_attributes  = True
