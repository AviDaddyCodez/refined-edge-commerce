
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  // Simulate page load to add initial animations
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
      <CustomCursor />
      <Navigation />
      <Hero />
      <Collection />
      <About />
      <Testimonials />
      <Newsletter />
      
      <footer className="bg-white py-12">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-space text-lg mb-4">LUMA</h3>
              <p className="text-sm text-charcoal-light">
                Premium lifestyle products for the modern minimalist.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Bestsellers</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Collections</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Our Story</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Sustainability</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Journal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Contact</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Shipping</a></li>
                <li><a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-charcoal-light">
              © {new Date().getFullYear()} LUMA. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">
                Instagram
              </a>
              <a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">
                Pinterest
              </a>
              <a href="#" className="text-charcoal-light hover:text-charcoal transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
