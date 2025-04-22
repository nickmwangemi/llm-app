# LLM Q&A Application

An interactive Q&A web application that leverages LLM integration to answer user queries.

## Technologies Used

### Backend
- Python with FastAPI
- LLM Integration Choose one from (ChatGPT, DeepSeek, Gemini, or Claude) - Free tier only. This application uses Gemini for generating responses.


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

## Screenshots
User Query: "What documents do I need to travel from Kenya to Ireland?"
![Kenya-to-Ireland](assets/Screenshot%20from%202025-04-22%2015-57-13.png)
![Kenya-to-Ireland](assets/Screenshot%20from%202025-04-22%2015-57-30.png)


User Query: "What are the visa requirements for traveling to the USA from Kenya?"
![Kenya-to-USA](assets/Screenshot%20from%202025-04-22%2015-57-41.png)

User Query: "What is the best time to visit France?"
![Kenya-to-France](assets/Screenshot%20from%202025-04-22%2015-58-19.png)

User Query: "What should I pack for a trip to Japan in December?"
![Kenya-to-Japan](assets/Screenshot%20from%202025-04-22%2015-58-00.png)

## Recent Questions
![Recent-Questions](assets/Screenshot%20from%202025-04-22%2015-58-24.png)
