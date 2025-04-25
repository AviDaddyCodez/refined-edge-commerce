import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import NeonGridLines from "@/components/NeonGridLines";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Square3Stack3DIcon, RocketLaunchIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  const imageRef = useScrollAnimation({ delay: 300 });
  const statsRef = useScrollAnimation({ delay: 400 });
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  const values = [
    { icon: <Square3Stack3DIcon className="w-6 h-6" />, title: "Innovation", description: "Pushing boundaries in eco-friendly lighting" },
    { icon: <RocketLaunchIcon className="w-6 h-6" />, title: "Quality", description: "Uncompromising attention to detail" },
    { icon: <HeartIcon className="w-6 h-6" />, title: "Sustainability", description: "Committed to environmental responsibility" },
    { icon: <SparklesIcon className="w-6 h-6" />, title: "Design", description: "Where aesthetics meet functionality" },
  ];

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

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
    <div className="min-h-screen bg-deep-purple relative overflow-hidden">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <CustomCursor />
      <Navigation />
      
      {/* Hero section with floating elements */}
      <section className="pt-32 pb-20 relative">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-electric-violet to-soft-purple opacity-20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-6">
          <motion.h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-6xl lg:text-7xl font-satoshi font-bold opacity-0 text-center"
            whileHover={{ scale: 1.05 }}
          >
            About <span className="gradient-text">Us</span>
          </motion.h1>
          
          {/* Interactive Values Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
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
          
          {/* Interactive Team Section with 3D cards */}
          <div className="mt-32">
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-white text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="relative group perspective"
                  onHoverStart={() => setActiveTeamMember(index)}
                  onHoverEnd={() => setActiveTeamMember(null)}
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                >
                  <div className="rounded-xl overflow-hidden transform-gpu transition-all duration-500">
                    <img 
                      src={member.image} 
                      alt="Team member"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 rounded-xl"
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
          
          {/* Animated Stats */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="mt-24 opacity-0"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="p-6 glass-card backdrop-blur-sm rounded-xl border border-white/10"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(139, 92, 246, 0.5)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
