
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import NeonGridLines from "@/components/NeonGridLines";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Index = () => {
  const { user } = useAuth();
  
  // Welcome message for logged in users
  useEffect(() => {
    if (user) {
      const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'there';
      toast(`Welcome back, ${userName}!`, {
        description: "Explore our newest eco-friendly neon products",
        position: "top-right",
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen relative">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <CustomCursor />
      <Navigation />
      <Hero />
      <Collection />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
