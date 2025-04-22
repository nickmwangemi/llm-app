import { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export default function QuestionForm({ onSubmit, isLoading }: QuestionFormProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit(question);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          Ask a question:
        </label>
        <textarea
          id="question"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What documents do I need to travel from Kenya to Ireland?"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setQuestion('')}
          className="text-gray-600 hover:text-gray-800"
          disabled={isLoading || !question.trim()}
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Getting Answer...' : 'Submit Question'}
        </button>
      </div>
    </form>
  );
}