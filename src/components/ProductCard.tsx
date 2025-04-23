
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

const ProductCard = ({ image, name, price, category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useScrollAnimation();

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="opacity-0 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md mb-4 aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <button
          className={`absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-charcoal-light mb-1">{category}</p>
      <h3 className="font-space text-lg mb-1">{name}</h3>
      <p className="font-medium">{price}</p>
    </div>
  );
};

export default ProductCard;
