
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <a href="/" className="text-2xl font-satoshi font-bold tracking-tight">
          HOOPS
          <span className="text-electric-violet">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#products" className="hover:text-electric-violet transition-colors">Products</a>
          <a href="#about" className="hover:text-electric-violet transition-colors">About Us</a>
          <a href="#blog" className="hover:text-electric-violet transition-colors">Blog</a>
          <a href="#contact" className="hover:text-electric-violet transition-colors">Contact</a>
        </nav>

        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="icon" className="text-white hover:text-electric-violet">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-electric-violet">
            <ShoppingBag className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-electric-violet">
            <Menu className="w-5 h-5" />
          </Button>
          <Button className="hidden md:inline-flex bg-electric-violet hover:bg-electric-violet/90">
            Contact us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
