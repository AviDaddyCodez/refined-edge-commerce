
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white relative z-10 flex items-center">
            <span className="gradient-text">EcoNeon</span>
          </Link>
          
          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex relative mx-4 flex-1 max-w-md"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white rounded-full pr-10 focus-visible:ring-electric-violet"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-electric-violet transition-colors">Home</Link>
            <Link to="/products" className="text-white hover:text-electric-violet transition-colors">Products</Link>
            <Link to="/about" className="text-white hover:text-electric-violet transition-colors">About</Link>
            <Link to="/blog" className="text-white hover:text-electric-violet transition-colors">Blog</Link>
            <Link to="/contact" className="text-white hover:text-electric-violet transition-colors">Contact</Link>
            <Link to="/game" className="text-white hover:text-electric-violet transition-colors">Game</Link>
            <Link to="/auth" className="text-white hover:text-electric-violet transition-colors flex items-center">
              <User className="h-5 w-5 mr-1" />
              <span>Login</span>
            </Link>
            <button 
              onClick={toggleCart} 
              className="text-white hover:text-electric-violet transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric-violet text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={toggleCart} 
              className="text-white hover:text-electric-violet transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric-violet text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={toggleMobileMenu} 
              className="text-white"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white rounded-full pr-10"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                About
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                Contact
              </Link>
              <Link 
                to="/game" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors"
              >
                Game
              </Link>
              <Link 
                to="/auth" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                <User className="h-5 w-5 mr-2" />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
