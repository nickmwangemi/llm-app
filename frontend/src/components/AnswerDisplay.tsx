import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface AnswerDisplayProps {
  question: string;
  answer: string;
}

export default function AnswerDisplay({ question, answer }: AnswerDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">Your Question:</h3>
        <p className="text-gray-800 mt-1">{question}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Answer:</h2>
        <div className="prose max-w-none text-gray-700">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}