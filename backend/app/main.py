
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.risk import router as risk_router
from app.core.database import Base, engine
from app.models import Order, ProductionHistory

from app.api.upload import router as upload_router
from app.api.orders import router as orders_router
from app.api.workload import router as workload_router


app = FastAPI(
    title="StitchFlow API",
    description="Tailor Management System API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Register API routers
app.include_router(upload_router)
app.include_router(orders_router)
app.include_router(workload_router)
app.include_router(risk_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to StitchFlow API",
        "status": "running",
    }


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.get("/api/db-health")
def database_health():
    return {"status": "database connected"}
