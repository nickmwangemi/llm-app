const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Send a question to the API and get an answer
 */
export async function askQuestion(question: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/qa/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to get answer');
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}