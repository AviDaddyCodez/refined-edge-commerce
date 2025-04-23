
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Basketball Technology",
    excerpt: "Exploring how technology has transformed the game of basketball over the decades.",
    category: "Technology",
    date: "April 15, 2025",
    author: "Michael Jordan",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Basketball",
    excerpt: "A comprehensive guide to selecting the right basketball for your playing style and environment.",
    category: "Guides",
    date: "April 10, 2025",
    author: "LeBron James",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
  },
  {
    id: 3,
    title: "The Psychology of Winning",
    excerpt: "Understanding the mental aspects that separate good players from great champions.",
    category: "Psychology",
    date: "April 5, 2025",
    author: "Kobe Bryant",
    image: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2",
  },
  {
    id: 4,
    title: "Basketball Training: Recovery Tips",
    excerpt: "Essential recovery techniques to keep your body in peak condition throughout the season.",
    category: "Training",
    date: "March 28, 2025",
    author: "Stephen Curry",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4",
  },
];

const BlogPage = () => {
  const titleRef = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navigation />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 bg-deep-purple">
        <div className="container mx-auto px-6">
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center"
          >
            Our <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Insights, guides, and stories from the world of basketball.
          </p>
        </div>
      </section>
      
      {/* Blog posts */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const postRef = useScrollAnimation({ delay: index * 100 });
              
              return (
                <div 
                  ref={postRef as React.RefObject<HTMLDivElement>}
                  className="opacity-0"
                  key={post.id}
                >
                  <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{post.category}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      <CardTitle className="text-xl font-satoshi">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto pt-0">
                      <div className="text-sm text-gray-500">
                        By {post.author}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
