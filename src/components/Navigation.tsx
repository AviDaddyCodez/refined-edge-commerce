
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag, Home, Store, Info, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-deep-purple/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-satoshi font-bold tracking-tight group">
          HOOPS
          <span className="text-electric-violet group-hover:text-soft-purple transition-colors">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2 hover:text-electric-violet transition-colors">
            <Home size={18} />
            Home
          </Link>
          <Link to="/products" className="flex items-center gap-2 hover:text-electric-violet transition-colors">
            <Store size={18} />
            Products
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-electric-violet transition-colors">
            <Info size={18} />
            About Us
          </Link>
          <Link to="/blog" className="flex items-center gap-2 hover:text-electric-violet transition-colors">
            <BookOpen size={18} />
            Blog
          </Link>
          <Link to="/contact" className="flex items-center gap-2 hover:text-electric-violet transition-colors">
            <Mail size={18} />
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-electric-violet hover:scale-110 transition-all"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-electric-violet hover:scale-110 transition-all relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-electric-violet text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-electric-violet hover:scale-110 transition-all">
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/contact">
            <Button className="hidden md:inline-flex bg-electric-violet hover:bg-electric-violet/90 hover:scale-105 transition-all">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
