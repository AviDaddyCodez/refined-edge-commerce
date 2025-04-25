
import React from 'react';
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameStatsProps {
  moves: number;
  matches: number;
  totalPairs: number;
  onNewGame: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ moves, matches, totalPairs, onNewGame }) => {
  return (
    <div className="flex justify-center items-center gap-6 mb-6">
      <div className="glass-card p-4 flex flex-col items-center min-w-[100px]">
        <div className="text-sm text-green-400 mb-1">Moves</div>
        <div className="text-2xl font-bold">{moves}</div>
      </div>
      
      <div className="glass-card p-4 flex flex-col items-center min-w-[100px]">
        <div className="text-sm text-green-400 mb-1">Matches</div>
        <div className="text-2xl font-bold">{matches}/{totalPairs}</div>
      </div>
      
      <Button
        onClick={onNewGame}
        className="flex items-center gap-2 bg-electric-violet hover:bg-electric-violet/80 text-white rounded-md hover:scale-105 transition-all border border-white/10"
      >
        <RefreshCw className="h-4 w-4" />
        New Game
      </Button>
    </div>
  );
};

export default GameStats;
