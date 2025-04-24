
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronRight, Calendar, User, Tag, Search } from "lucide-react";
import { useAudioEffect } from "@/hooks/useAudioEffect";
import LoadingSpinner from "@/components/LoadingSpinner";

const categories = ["All", "Technology", "Guides", "Psychology", "Training"];

const blogPosts = [
  {
    id: "1",
    title: "The Evolution of Basketball Technology",
    excerpt: "Exploring how technology has transformed the game of basketball over the decades.",
    category: "Technology",
    date: "April 15, 2025",
    author: "Michael Jordan",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "2",
    title: "How to Choose the Perfect Basketball",
    excerpt: "A comprehensive guide to selecting the right basketball for your playing style and environment.",
    category: "Guides",
    date: "April 10, 2025",
    author: "LeBron James",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: "3",
    title: "The Psychology of Winning",
    excerpt: "Understanding the mental aspects that separate good players from great champions.",
    category: "Psychology",
    date: "April 5, 2025",
    author: "Kobe Bryant",
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "4",
    title: "Basketball Training: Recovery Tips",
    excerpt: "Essential recovery techniques to keep your body in peak condition throughout the season.",
    category: "Training",
    date: "March 28, 2025",
    author: "Stephen Curry",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "5",
    title: "The Future of Basketball Analytics",
    excerpt: "How big data and AI are changing the way teams strategize and players train.",
    category: "Technology",
    date: "March 22, 2025",
    author: "Giannis Antetokounmpo",
    image: "https://images.unsplash.com/photo-1518683448384-b5e5312e3c1c",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Mental Preparation Before Big Games",
    excerpt: "Techniques to focus your mind and overcome pre-game anxiety for peak performance.",
    category: "Psychology",
    date: "March 15, 2025",
    author: "Kevin Durant",
    image: "https://images.unsplash.com/photo-1542652694-40abf526446e",
    readTime: "6 min read",
    featured: false,
  },
];

const BlogPage = () => {
  const titleRef = useScrollAnimation();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { playSound } = useAudioEffect();
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navigation />
      
      {/* Hero section with neon grid lines */}
      <section className="pt-32 pb-20 bg-deep-purple relative overflow-hidden">
        {/* Neon grid lines in background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="w-full h-full grid grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-gradient-to-b from-electric-violet via-soft-purple to-transparent"></div>
            ))}
          </div>
          <div className="w-full h-full grid grid-rows-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-gradient-to-r from-electric-violet via-soft-purple to-transparent"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Insights, guides, and stories from the world of basketball.
          </motion.p>
          
          {/* Search bar */}
          <motion.div 
            className="mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => playSound("click")}
                className="w-full py-3 px-5 pl-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-electric-violet/50 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured posts */}
      <section className="py-16 bg-gradient-to-b from-deep-purple to-black">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-satoshi font-bold mb-8 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="text-electric-violet">Stories</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link to={`/blog/${post.id}`} className="group block">
                  <div className="relative h-80 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-electric-violet/80 text-white text-xs rounded-full backdrop-blur-sm">
                          {post.category}
                        </span>
                        <span className="text-white/80 text-xs flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-electric-violet transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-3 text-white/90">
                        <span className="text-sm">{post.author}</span>
                        <span className="mx-2 text-white/50">•</span>
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories filter */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  playSound("click");
                }}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category 
                    ? "bg-electric-violet text-white shadow-lg shadow-electric-violet/20" 
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog posts grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredPosts.map((post, index) => {
                const postRef = useScrollAnimation({ delay: index * 100 });
                
                return (
                  <motion.div 
                    ref={postRef as React.RefObject<HTMLDivElement>}
                    className="opacity-0"
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => playSound("click")}
                  >
                    <Link to={`/blog/${post.id}`}>
                      <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col bg-white/5 hover:shadow-xl transition-all duration-300 group backdrop-blur-sm">
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <CardHeader className="bg-gradient-to-b from-transparent to-black/5 backdrop-blur-sm">
                          <div className="flex items-center gap-3 text-sm text-white/70 mb-2">
                            <span className="flex items-center gap-1"><Tag size={12} /> {post.category}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                          </div>
                          <CardTitle className="text-xl font-satoshi text-white group-hover:text-electric-violet transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-white/80">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto pt-0 flex items-center justify-between">
                          <div className="text-sm flex items-center gap-1 text-white/60">
                            <User size={12} /> {post.author}
                          </div>
                          <div className="text-electric-violet text-sm font-medium flex items-center gap-1">
                            Read more <ArrowUpRight size={14} />
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-white mb-4">No articles found</h3>
              <p className="text-white/70">Try changing your search criteria or check back later.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  playSound("click");
                }}
                className="mt-6 px-6 py-3 bg-electric-violet text-white rounded-full hover:bg-electric-violet/90 transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
