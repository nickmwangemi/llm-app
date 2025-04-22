from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.services.llm_service import get_llm_response

router = APIRouter(prefix="/api/qa", tags=["qa"])


class QuestionRequest(BaseModel):
    question: str


class AnswerResponse(BaseModel):
    question: str
    answer: str


@router.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    try:
        answer = await get_llm_response(request.question)
        return AnswerResponse(question=request.question, answer=answer)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing request: {str(e)}"
        )
