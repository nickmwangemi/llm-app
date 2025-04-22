from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional

from app.services.llm_service import get_llm_response
from app.utils.error_handlers import LLMAPIError, ConfigurationError

router = APIRouter(prefix="/api/qa", tags=["qa"])


class QuestionRequest(BaseModel):
	question: str = Field(..., description="The question to ask the LLM", min_length=1)
	model: Optional[str] = Field(None, description="Optional LLM model to use (if supported)")


class AnswerResponse(BaseModel):
	question: str = Field(..., description="The original question")
	answer: str = Field(..., description="The answer from the LLM")


@router.post(
	"/ask",
	response_model=AnswerResponse,
	summary="Ask a question to the LLM",
	description="Submit a question to be answered by the configured LLM service"
)
async def ask_question(request: QuestionRequest):
	"""
    Ask a question to the AI and get an answer.

    - **question**: The question to ask
    - **model**: (Optional) Specific model to use, if supported by the provider
    """
	try:
		# Validate request
		if not request.question.strip():
			raise HTTPException(status_code=400, detail="Question cannot be empty")

		# Get answer from LLM
		answer = await get_llm_response(request.question)

		# Return response
		return AnswerResponse(question=request.question, answer=answer)

	except ValueError as e:
		# Handle configuration errors
		raise ConfigurationError(str(e))

	except Exception as e:
		# Handle other errors
		raise LLMAPIError(f"Error processing request: {str(e)}")