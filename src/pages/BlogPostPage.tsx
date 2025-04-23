
import { useParams } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, Tag, Share2 } from "lucide-react";

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "The Evolution of Basketball Technology",
    excerpt: "Exploring how technology has transformed the game of basketball over the decades.",
    content: `
      <p>Basketball technology has come a long way since the sport's humble beginnings. In this article, we'll explore the fascinating evolution of basketball technology and how it has transformed the game we know and love today.</p>
      
      <h2>The Early Days</h2>
      <p>When Dr. James Naismith invented basketball in 1891, the game was played with a soccer ball and peach baskets nailed to the gymnasium balcony. Players had to retrieve the ball after each successful shot. It wasn't until 1900 that the first actual basketball was created, and the game began to take shape as we know it.</p>
      
      <p>In the early 20th century, basketball equipment was basic and functional. The balls were made of leather panels stitched together, and the courts were often uneven wooden surfaces. Players wore canvas shoes with minimal support, and the game itself was slower and more methodical than today's fast-paced action.</p>
      
      <h2>The Mid-Century Revolution</h2>
      <p>The 1950s and 60s saw significant advancements in basketball technology. Synthetic materials began to replace leather in ball construction, making them more consistent in bounce and grip. Converse released the Chuck Taylor All-Star, the first signature basketball shoe, which dominated the market for decades.</p>
      
      <p>Court surfaces improved dramatically during this period, with uniform hardwood becoming the standard. The introduction of the shot clock in 1954 fundamentally changed game strategy, encouraging faster play and higher scores.</p>
      
      <h2>The Modern Era</h2>
      <p>The last few decades have witnessed an explosion of technological innovations in basketball. Advanced materials like microfiber composites have replaced leather basketballs, offering better grip and consistency regardless of weather conditions.</p>
      
      <p>Basketball shoes have become highly specialized pieces of equipment, with brands investing millions in research and development. Today's shoes feature sophisticated cushioning systems, ankle support structures, and traction patterns designed for specific playing styles.</p>
      
      <h2>Digital Revolution</h2>
      <p>Perhaps the most significant recent development is the integration of digital technology into basketball. Teams use sophisticated analytics systems to track player movement, shot selection, and defensive positioning. Wearable technology monitors player fatigue and performance metrics, helping coaches make data-driven decisions.</p>
      
      <p>Virtual reality training systems allow players to practice scenarios without physical strain, while instant replay and video analysis have become essential coaching tools. Even fan engagement has been transformed by technology, with mobile apps, social media, and immersive broadcast experiences.</p>
      
      <h2>The Future</h2>
      <p>Looking ahead, we can expect even more revolutionary developments in basketball technology. Smart basketballs that track shooting form, AI-powered coaching systems, and advanced materials that prevent injuries are all on the horizon.</p>
      
      <p>As technology continues to evolve, so too will the game of basketball. However, what remains unchanged is the sport's fundamental appeal: the thrill of competition, the beauty of teamwork, and the joy of watching athletes perform at the highest level.</p>
    `,
    category: "Technology",
    date: "April 15, 2025",
    author: "Michael Jordan",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    readingTime: "8 min read",
    tags: ["Technology", "Basketball", "Sports Innovation"],
  },
  {
    id: "2",
    title: "How to Choose the Perfect Basketball",
    excerpt: "A comprehensive guide to selecting the right basketball for your playing style and environment.",
    content: `<p>Lorem ipsum...</p>`,
    category: "Guides",
    date: "April 10, 2025",
    author: "LeBron James",
    authorAvatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    readingTime: "6 min read",
    tags: ["Guides", "Basketball", "Equipment"],
  },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);
  
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  
  // If post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-white text-charcoal">
        <CustomCursor />
        <Navigation />
        <main className="pt-32 pb-20 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-3xl">Blog post not found</h1>
            <p className="mt-4">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <CustomCursor />
      <Navigation />
      
      {/* Featured Image */}
      <div className="w-full h-[50vh] relative bg-deep-purple">
        <img 
          src={post.image} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-purple/90"></div>
        
        {/* Grid neon lines overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="grid-neon-lines w-full h-full"></div>
        </div>
      </div>
      
      <main className="-mt-32 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-lg mb-10">
            {/* Blog post metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span>{post.category}</span>
              </div>
            </div>
            
            {/* Blog post title */}
            <h1 
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-3xl md:text-4xl lg:text-5xl font-satoshi font-bold mb-6 opacity-0"
            >
              {post.title}
            </h1>
            
            {/* Blog post content */}
            <div 
              ref={contentRef as React.RefObject<HTMLDivElement>}
              className="prose prose-lg max-w-none opacity-0 blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            
            {/* Share and tags section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="flex items-center gap-2 text-gray-600 hover:text-electric-violet transition-colors">
                <Share2 size={16} />
                <span>Share This Post</span>
              </button>
            </div>
          </div>
          
          {/* Author section */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-gray-600 mb-4">
                  Professional basketball player and technology enthusiast with over 15 years of experience
                  in the sport. Passionate about sharing knowledge and insights about basketball equipment and innovation.
                </p>
                <div className="flex space-x-4">
                  <button className="text-electric-violet hover:text-electric-violet/80 transition-colors">
                    View all posts
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related posts would go here */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
