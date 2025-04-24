import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navigation = () => {
  const { toggleCart } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white">
            EcoNeon
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-green-400 transition-colors">Home</Link>
            <Link to="/products" className="text-white hover:text-green-400 transition-colors">Products</Link>
            <Link to="/about" className="text-white hover:text-green-400 transition-colors">About</Link>
            <Link to="/blog" className="text-white hover:text-green-400 transition-colors">Blog</Link>
            <Link to="/contact" className="text-white hover:text-green-400 transition-colors">Contact</Link>
            <Link to="/game" className="text-white hover:text-green-400 transition-colors">Play Game</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={toggleCart} className="text-white hover:text-green-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </button>
            <div className="md:hidden">
              {/* Mobile menu icon or component can be added here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
