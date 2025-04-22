from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import qa
from app.utils.error_handlers import register_exception_handlers
from app.middleware.rate_limiter import RateLimiter

# Get configuration from environment
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
ENABLE_RATE_LIMITING = os.getenv("ENABLE_RATE_LIMITING", "true").lower() == "true"

app = FastAPI(
    title="LLM Q&A API",
    description="API for answering questions using an LLM",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Add rate limiting middleware if enabled
if ENABLE_RATE_LIMITING:
    app.add_middleware(RateLimiter)

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