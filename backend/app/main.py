from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import qa

app = FastAPI(
    title="LLM Q&A API",
    description="API for answering questions using an LLM",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(qa.router)


@app.get("/")
async def root():
    return {"message": "Welcome to the LLM Q&A API"}
