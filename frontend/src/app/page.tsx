'use client';

import { useState } from 'react';
import QuestionForm from '@/components/QuestionForm';
import AnswerDisplay from '@/components/AnswerDisplay';
import LoadingIndicator from '@/components/LoadingIndicator';
import { askQuestion } from '@/services/api';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<Array<{question: string, answer: string}>>([]);

  const handleSubmit = async (questionText: string) => {
    if (!questionText.trim()) return;

    setQuestion(questionText);
    setIsLoading(true);
    setError('');

    try {
      const responseAnswer = await askQuestion(questionText);
      setAnswer(responseAnswer);

      // Add to history
      setHistory(prev => [...prev, {
        question: questionText,
        answer: responseAnswer
      }]);
    } catch (err: any) {
      console.error('Error fetching answer:', err);
      setError(err.message || 'An error occurred while fetching the answer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">AI Question & Answer</h1>
          <p className="text-gray-600 mt-2">Ask any question and get an answer powered by AI</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                {error}
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
                  <li key={index} className="p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => {
                        setQuestion(item.question);
                        setAnswer(item.answer);
                      }}>
                    <p className="font-medium text-gray-800 truncate">{item.question}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No questions yet. Try asking something!</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}