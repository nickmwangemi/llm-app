from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import qa
from app.utils.error_handlers import register_exception_handlers

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app = FastAPI(
    title="LLM Q&A API",
    description="API for answering questions using an LLM",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register error handlers
register_exception_handlers(app)

# Include routers
app.include_router(qa.router)


@app.get("/")
async def root():
    return {"message": "Welcome to the LLM Q&A API"}


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}