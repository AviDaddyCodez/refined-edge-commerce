
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-deep-purple bg-opacity-80 z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-electric-violet rounded-full opacity-30 animate-ping absolute"></div>
        
        {/* Middle ring */}
        <div className="w-16 h-16 border-4 border-t-soft-purple border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Inner circle */}
        <div className="w-8 h-8 bg-gradient-to-br from-electric-violet to-soft-purple rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
