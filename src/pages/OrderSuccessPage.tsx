
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-charcoal">
      <CustomCursor />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
          </div>
          
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-3xl md:text-4xl lg:text-5xl font-satoshi font-bold mb-6 opacity-0"
          >
            Order Placed Successfully!
          </h1>
          
          <div 
            ref={contentRef as React.RefObject<HTMLDivElement>}
            className="opacity-0 space-y-6"
          >
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. We've received your order and will begin processing it right away.
              You will receive a confirmation email shortly with your order details.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8 inline-block mx-auto">
              <div className="flex flex-col space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Express (2-3 days)</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                to="/"
                className="bg-transparent hover:bg-gray-100 text-charcoal border border-gray-300 px-6 py-3 rounded-md transition-colors"
              >
                Return to Home
              </Link>
              <Link 
                to="/products"
                className="bg-electric-violet hover:bg-electric-violet/90 text-white px-6 py-3 rounded-md transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccessPage;
