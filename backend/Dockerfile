# 1. Imagen base
FROM python:3.10-slim

# 2. Instalar netcat y dependencias del sistema
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*


# 3. Setea directorio de trabajo dentro del contenedor
WORKDIR /app

# 4. Copia tus archivos al contenedor
COPY . .
RUN chmod +x ./entrypoint.sh


# 5. Instala dependencias
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 6. Expone el puerto de FastAPI
EXPOSE 8000

# 7. Comando por defecto para ejecutar el servidor
ENTRYPOINT ["./entrypoint.sh"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
