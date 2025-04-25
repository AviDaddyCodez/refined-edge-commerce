import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import GameStats from './GameStats';
import GameCard from './GameCard';
import GameCompleted from './GameCompleted';
import HighScoresTable from './HighScoresTable';

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
      
      if (cards[firstCard].icon === cards[id].icon) {
        newCards[firstCard].isMatched = true;
        newCards[id].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        setMatches(m => m + 1);
        
        toast.success("Match found!", {
          position: "bottom-center",
        });
        
        if (matches + 1 === ICONS.length) {
          handleGameComplete(moves + 1);
        }
      } else {
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
    
    const qualifiesForDiscount = finalMoves < 15;
    
    try {
      const { error } = await supabase
        .from('game_scores')
        .insert([{ 
          score, 
          game_type: 'memory',
        }]);
        
      if (error) {
        console.error("Error saving score:", error);
        toast.error("Game complete! Score: " + score + " (Score not saved - login to save scores)");
      } else {
        if (qualifiesForDiscount) {
          localStorage.setItem('gameDiscount', 'ECOMEM15');
          toast.success(
            <div className="space-y-2">
              <p>🎉 Congratulations! You've won a 15% discount!</p>
              <p className="text-sm">Use code: ECOMEM15 at checkout</p>
            </div>,
            {
              duration: 10000,
              position: "top-center",
            }
          );
        } else {
          toast.success(`Game Complete! Score: ${score}`, {
            duration: 5000,
            position: "top-center",
          });
        }
        fetchHighScores();
      }
    } catch (error) {
      console.error("Failed to save score:", error);
      toast.error("Game complete! Score: " + score + " (Score not saved - try again later)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Eco Memory Challenge</h2>
        
        <GameStats 
          moves={moves}
          matches={matches}
          totalPairs={ICONS.length}
          onNewGame={initializeGame}
        />
        
        {gameCompleted && (
          <GameCompleted 
            score={lastScore}
            onPlayAgain={initializeGame}
          />
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <GameCard
            key={card.id}
            id={card.id}
            icon={card.icon}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>
      
      <HighScoresTable scores={highScores} />
    </div>
  );
};

export default MemoryCard;
