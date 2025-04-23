
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const titleRef = useScrollAnimation({ threshold: 0.2 });
  const subtitleRef = useScrollAnimation({ threshold: 0.2, rootMargin: "50px" });
  const imageRef = useScrollAnimation({ threshold: 0.1, rootMargin: "30px" });

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-8">
            <h1
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter opacity-0"
            >
              Modern essentials for mindful living
            </h1>
            <p
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className="text-lg md:text-xl text-charcoal-light max-w-md opacity-0"
            >
              Curated collections of premium lifestyle products designed to elevate your everyday experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="group text-base px-8 py-6 rounded-full transition-all duration-300"
              >
                Shop Collection{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="text-base px-8 py-6 rounded-full bg-transparent border-charcoal/20 hover:bg-charcoal/5"
              >
                Our Story
              </Button>
            </div>
          </div>

          <div ref={imageRef as React.RefObject<HTMLDivElement>} className="relative opacity-0">
            <div className="aspect-square bg-beige-dark rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                alt="Premium lifestyle product"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 px-6 py-4 md:px-8 md:py-6 bg-white rounded-md shadow-sm">
              <p className="font-space text-sm md:text-base">Latest Collection</p>
              <h3 className="font-space text-lg md:text-2xl">Spring Essentials</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
