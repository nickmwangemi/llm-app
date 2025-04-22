from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse


class LLMAPIError(Exception):
	"""Exception raised when there's an error with the LLM API."""

	def __init__(self, message: str, status_code: int = 500):
		self.message = message
		self.status_code = status_code
		super().__init__(self.message)


class ConfigurationError(Exception):
	"""Exception raised when there's a configuration error."""

	def __init__(self, message: str):
		self.message = message
		super().__init__(self.message)


def register_exception_handlers(app: FastAPI):
	"""Register exception handlers for the FastAPI app."""

	@app.exception_handler(LLMAPIError)
	async def llm_api_exception_handler(request: Request, exc: LLMAPIError):
		return JSONResponse(
			status_code=exc.status_code,
			content={"detail": exc.message, "error_type": "llm_api_error"},
		)

	@app.exception_handler(ConfigurationError)
	async def configuration_exception_handler(request: Request, exc: ConfigurationError):
		return JSONResponse(
			status_code=500,
			content={"detail": exc.message, "error_type": "configuration_error"},
		)

	@app.exception_handler(Exception)
	async def general_exception_handler(request: Request, exc: Exception):
		return JSONResponse(
			status_code=500,
			content={"detail": str(exc), "error_type": "server_error"},
		)