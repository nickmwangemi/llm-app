'use client';

import { useState } from 'react';
import QuestionForm from '@/components/QuestionForm';
import AnswerDisplay from '@/components/AnswerDisplay';
import LoadingIndicator from '@/components/LoadingIndicator';
import { askQuestion } from '@/services/api';
import useLocalStorage from '@/hooks/useLocalStorage';

interface QAItem {
  question: string;
  answer: string;
  timestamp: number;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useLocalStorage<QAItem[]>('qa-history', []);

  const handleSubmit = async (questionText: string) => {
    if (!questionText.trim()) return;

    setQuestion(questionText);
    setIsLoading(true);
    setError('');

    try {
      const responseAnswer = await askQuestion(questionText);
      setAnswer(responseAnswer);

      // Add to history with timestamp
      const newItem: QAItem = {
        question: questionText,
        answer: responseAnswer,
        timestamp: Date.now()
      };

      // Keep only the last 10 items
      setHistory(prev => [newItem, ...prev.slice(0, 9)]);
    } catch (err: any) {
      console.error('Error fetching answer:', err);
      setError(err.message || 'An error occurred while fetching the answer.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">AI Question & Answer</h1>
          <p className="text-gray-600 mt-2">Ask any question and get an answer powered by AI</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <LoadingIndicator />
            ) : (
              answer && <AnswerDisplay question={question} answer={answer} />
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Questions</h2>
            {history.length > 0 ? (
              <ul className="space-y-3">
                {history.map((item, index) => (
                  <li key={index} className="p-3 hover:bg-gray-50 rounded-md cursor-pointer border border-gray-100"
                      onClick={() => {
                        setQuestion(item.question);
                        setAnswer(item.answer);
                      }}>
                    <p className="font-medium text-gray-800 truncate">{item.question}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(item.timestamp)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No questions yet. Try asking something!</p>
            )}
            {history.length > 0 && (
              <button
                className="mt-4 text-sm text-red-600 hover:text-red-800"
                onClick={() => {
                  if (confirm('Are you sure you want to clear all history?')) {
                    setHistory([]);
                  }
                }}
              >
                Clear History
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}