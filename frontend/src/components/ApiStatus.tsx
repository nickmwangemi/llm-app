import React, { useState, useEffect } from 'react';

interface ApiStatusProps {
  apiUrl: string;
}

export default function ApiStatus({ apiUrl }: ApiStatusProps) {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [retryCount, setRetryCount] = useState(0);

  const checkApiStatus = async () => {
    try {
      setStatus('checking');
      const response = await fetch(`${apiUrl}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (error) {
      console.error('API health check failed:', error);
      setStatus('offline');
    }
  };

  useEffect(() => {
    // Initial check
    checkApiStatus();

    // Set up periodic checking
    const interval = setInterval(() => {
      checkApiStatus();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [apiUrl]);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    checkApiStatus();
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`h-2 w-2 rounded-full ${
          status === 'checking' ? 'bg-yellow-500' :
          status === 'online' ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <span className="text-xs text-gray-600">
        API: {status === 'checking' ? 'Checking...' : status === 'online' ? 'Online' : 'Offline'}
      </span>
      {status === 'offline' && (
        <button
          onClick={handleRetry}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Retry
        </button>
      )}
    </div>
  );
}