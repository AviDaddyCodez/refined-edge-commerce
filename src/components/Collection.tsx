
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProductCard from "./ProductCard";

const productData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    name: "Minimalist Table Lamp",
    price: "$129.00",
    category: "Home Decor",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    name: "Ceramic Vase Set",
    price: "$89.00",
    category: "Home Accessories",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4",
    name: "Merino Wool Throw",
    price: "$145.00",
    category: "Textiles",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
    name: "Leather Desk Organizer",
    price: "$75.00",
    category: "Office",
  },
];

const categories = ["All", "Home Decor", "Textiles", "Office", "Accessories"];

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 100 });
  
  const filteredProducts = activeCategory === "All" 
    ? productData 
    : productData.filter(product => product.category === activeCategory);

  return (
    <section id="collections" className="section-padding bg-white relative">
      {/* Background grid neon effect */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="grid-neon-lines w-full h-full"></div>
      </div>
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 bg-gradient-to-r from-electric-violet to-soft-purple px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">Our Collection</span>
          </div>
          <h2 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-3xl md:text-4xl lg:text-5xl mb-4 opacity-0 text-charcoal"
          >
            Featured Collection
          </h2>
          <p 
            ref={subtitleRef as React.RefObject<HTMLParagraphElement>} 
            className="text-lg text-charcoal-light max-w-2xl mx-auto opacity-0"
          >
            Discover our most popular products crafted with premium materials and exceptional attention to detail.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 p-1 bg-gray-100 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm transition-all rounded-full ${
                  activeCategory === category
                    ? "bg-charcoal text-white shadow-md"
                    : "text-charcoal-light hover:text-charcoal"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal/90 text-white px-8 py-3 rounded-md transition-all">
            View All Products
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3L14 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collection;
