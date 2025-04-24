
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, Grid3X3, List } from "lucide-react";

const productData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    name: "Minimalist Table Lamp",
    price: "$129.00",
    category: "Home Decor",
    subcategory: "Lighting",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
    name: "Ceramic Vase Set",
    price: "$89.00",
    category: "Home Accessories",
    subcategory: "Decor",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4",
    name: "Merino Wool Throw",
    price: "$145.00",
    category: "Textiles",
    subcategory: "Blankets",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
    name: "Leather Desk Organizer",
    price: "$75.00",
    category: "Office",
    subcategory: "Organization",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b",
    name: "Minimalist Wall Clock",
    price: "$65.00",
    category: "Home Decor",
    subcategory: "Wall Art",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1601056639638-c83b6cf3258a",
    name: "Handcrafted Coffee Mug",
    price: "$35.00",
    category: "Kitchen",
    subcategory: "Drinkware",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    name: "Ergonomic Desk Chair",
    price: "$249.00",
    category: "Office",
    subcategory: "Furniture",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1577207989546-0b6c3cd6c9c0",
    name: "Modern Plant Pot",
    price: "$49.00",
    category: "Home Accessories",
    subcategory: "Plants",
  }
];

const categories = ["All", "Home Decor", "Textiles", "Office", "Kitchen", "Home Accessories"];
const subcategories = {
  "Home Decor": ["All", "Lighting", "Wall Art"],
  "Textiles": ["All", "Blankets", "Pillows", "Rugs"],
  "Office": ["All", "Organization", "Furniture"],
  "Kitchen": ["All", "Cookware", "Drinkware", "Utensils"],
  "Home Accessories": ["All", "Decor", "Plants"]
};

const ProductsPage = () => {
  const titleRef = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [viewType, setViewType] = useState("grid");

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory("All");
  };

  // Filter products based on selection
  const filteredProducts = productData.filter(product => {
    if (activeCategory === "All") return true;
    if (activeSubcategory === "All") return product.category === activeCategory;
    return product.category === activeCategory && product.subcategory === activeSubcategory;
  });

  return (
    <div className="min-h-screen relative bg-deep-purple">
      <CustomCursor />
      <Navigation />

      {/* Background grid neon effect */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="grid-neon-lines w-full h-full"></div>
      </div>
      
      {/* Hero section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center bg-gradient-to-r from-electric-violet to-soft-purple bg-clip-text text-transparent"
          >
            Our Products
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Discover our collection of premium products designed with aesthetics and functionality in mind.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-electric-violet/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-soft-purple/20 rounded-full blur-xl"></div>
      </section>
      
      {/* Products section */}
      <section className="py-16 bg-deep-purple relative">
        <div className="container mx-auto px-6">
          {/* Filter controls */}
          <div className="mb-12 flex flex-col space-y-6 glass-card p-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-sm transition-all rounded-full ${
                    activeCategory === category
                      ? "bg-electric-violet text-white shadow-lg shadow-electric-violet/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Subcategories */}
            {activeCategory !== "All" && (
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
                {subcategories[activeCategory as keyof typeof subcategories]?.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => setActiveSubcategory(subcategory)}
                    className={`px-3 py-1.5 text-xs transition-all border rounded-full ${
                      activeSubcategory === subcategory
                        ? "border-electric-violet bg-electric-violet/10 text-electric-violet"
                        : "border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
            
            {/* View controls */}
            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-white">
                <Filter size={18} />
                <span className="text-sm">
                  {filteredProducts.length} Products
                </span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewType("grid")} 
                  className={`p-2 rounded-md transition-all ${viewType === 'grid' ? 'bg-white/10 text-electric-violet' : 'text-white'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  onClick={() => setViewType("list")} 
                  className={`p-2 rounded-md transition-all ${viewType === 'list' ? 'bg-white/10 text-electric-violet' : 'text-white'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className={`${
            viewType === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className={viewType === 'list' ? 'glass-card flex gap-6 p-6' : ''}>
                  <ProductCard {...product} className={viewType === 'list' ? 'flex-grow max-w-xs' : ''} />
                  {viewType === 'list' && (
                    <div className="flex-grow">
                      <p className="text-xs text-gray-400 mb-1">{product.category} • {product.subcategory}</p>
                      <h3 className="font-space text-lg mb-2 text-white">{product.name}</h3>
                      <p className="font-medium text-electric-violet mb-4">{product.price}</p>
                      <p className="text-gray-300 mb-4">
                        Premium quality product with modern design and exceptional craftsmanship.
                      </p>
                      <button className="bg-electric-violet text-white px-4 py-2 rounded-md hover:bg-electric-violet/90 transition-all">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-300">
                <p className="text-lg">No products match your selection.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
