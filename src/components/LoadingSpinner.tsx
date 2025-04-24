
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 backdrop-blur-sm">
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring with gradient */}
        <div className="w-20 h-20 rounded-full border-t-4 border-b-4 border-electric-violet animate-spin"></div>
        
        {/* Middle spinning element */}
        <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-t-4 border-r-4 border-soft-purple animate-spin animation-delay-150 opacity-70"></div>
        
        {/* Inner pulsing core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-electric-violet to-soft-purple rounded-full animate-pulse shadow-glow"></div>
        
        {/* Text below with animation */}
        <motion.div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center gap-1">
            <span>Loading</span>
            <span className="inline-block">
              <motion.span 
                className="inline-block"
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0
                }}
              >.</motion.span>
              <motion.span 
                className="inline-block"
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >.</motion.span>
              <motion.span 
                className="inline-block"
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >.</motion.span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
