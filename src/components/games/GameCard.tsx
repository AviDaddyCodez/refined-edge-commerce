
import React from 'react';
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface GameCardProps {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ id, icon, isFlipped, isMatched, onClick }) => {
  const cardVariants = {
    flipped: { rotateY: 180, scale: 1.05 },
    unflipped: { rotateY: 0, scale: 1 }
  };

  return (
    <motion.div
      onClick={() => onClick(id)}
      animate={isFlipped || isMatched ? "flipped" : "unflipped"}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className="relative h-24 sm:h-28 md:h-32 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isMatched ? 'bg-green-500/30 border-2 border-green-400 shadow-lg shadow-green-400/20' : 
        isFlipped ? 'bg-electric-violet border-2 border-electric-violet' : 
        'bg-purple-900/60 border-2 border-white/10 hover:border-electric-violet/50'
      }`}>
        <div className="text-4xl">
          {(isFlipped || isMatched) ? icon : '?'}
        </div>
        
        {isMatched && (
          <div className="absolute top-1 right-1">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
