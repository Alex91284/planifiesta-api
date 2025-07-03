from sqlalchemy import Column, Integer, String, ForeignKey, Enum as PgEnum, Float
from sqlalchemy.orm import relationship
from app.infrastructure.db.database import Base
import enum

# Modelo Usuario
class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    tipo_usuario = Column(String, nullable=False)  # 'anfitrion' o 'invitado'

    eventos = relationship("Evento", back_populates="anfitrion")

# Modelo Evento
class Evento(Base):
    __tablename__ = "eventos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String, nullable=True)

    anfitrion_id = Column(Integer, ForeignKey("usuarios.id"))
    anfitrion = relationship("Usuario", back_populates="eventos")

class EstadoInvitacionEnum(str, enum.Enum):
    pendiente = "pendiente"
    aceptado = "aceptado"
    rechazado = "rechazado"

class Invitacion(Base):
    __tablename__ = "invitaciones"

    id = Column(Integer, primary_key=True, index=True)
    evento_id = Column(Integer, ForeignKey("eventos.id"))
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    estado = Column(PgEnum(EstadoInvitacionEnum), default=EstadoInvitacionEnum.pendiente)

    evento = relationship("Evento", backref="invitaciones")
    usuario = relationship("Usuario", backref="invitaciones")

class Aporte(Base):
    __tablename__ = "aportes"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    evento_id = Column(Integer, ForeignKey("eventos.id"), nullable=False)
    dia = Column(Integer, nullable=False)
    monto = Column(Integer, nullable=False)

    usuario = relationship("Usuario", backref="aportes")
    evento = relationship("Evento", backref="aportes")
