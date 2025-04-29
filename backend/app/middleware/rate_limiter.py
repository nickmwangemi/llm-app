import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Dict, List
import os

# Default configuration
DEFAULT_RATE_LIMIT = int(os.getenv("RATE_LIMIT_REQUESTS", "10"))  # requests
DEFAULT_RATE_LIMIT_PERIOD = int(os.getenv("RATE_LIMIT_PERIOD", "60"))  # seconds


class RateLimiter(BaseHTTPMiddleware):
	def __init__(
			self,
			app,
			requests_limit: int = DEFAULT_RATE_LIMIT,
			period: int = DEFAULT_RATE_LIMIT_PERIOD
	):
		super().__init__(app)
		self.requests_limit = requests_limit
		self.period = period
		self.request_history: Dict[str, List[float]] = {}

	async def dispatch(self, request: Request, call_next) -> Response:
		# Get client IP
		client_ip = request.client.host if request.client else "unknown"

		# Only rate limit API routes
		if request.url.path.startswith("/api/qa"):
			# Check if client has exceeded rate limit
			if self.is_rate_limited(client_ip):
				return Response(
					content="Rate limit exceeded. Please try again later.",
					status_code=429,
					media_type="text/plain"
				)

			# Record this request
			self.record_request(client_ip)

		# Process the request
		response = await call_next(request)

		# Add rate limit headers for API routes
		if request.url.path.startswith("/api/"):
			remaining = self.get_remaining_requests(client_ip)
			response.headers["X-RateLimit-Limit"] = str(self.requests_limit)
			response.headers["X-RateLimit-Remaining"] = str(remaining)
			response.headers["X-RateLimit-Reset"] = str(int(time.time() + self.period))

		return response

	def is_rate_limited(self, client_ip: str) -> bool:
		"""Check if the client has exceeded their rate limit."""
		if client_ip not in self.request_history:
			return False

		# Clean old requests
		self.clean_old_requests(client_ip)

		# Check against limit
		return len(self.request_history[client_ip]) >= self.requests_limit

	def record_request(self, client_ip: str) -> None:
		"""Record a request for the client."""
		current_time = time.time()

		if client_ip not in self.request_history:
			self.request_history[client_ip] = []

		self.request_history[client_ip].append(current_time)

	def clean_old_requests(self, client_ip: str) -> None:
		"""Clean requests older than the rate limit period."""
		if client_ip not in self.request_history:
			return

		current_time = time.time()
		cut_off = current_time - self.period

		self.request_history[client_ip] = [
			req_time for req_time in self.request_history[client_ip]
			if req_time > cut_off
		]

	def get_remaining_requests(self, client_ip: str) -> int:
		"""Get the number of remaining requests for the client."""
		if client_ip not in self.request_history:
			return self.requests_limit

		self.clean_old_requests(client_ip)
		return max(0, self.requests_limit - len(self.request_history[client_ip]))