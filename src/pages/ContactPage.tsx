
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const titleRef = useScrollAnimation();
  const formRef = useScrollAnimation({ delay: 200 });
  const infoRef = useScrollAnimation({ delay: 300 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>
      
      {/* Contact form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div
              ref={formRef as React.RefObject<HTMLDivElement>}
              className="opacity-0"
            >
              <h2 className="text-2xl md:text-3xl font-satoshi font-bold text-charcoal mb-6">
                Send us a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message here..."
                    required
                    className="w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-electric-violet hover:bg-electric-violet/90"
                >
                  Send Message
                </Button>
              </form>
            </div>
            
            <div
              ref={infoRef as React.RefObject<HTMLDivElement>}
              className="opacity-0 space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-satoshi font-bold text-charcoal mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <Mail className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Email</h3>
                    <p className="mt-1 text-charcoal-light">info@hoops.com</p>
                    <p className="text-charcoal-light">support@hoops.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <Phone className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Phone</h3>
                    <p className="mt-1 text-charcoal-light">+1 (555) 123-4567</p>
                    <p className="text-charcoal-light">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <MapPin className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal">Address</h3>
                    <p className="mt-1 text-charcoal-light">123 Basketball Court</p>
                    <p className="text-charcoal-light">Los Angeles, CA 90001</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 mt-8 border-t border-gray-200">
                <h3 className="font-medium text-charcoal mb-4">Working Hours</h3>
                <p className="text-charcoal-light">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-charcoal-light">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-charcoal-light">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
