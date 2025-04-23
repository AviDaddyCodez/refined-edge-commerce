
import { useState, useEffect } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-95 backdrop-blur-sm shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="hidden lg:flex items-center space-x-8">
          <a href="#collections" className="text-sm hover:text-charcoal-light transition-colors">
            Collections
          </a>
          <a href="#about" className="text-sm hover:text-charcoal-light transition-colors">
            About
          </a>
        </div>

        <a href="#" className="text-2xl font-space font-bold tracking-tighter">LUMA</a>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-space font-bold">LUMA</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <a
              href="#collections"
              className="text-xl py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </a>
            <a
              href="#about"
              className="text-xl py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#testimonials"
              className="text-xl py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-xl py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
