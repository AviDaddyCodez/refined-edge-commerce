
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MemoryCard from "@/components/games/MemoryCard";
import NeonGridLines from "@/components/NeonGridLines";

const GamePage = () => {
  return (
    <div className="min-h-screen relative bg-deep-purple">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Game Zone
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Take a break from shopping and challenge yourself with our eco-themed memory game. 
              Match all the pairs with the fewest moves to score higher!
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8 border border-white/10">
            <MemoryCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
