
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import NeonGridLines from "@/components/NeonGridLines";
import { motion } from "framer-motion";
import { useState } from "react";

const AboutPage = () => {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ delay: 300 });
  const statsRef = useScrollAnimation({ delay: 400 });
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  const stats = [
    { value: "2015", label: "Founded" },
    { value: "25+", label: "Team Members" },
    { value: "1000+", label: "Products Sold" },
    { value: "12", label: "Countries" },
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      quote: "Innovation is our driving force.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Design",
      quote: "Design is not just what it looks like, it's how it works.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    },
    {
      name: "Mike Roberts",
      role: "Lead Developer",
      quote: "Code is poetry in motion.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    }
  ];

  return (
    <div className="min-h-screen bg-deep-purple relative">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <CustomCursor />
      <Navigation />
      
      {/* Hero section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <motion.h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About <span className="gradient-text">Us</span>
          </motion.h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Innovating at the intersection of technology and design.
          </p>
        </div>
      </section>
      
      {/* Interactive Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              ref={contentRef as React.RefObject<HTMLDivElement>}
              className="space-y-6 opacity-0"
            >
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-white">
                Our Journey
              </h2>
              <div className="space-y-8">
                {["2015", "2018", "2021", "2024"].map((year, index) => (
                  <motion.div
                    key={year}
                    className="relative pl-8 border-l border-electric-violet"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 bg-electric-violet rounded-full -translate-x-[7px]" />
                    <h3 className="text-xl font-bold text-white">{year}</h3>
                    <p className="text-gray-300 mt-2">
                      {index === 0 && "Founded with a vision to revolutionize eco-friendly lighting"}
                      {index === 1 && "Expanded to international markets"}
                      {index === 2 && "Launched our innovative product line"}
                      {index === 3 && "Reaching new heights with sustainable solutions"}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className="opacity-0"
            >
              <motion.div 
                className="rounded-xl overflow-hidden border border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000" 
                  alt="Our team" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          
          {/* Interactive Team Section */}
          <div className="mt-32">
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-white text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="relative group"
                  onHoverStart={() => setActiveTeamMember(index)}
                  onHoverEnd={() => setActiveTeamMember(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTeamMember === index ? 1 : 0 }}
                  >
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-electric-violet">{member.role}</p>
                    <p className="text-gray-300 mt-2 italic">&quot;{member.quote}&quot;</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Stats with hover effects */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="mt-24 opacity-0"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 glass-card bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(139, 92, 246, 0.5)"
                  }}
                >
                  <motion.p 
                    className="text-3xl md:text-4xl font-satoshi font-bold gradient-text"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-300 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
