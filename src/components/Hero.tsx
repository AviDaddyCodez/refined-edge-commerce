
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ delay: 400 });

  return (
    <section className="min-h-screen relative overflow-hidden pt-24">
      {/* Abstract background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-accent-purple to-electric-violet opacity-20" />
      
      {/* Light beam effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[30vh] bg-electric-violet opacity-10 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-6 pt-16 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm mb-4">
              <Star className="h-3 w-3 text-yellow-300 mr-1" /> 
              <span className="text-white/90">New Collection Available</span>
            </div>
            
            <h1
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-6xl lg:text-7xl font-satoshi font-bold opacity-0 leading-tight"
            >
              Game-Changing <span className="gradient-text">Basketball</span> Technology
            </h1>
            
            <p
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className="text-xl text-gray-300 max-w-xl opacity-0"
            >
              Precision engineered for ultimate performance. Experience the next generation of basketball technology with our eco-friendly neon designs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button
                  className="group bg-electric-violet hover:bg-electric-violet/90 text-lg px-8 py-6"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/20 hover:bg-white/5 backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Testimonial */}
            <div className="mt-12 pt-6 border-t border-white/10">
              <div className="flex items-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-violet to-soft-purple border-2 border-deep-purple"></div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-300" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-white/70">
                    <span className="text-white">500+</span> five-star reviews from our customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="relative opacity-0"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass-card p-8 shadow-glow border border-white/10 backdrop-blur-sm">
              <img
                src="/lovable-uploads/56458f9d-9498-4035-9cfa-f760c1fd11df.png"
                alt="Basketball Technology"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
              />
              
              {/* Floating elements */}
              <div className="absolute top-10 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 rounded-full bg-electric-violet blur-[60px] opacity-60 animate-pulse"></div>
              <div className="absolute bottom-10 left-0 translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-soft-purple blur-[40px] opacity-50 animate-pulse"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 glass-card p-6 max-w-sm backdrop-blur-md border border-white/10 rounded-xl">
              <p className="text-electric-violet font-medium">Latest Innovation</p>
              <h3 className="text-xl font-satoshi mt-1">Smart Grip Technology™</h3>
              <p className="text-sm text-white/70 mt-2">Enhanced control and precision for professional-level play</p>
            </div>
            
            {/* Product badge */}
            <div className="absolute -top-4 -right-4 glass-card p-3 backdrop-blur-md border border-white/10 rounded-full shadow-glow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-violet to-soft-purple flex items-center justify-center text-white font-bold">
                NEW
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
