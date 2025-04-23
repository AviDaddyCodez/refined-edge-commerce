
import React from 'react';

interface NeonGridLinesProps {
  opacity?: number;
  className?: string;
}

const NeonGridLines: React.FC<NeonGridLinesProps> = ({ opacity = 0.1, className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`} style={{ opacity }}>
      <div className="w-full h-full">
        {/* Vertical lines */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`v-${i}`} className="w-px h-full bg-gradient-to-b from-electric-violet via-soft-purple to-transparent"></div>
          ))}
        </div>
        {/* Horizontal lines */}
        <div className="absolute inset-0 grid grid-rows-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`h-${i}`} className="w-full h-px bg-gradient-to-r from-electric-violet via-soft-purple to-transparent"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeonGridLines;
