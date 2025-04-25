
import React from 'react';
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GameCompletedProps {
  score: number;
  onPlayAgain: () => void;
}

const GameCompleted: React.FC<GameCompletedProps> = ({ score, onPlayAgain }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 mb-6 border border-green-400/50"
    >
      <Trophy className="h-10 w-10 mx-auto text-yellow-400 mb-3" />
      <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
      <p className="text-xl mb-3">Your Score: <span className="text-green-400 font-bold">{score}</span></p>
      <Button 
        onClick={onPlayAgain}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Play Again
      </Button>
    </motion.div>
  );
};

export default GameCompleted;
