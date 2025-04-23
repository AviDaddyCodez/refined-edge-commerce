
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  category: string;
  subcategory?: string;
  className?: string;
}

const ProductCard = ({ id, image, name, price, category, subcategory, className = "" }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useScrollAnimation();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, image, name, price, category });
    toast.success(`${name} added to cart`);
  };

  return (
    <Link to={`/products/${id}`}>
      <div
        ref={cardRef as React.RefObject<HTMLDivElement>}
        className={`opacity-0 group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4] bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Enhanced overlay with gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          
          {/* Neon glow effect */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? "opacity-20" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-violet/30 to-soft-purple/30"></div>
            <div className="absolute inset-0 border border-electric-violet/30 rounded-xl"></div>
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-4 right-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-md transition-all duration-300 hover:shadow-electric-violet/30 hover:shadow-lg ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          
          {/* Quick view button with enhanced styling */}
          <div
            className={`absolute inset-x-0 bottom-0 text-center transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="py-3 px-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium border-t border-white/10">
              Quick View
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-1">{category} {subcategory ? `• ${subcategory}` : ''}</p>
        <h3 className="font-space text-lg mb-1 group-hover:text-electric-violet transition-colors">{name}</h3>
        <p className="font-medium">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
