
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const titleRef = useScrollAnimation();
  const textRef = useScrollAnimation({ rootMargin: "50px" });
  const imageRef = useScrollAnimation();
  const statsRef = useScrollAnimation({ delay: 200 });

  return (
    <section id="about" className="section-padding bg-beige relative overflow-hidden">
      {/* Background grid neon effect */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="grid-neon-lines w-full h-full"></div>
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-6 bg-gradient-to-r from-electric-violet to-soft-purple px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-white">Our Story</span>
            </div>
            <h2
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-3xl md:text-4xl lg:text-5xl mb-6 opacity-0 relative"
            >
              Crafted with intention, 
              <br />
              <span className="relative">
                designed for living.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 10.5C64.5 4.5 133.5 1.5 196 4.5C242.5 6.5 299 10.5 299 10.5" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <div
              ref={textRef as React.RefObject<HTMLDivElement>}
              className="space-y-4 opacity-0"
            >
              <p className="text-lg">
                LUMA was born from a desire to create products that merge functionality with aesthetic beauty.
                We believe the objects in your life should bring joy through both form and function.
              </p>
              <p>
                Each piece in our collection is carefully considered, ethically sourced, and made to last.
                We work with skilled artisans and responsible manufacturers who share our commitment to quality
                and sustainability.
              </p>
              <p>
                Our collections reflect a philosophy of intentional living—choosing fewer, better things
                and finding beauty in simplicity.
              </p>
              
              <div className="pt-6 flex flex-wrap gap-4">
                <button className="bg-charcoal hover:bg-charcoal/90 text-white px-5 py-2.5 rounded-md transition-all">
                  Learn More
                </button>
                <button className="border border-charcoal/30 hover:border-charcoal/60 text-charcoal px-5 py-2.5 rounded-md transition-all">
                  Our Process
                </button>
              </div>
            </div>
          </div>
          
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="opacity-0 relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334"
                alt="Workspace with LUMA products"
                className="w-full h-full object-cover hover-scale"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg bg-electric-violet/10 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-lg border border-electric-violet/20 -z-10"></div>
          </div>
        </div>
        
        {/* Stats section */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="mt-24 opacity-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "2015", label: "Founded" },
              { number: "45+", label: "Craftspeople" },
              { number: "12", label: "Countries" },
              { number: "10K+", label: "Happy customers" }
            ].map((stat, index) => (
              <div key={index} className="glass-card bg-white/40 backdrop-blur-sm p-6 rounded-xl">
                <p className="text-3xl md:text-4xl font-satoshi font-bold text-charcoal mb-1">{stat.number}</p>
                <p className="text-charcoal-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
