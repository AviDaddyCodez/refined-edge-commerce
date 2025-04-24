
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

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

  useEffect(() => {
    initializeGame();
  }, []);

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
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

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
    const score = Math.max(100 - (finalMoves - ICONS.length) * 5, 0);
    
    try {
      const { error } = await supabase
        .from('game_scores')
        .insert([{ 
          score, 
          game_type: 'memory'
        }]);
        
      if (error) throw error;
      
      toast.success(`Game Complete! Score: ${score}`);
    } catch (error) {
      toast.error("Failed to save score. Try again!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Eco Memory Game</h2>
        <div className="flex justify-center gap-4 mb-4">
          <p className="text-white">Moves: {moves}</p>
          <p className="text-white">Matches: {matches}/{ICONS.length}</p>
        </div>
        <button
          onClick={initializeGame}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mb-4"
        >
          New Game
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-24 flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 
              ${card.isFlipped || card.isMatched ? 'bg-green-500' : 'bg-purple-900'}
              ${card.isMatched ? 'opacity-50' : ''}
              border-2 border-green-400`}
          >
            {(card.isFlipped || card.isMatched) ? card.icon : '?'}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemoryCard;
