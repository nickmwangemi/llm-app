import React from 'react';

interface AnswerDisplayProps {
  question: string;
  answer: string;
}

export default function AnswerDisplay({ question, answer }: AnswerDisplayProps) {
  // Function to format the answer with markdown-like formatting
  const formatAnswer = (text: string) => {
    return text.split('\n').map((paragraph, i) => {
      // Check if the paragraph is a header
      if (paragraph.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold my-4">{paragraph.substring(2)}</h1>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold my-3">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-bold my-2">{paragraph.substring(4)}</h3>;
      }

      // Check if paragraph is a list item
      if (paragraph.startsWith('- ')) {
        return <li key={i} className="ml-6 my-1">{paragraph.substring(2)}</li>;
      }

      // Regular paragraph
      if (paragraph.trim() !== '') {
        return <p key={i} className="my-4">{paragraph}</p>;
      }

      return null;
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">Your Question:</h3>
        <p className="text-gray-800 mt-1">{question}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Answer:</h2>
        <div className="prose max-w-none text-gray-700">
          {formatAnswer(answer)}
        </div>
      </div>
    </div>
  );
}