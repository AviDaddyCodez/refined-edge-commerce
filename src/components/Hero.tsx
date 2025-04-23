
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ delay: 400 });

  return (
    <section className="min-h-screen relative overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-accent-purple to-electric-violet opacity-20" />
      
      <div className="container mx-auto px-6 pt-12 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-7xl lg:text-8xl font-satoshi font-bold opacity-0"
            >
              Advanced Ball <span className="gradient-text">Technology</span>
            </h1>
            <p
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className="text-xl text-gray-300 max-w-xl opacity-0"
            >
              Precision engineered for ultimate performance. Experience the next generation of basketball technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="group bg-electric-violet hover:bg-electric-violet/90 text-lg px-8 py-6"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-6 border-white/20 hover:bg-white/5"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="relative opacity-0"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass-card p-8">
              <img
                src="/lovable-uploads/56458f9d-9498-4035-9cfa-f760c1fd11df.png"
                alt="Basketball Technology"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-6 max-w-sm">
              <p className="text-electric-violet font-medium">Latest Innovation</p>
              <h3 className="text-xl font-satoshi mt-1">Smart Grip Technology™</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
