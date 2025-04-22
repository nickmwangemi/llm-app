import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({ message = 'Generating answer...' }: LoadingIndicatorProps) {
  const [dots, setDots] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-6">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="flex space-x-2 mb-4">
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-gray-600 text-center">
          {message}{'.'.repeat(dots)}
        </p>
        <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
      </div>
    </div>
  );
}