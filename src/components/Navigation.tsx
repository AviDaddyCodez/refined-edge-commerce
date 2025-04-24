
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Navigation = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('search');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

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
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80' : 'bg-transparent'
    } backdrop-blur-lg border-b border-white/10`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white relative z-10 flex items-center">
            <span className="gradient-text tracking-tight">EcoNeon</span>
          </Link>
          
          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex relative mx-4 flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white rounded-full pr-12 focus-visible:ring-electric-violet placeholder:text-white/50"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-electric-violet hover:bg-electric-violet/80 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-electric-violet transition-colors">Home</Link>
            <Link to="/products" className="text-white hover:text-electric-violet transition-colors">Products</Link>
            <Link to="/about" className="text-white hover:text-electric-violet transition-colors">About</Link>
            <Link to="/blog" className="text-white hover:text-electric-violet transition-colors">Blog</Link>
            <Link to="/contact" className="text-white hover:text-electric-violet transition-colors">Contact</Link>
            <Link to="/game" className="text-white hover:text-electric-violet transition-colors">Game</Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-white/90 px-3 py-1 rounded-full bg-electric-violet/20 border border-electric-violet/30">
                  {user.email?.split('@')[0]}
                </div>
                <button 
                  onClick={handleSignOut} 
                  className="text-white hover:text-electric-violet transition-colors flex items-center"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-white hover:text-electric-violet transition-colors flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
            
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
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border-white/20 text-white rounded-full pr-12"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-electric-violet hover:bg-electric-violet/80 h-8 w-8"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                About
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                Contact
              </Link>
              <Link 
                to="/game" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
              >
                Game
              </Link>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <User className="h-5 w-5 mr-2 text-electric-violet" />
                    <span className="text-white">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-white py-2 hover:text-electric-violet transition-colors flex items-center"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Login / Sign up</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
