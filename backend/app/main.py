from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.events import router as eventos_router
from app.api.users import router as users_router
from app.api.invitaciones import router as invitaciones_router
from app.api.aportes import router as aportes_router

app = FastAPI(
    title="Planifiesta API",
    version="1.0.0",
    description="API para gestionar fiestas y optomizar los presupuestos",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Planifiesta 🚀"}

app.include_router(eventos_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(invitaciones_router, prefix="/api")
app.include_router(aportes_router, prefix="/api")