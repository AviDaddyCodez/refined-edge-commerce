
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const titleRef = useScrollAnimation();
  const formRef = useScrollAnimation({ rootMargin: "50px" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our updates soon.",
      });
      setEmail("");
    }
  };

  return (
    <section id="contact" className="section-padding bg-beige">
      <div className="container mx-auto container-padding text-center max-w-2xl">
        <h2
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="text-3xl md:text-4xl lg:text-5xl mb-6 opacity-0"
        >
          Stay Connected
        </h2>
        <p className="text-lg mb-8">
          Subscribe to receive updates on new collections, limited editions, and exclusive content.
        </p>
        
        <form 
          ref={formRef as React.RefObject<HTMLFormElement>}
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 opacity-0"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-4 bg-transparent border-b border-charcoal/30 focus:border-charcoal focus:outline-none transition-colors"
          />
          <Button 
            type="submit" 
            className="px-8 py-4 rounded-full"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
