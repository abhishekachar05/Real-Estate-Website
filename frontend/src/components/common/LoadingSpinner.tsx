import React from 'react';

// Placeholder for LoadingSpinner component
// Will be implemented in the next iteration

const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#E2E8F0] rounded-full" />
        <div className="absolute inset-0 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="font-manrope text-sm text-[#5A5856]">{message}</span>
    </div>
  );
};

export default LoadingSpinner;