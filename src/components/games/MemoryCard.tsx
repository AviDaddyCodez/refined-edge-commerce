
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Star } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CardType {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['🌍', '🌱', '🌲', '🌺', '🍀', '🌸', '🌿', '🌻'];

const MemoryCard = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [highScores, setHighScores] = useState<{score: number, created_at: string}[]>([]);
  const [lastScore, setLastScore] = useState<number>(0);

  useEffect(() => {
    initializeGame();
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    const { data, error } = await supabase
      .from('game_scores')
      .select('score, created_at')
      .eq('game_type', 'memory')
      .order('score', { ascending: false })
      .limit(5);
      
    if (!error && data) {
      setHighScores(data);
    }
  };

  const initializeGame = () => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameCompleted(false);
    setGameStarted(false);
  };

  const handleCardClick = (id: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    if (gameCompleted || flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const [firstCard] = flippedCards;
      
      // Check for match
      if (cards[firstCard].icon === cards[id].icon) {
        newCards[firstCard].isMatched = true;
        newCards[id].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatches(m => m + 1);
        
        // Toast for match
        toast.success("Match found!", {
          position: "bottom-center",
        });
        
        if (matches + 1 === ICONS.length) {
          handleGameComplete(moves + 1);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[id].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGameComplete = async (finalMoves: number) => {
    setGameCompleted(true);
    const score = Math.max(100 - (finalMoves - ICONS.length) * 5, 0);
    setLastScore(score);
    
    try {
      // Anonymous insert without user_id for now
      const { error } = await supabase
        .from('game_scores')
        .insert([{ 
          score, 
          game_type: 'memory',
          // user_id is omitted for anonymous play
        }]);
        
      if (error) {
        console.error("Error saving score:", error);
        toast.error("Game complete! Score: " + score + " (Score not saved - login to save scores)");
      } else {
        toast.success(`Game Complete! Score: ${score}`, {
          duration: 5000,
          position: "top-center",
        });
        // Refresh high scores
        fetchHighScores();
      }
    } catch (error) {
      console.error("Failed to save score:", error);
      toast.error("Game complete! Score: " + score + " (Score not saved - try again later)");
    }
  };

  const cardVariants = {
    flipped: { rotateY: 180, scale: 1.05 },
    unflipped: { rotateY: 0, scale: 1 }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Eco Memory Challenge</h2>
        
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="glass-card p-4 flex flex-col items-center min-w-[100px]">
            <div className="text-sm text-green-400 mb-1">Moves</div>
            <div className="text-2xl font-bold">{moves}</div>
          </div>
          
          <div className="glass-card p-4 flex flex-col items-center min-w-[100px]">
            <div className="text-sm text-green-400 mb-1">Matches</div>
            <div className="text-2xl font-bold">{matches}/{ICONS.length}</div>
          </div>
          
          <Button
            onClick={initializeGame}
            className="flex items-center gap-2 bg-electric-violet hover:bg-electric-violet/80 text-white rounded-md hover:scale-105 transition-all border border-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            New Game
          </Button>
        </div>
        
        {gameCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 mb-6 border border-green-400/50"
          >
            <Trophy className="h-10 w-10 mx-auto text-yellow-400 mb-3" />
            <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
            <p className="text-xl mb-3">Your Score: <span className="text-green-400 font-bold">{lastScore}</span></p>
            <Button 
              onClick={initializeGame}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            animate={card.isFlipped || card.isMatched ? "flipped" : "unflipped"}
            variants={cardVariants}
            transition={{ duration: 0.3 }}
            className={`relative h-24 sm:h-28 md:h-32 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`absolute inset-0 rounded-xl transition-all duration-300 flex items-center justify-center ${
              card.isMatched ? 'bg-green-500/30 border-2 border-green-400 shadow-lg shadow-green-400/20' : 
              card.isFlipped ? 'bg-electric-violet border-2 border-electric-violet' : 
              'bg-purple-900/60 border-2 border-white/10 hover:border-electric-violet/50'
            }`}>
              <div className="text-4xl">
                {(card.isFlipped || card.isMatched) ? card.icon : '?'}
              </div>
              
              {card.isMatched && (
                <div className="absolute top-1 right-1">
                  <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* High Scores Section */}
      {highScores.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4 text-center gradient-text">Top Scores</h3>
          <div className="glass-card overflow-hidden border border-white/10">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((score, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 flex items-center">
                      {index === 0 ? (
                        <Trophy className="h-4 w-4 text-yellow-400 mr-2" />
                      ) : (
                        <span className="font-mono w-6 text-center">{index + 1}</span>
                      )}
                    </td>
                    <td className="p-3 font-bold">{score.score}</td>
                    <td className="p-3 text-sm text-gray-400">
                      {new Date(score.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
