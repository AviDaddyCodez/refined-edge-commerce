
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 backdrop-blur-sm">
      <div className="relative">
        {/* Outer ring with gradient */}
        <div className="w-20 h-20 rounded-full border-t-4 border-b-4 border-electric-violet animate-spin"></div>
        
        {/* Middle spinning element */}
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-t-4 border-r-4 border-soft-purple animate-spin animation-delay-150 opacity-70"></div>
        
        {/* Inner pulsing core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-electric-violet to-soft-purple rounded-full animate-pulse"></div>
        
        {/* Text below */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
