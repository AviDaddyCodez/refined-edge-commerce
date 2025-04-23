
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-deep-purple border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-satoshi font-bold tracking-tight">
              HOOPS<span className="text-electric-violet">.</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-xs">
              Elevating your game with premium basketball technology and innovative design.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-satoshi font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Product Categories */}
          <div>
            <h3 className="font-satoshi font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Basketballs</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Training Gear</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Apparel</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Limited Editions</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-satoshi font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>123 Basketball Court</p>
              <p>Los Angeles, CA 90001</p>
              <p className="mt-2">info@hoops.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HOOPS. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
