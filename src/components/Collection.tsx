
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
  
  const filteredProducts = activeCategory === "All" 
    ? productData 
    : productData.filter(product => product.category === activeCategory);

  return (
    <section id="collections" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16">
          <h2 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-0 opacity-0"
          >
            Featured Collection
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-charcoal text-white rounded-full"
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
      </div>
    </section>
  );
};

export default Collection;
