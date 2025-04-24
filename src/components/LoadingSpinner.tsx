
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  useEffect(() => {
    // Disable scrolling on the body when loading spinner is visible
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Main spinner container */}
        <motion.div 
          className="relative w-32 h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer rotating ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-t-electric-violet border-r-soft-purple border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle rotating element */}
          <motion.div 
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-electric-violet border-b-soft-purple border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner pulsing core */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-violet to-soft-purple shadow-glow"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          {/* Decorative orbiting elements */}
          {[...Array(4)].map((_, index) => (
            <motion.div 
              key={index}
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-electric-violet shadow-glow"
              animate={{
                x: Math.cos(index * Math.PI / 2) * 80,
                y: Math.sin(index * Math.PI / 2) * 80,
                scale: [1, 0.8, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Loading text with animated dots */}
        <motion.div 
          className="mt-12 text-white text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center gap-1">
            <span>Loading</span>
            <span className="inline-block space-x-1">
              <motion.span 
                className="inline-block w-1.5 h-1.5 bg-electric-violet rounded-full"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0
                }}
              />
              <motion.span 
                className="inline-block w-1.5 h-1.5 bg-electric-violet rounded-full"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.span 
                className="inline-block w-1.5 h-1.5 bg-electric-violet rounded-full"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [1, 0.5, 1] 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </span>
          </div>
        </motion.div>
        
        {/* Inspirational quote */}
        <motion.p
          className="absolute bottom-[-80px] text-center text-white/60 text-sm max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          "Creating a premium experience for you..."
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
