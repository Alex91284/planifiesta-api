#!/bin/bash

# Espera a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté disponible..."

# Espera hasta que la conexión al puerto 5432 del servicio `db` funcione
while ! nc -z db 5432; do
  sleep 1
done

echo "✅ PostgreSQL está activo. Ejecutando migraciones..."

# Ejecuta la creación de tablas
python create_tables.py

echo "🚀 Iniciando el servidor FastAPI..."
# Ejecuta uvicorn (servidor)
uvicorn app.main:app --host 0.0.0.0 --port 8000
