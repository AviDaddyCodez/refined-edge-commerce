
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const AboutPage = () => {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ delay: 300 });
  const statsRef = useScrollAnimation({ delay: 400 });

  const stats = [
    { value: "2015", label: "Founded" },
    { value: "25+", label: "Team Members" },
    { value: "1000+", label: "Products Sold" },
    { value: "12", label: "Countries" },
  ];

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
            About <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Learn the story behind our brand and our commitment to quality and innovation.
          </p>
        </div>
      </section>
      
      {/* Company story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              ref={contentRef as React.RefObject<HTMLDivElement>}
              className="space-y-6 opacity-0"
            >
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-charcoal">
                Our Story
              </h2>
              <p className="text-lg text-charcoal-light">
                Founded in 2015, HOOPS started with a simple mission: to create basketball products that combine cutting-edge technology with sleek design. What began as a small passion project has grown into a global brand trusted by athletes and enthusiasts alike.
              </p>
              <p className="text-charcoal-light">
                We believe that basketball is more than just a game—it's a culture, a community, and a way of life. Our products are designed to enhance the experience of the game while bringing style and innovation to the court.
              </p>
              <p className="text-charcoal-light">
                Each product in our collection is meticulously crafted with premium materials and undergoes rigorous testing to ensure it meets our high standards of quality and performance.
              </p>
            </div>
            <div
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className="opacity-0"
            >
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000" 
                  alt="Our team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="mt-24 opacity-0"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 glass-card bg-deep-purple rounded-xl">
                  <p className="text-3xl md:text-4xl font-satoshi font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-gray-300 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
