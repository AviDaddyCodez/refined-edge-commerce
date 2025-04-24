
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, Grid3X3, List, Search } from "lucide-react";
import { useAudioEffect } from "@/hooks/useAudioEffect";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { playSound } = useAudioEffect();
  const location = useLocation();
  
  useEffect(() => {
    // Check for search query in URL
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory("All");
    playSound("click");
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playSound("click");
    // Could add URL updating here if needed
  };

  // Filter products based on selection and search query
  const filteredProducts = productData.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSubcategory = activeSubcategory === "All" || product.subcategory === activeSubcategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
          <motion.h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center bg-gradient-to-r from-electric-violet to-soft-purple bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Products
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our collection of premium products designed with aesthetics and functionality in mind.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-5 pl-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-electric-violet/50 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </form>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-electric-violet/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-soft-purple/20 rounded-full blur-xl"></div>
      </section>
      
      {/* Products section */}
      <section className="py-16 bg-deep-purple relative">
        <div className="container mx-auto px-6">
          {/* Filter controls */}
          <motion.div 
            className="mb-12 flex flex-col space-y-6 glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-sm transition-all rounded-full ${
                    activeCategory === category
                      ? "bg-electric-violet text-white shadow-lg shadow-electric-violet/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {/* Subcategories */}
            {activeCategory !== "All" && (
              <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
                {subcategories[activeCategory as keyof typeof subcategories]?.map((subcategory, index) => (
                  <motion.button
                    key={subcategory}
                    onClick={() => {
                      setActiveSubcategory(subcategory);
                      playSound("click");
                    }}
                    className={`px-3 py-1.5 text-xs transition-all border rounded-full ${
                      activeSubcategory === subcategory
                        ? "border-electric-violet bg-electric-violet/10 text-electric-violet"
                        : "border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    {subcategory}
                  </motion.button>
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
                  onClick={() => {
                    setViewType("grid");
                    playSound("click");
                  }} 
                  className={`p-2 rounded-md transition-all ${viewType === 'grid' ? 'bg-white/10 text-electric-violet' : 'text-white'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  onClick={() => {
                    setViewType("list");
                    playSound("click");
                  }} 
                  className={`p-2 rounded-md transition-all ${viewType === 'list' ? 'bg-white/10 text-electric-violet' : 'text-white'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Search results info */}
          {searchQuery && (
            <motion.div 
              className="mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white">
                {filteredProducts.length > 0 ? (
                  <>
                    Showing {filteredProducts.length} results for <span className="text-electric-violet font-medium">"{searchQuery}"</span>
                  </>
                ) : (
                  <>No results found for <span className="text-electric-violet font-medium">"{searchQuery}"</span></>
                )}
              </p>
            </motion.div>
          )}
          
          {/* Products grid */}
          <div className={`${
            viewType === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  className={viewType === 'list' ? 'glass-card flex gap-6 p-6' : ''}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => playSound("click")}
                >
                  <ProductCard {...product} className={viewType === 'list' ? 'flex-grow max-w-xs' : ''} />
                  {viewType === 'list' && (
                    <div className="flex-grow">
                      <p className="text-xs text-gray-400 mb-1">{product.category} • {product.subcategory}</p>
                      <h3 className="font-space text-lg mb-2 text-white">{product.name}</h3>
                      <p className="font-medium text-electric-violet mb-4">{product.price}</p>
                      <p className="text-gray-300 mb-4">
                        Premium quality product with modern design and exceptional craftsmanship.
                      </p>
                      <button 
                        className="bg-electric-violet text-white px-4 py-2 rounded-md hover:bg-electric-violet/90 transition-all"
                        onClick={() => playSound("add-to-cart")}
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg text-white mb-4">No products match your selection.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                    setActiveSubcategory("All");
                    playSound("click");
                  }}
                  className="bg-electric-violet hover:bg-electric-violet/90 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
