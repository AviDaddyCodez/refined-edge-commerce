
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
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
        <Link to="/" className="text-2xl font-satoshi font-bold tracking-tight">
          HOOPS
          <span className="text-electric-violet">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-electric-violet transition-colors">Home</Link>
          <Link to="/products" className="hover:text-electric-violet transition-colors">Products</Link>
          <Link to="/about" className="hover:text-electric-violet transition-colors">About Us</Link>
          <Link to="/blog" className="hover:text-electric-violet transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-electric-violet transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="icon" className="text-white hover:text-electric-violet">
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:text-electric-violet relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-electric-violet text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-electric-violet">
            <Menu className="w-5 h-5" />
          </Button>
          <Link to="/contact">
            <Button className="hidden md:inline-flex bg-electric-violet hover:bg-electric-violet/90">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
