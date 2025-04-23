
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Collection from "@/components/Collection";

const ProductsPage = () => {
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
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Discover our collection of premium products designed with aesthetics and functionality in mind.
          </p>
        </div>
      </section>
      
      {/* Products collection */}
      <Collection />
    </div>
  );
};

export default ProductsPage;
