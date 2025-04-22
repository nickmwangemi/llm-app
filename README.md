# LLM Q&A Application

An interactive Q&A web application that leverages LLM integration to answer user queries.

## Technologies Used

### Backend
- Python with FastAPI
- LLM Integration Choose one from (ChatGPT, DeepSeek, Gemini, or Claude) - Free tier only (I've made of Gemini in this project.)


### Frontend
- Next.js
- TailwindCSS for styling
- React for component structure

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```sh
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

5. Create a `.env` file based on `.env.example` and add your LLM API key.

6. Start the backend server:
   ```sh
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`.

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## API Documentation

Once the backend is running, you can access the Swagger documentation at `http://localhost:8000/docs`.

## LLM Integration

This application uses [Gemini](https://gemini.google.com/) for generating responses. The system prompts are designed to provide clear, informative answers to user queries.

## Features

- User-friendly interface for submitting questions
- Real-time AI-generated responses
- Responsive design for all device sizes
- Loading states for better user experience