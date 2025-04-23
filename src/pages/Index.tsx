
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import About from "@/components/About";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
