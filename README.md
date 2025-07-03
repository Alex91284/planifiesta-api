# Planifiesta API

**Planifiesta** es una API construida con FastAPI + PostgreSQL para organizar eventos, gestionar invitados y optimizar presupuestos de forma colaborativa.

---

##  Tecnologías utilizadas en el Backend

- **FastAPI** – Framework web asincrónico
- **SQLAlchemy** – ORM para modelos de base de datos
- **PostgreSQL** – Base de datos relacional
- **Docker + Docker Compose** – Contenerización de la app
- **Pydantic** – Validación de datos
- **Uvicorn** – Servidor ASGI
- **Dotenv** – Variables de entorno

##  Tecnologías utilizadas en el Frondend

-**React** - Libreria de javascript para construir las interfaces de usuario.
-**Vite** - Herramienta de desarrollo rápido que reemplaza a Create React App.
-**React Router** - Herramienta para la navegación entre vistas sin recargar la página.
-**Fetch API** - Para las peticiones HTTP hacia la API backend de FastAPI.
-**CSS Personalizado** - Estilos definidos a mano para un diseño limpio y centrado.
-**JSX** -Estilos definidos a mano para un diseño limpio y centrado.
-**Hooks (useState, useEffect)** - Para manejar estado y efectos secundarios en componentes.
-**Modularización** - Componentes divididos por responsabilidad: Eventos, Usuarios, Aportes.

---

##  Estructura del proyecto

planifiesta/
|
|------ backend/
|        |----- app/
|        |         |----- api/
|        |         |----- core/
|        |         |-----  infrastructure/
|        |         |         |----- db/
|        |         |----- use_cases/
|        |         |----- main/
|        |
|        |----- create_tables.py
|        |----- entrypoint.sh
|        |----- Dockerfile
|        |----- docker-compose.yml
|        |----- .env
|        |----- .env.exaple
|        |----- requirements.txt
|        |----- README.md
|
|----- frontend/
        |----- api/
        |----- pages/
        |----- App.jsx
        |----- App.css
        |----- main.jsx

## Instalación y ejecución local

 Requisitos:
  * Docker y Docker Compose
  * WSL (si se corre en Windows)
  * Acceso al puerto 8000

  # Clona el repositorio
  git clone https://github.com/tu_usuario/planifiesta.git
  cd planifiesta

  # Crea un archivo .env basado en el ejemplo
  cp .env.example .env

  # Construye la imagen y levanta los servicios
  docker compose up --build

  La API estará disponible en:
  http://localhost:8000/docs ← Swagger UI
  http://localhost:8000/redoc ← Documentación alternativa
          

* Las tablas se crean automaticamente al iniciar el contenedor, esto gracias a el archivo entrypoint.sh.

* El script create_tables.py es el encargado de registrar los modelos creados con SQLAlchemy.

* Se debe usar  docker compose logs para verificar los errores que se puedan presentar.

## Autor
Desarrollado por Alex Bolaños como parte de una prueba tecnica de backend.

