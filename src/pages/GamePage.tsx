
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MemoryCard from "@/components/games/MemoryCard";
import NeonGridLines from "@/components/NeonGridLines";

const GamePage = () => {
  return (
    <div className="min-h-screen relative">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <Navigation />
      <div className="container mx-auto py-8">
        <MemoryCard />
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
