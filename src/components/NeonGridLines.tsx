
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
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute h-full w-px"
              style={{
                left: `${(i / 23) * 100}%`,
                background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.05))',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.1)'
              }}
            />
          ))}
        </div>
        {/* Horizontal lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute w-full h-px"
              style={{
                top: `${(i / 23) * 100}%`,
                background: 'linear-gradient(to right, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.05))',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeonGridLines;
