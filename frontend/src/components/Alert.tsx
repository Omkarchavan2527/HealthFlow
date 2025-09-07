import React from 'react';

type AlertProps = {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
};

const colorMap = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  return (
    <div className={`p-4 rounded-md border ${colorMap[type]} relative`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-xl font-bold leading-none focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
