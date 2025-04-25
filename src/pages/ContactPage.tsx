import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const titleRef = useScrollAnimation();
  const formRef = useScrollAnimation({ delay: 200 });
  const infoRef = useScrollAnimation({ delay: 300 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store the submission in the database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (dbError) throw dbError;

      // Send confirmation email
      const response = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (response.error) throw response.error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Display a notification about the email testing mode
      toast.info("Note: During testing, confirmation emails are sent to our team inbox rather than directly to you.");
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-purple">
      <CustomCursor />
      <Navigation />
      
      {/* Hero section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 
            ref={titleRef as React.RefObject<HTMLHeadingElement>}
            className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold opacity-0 text-center"
          >
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>
      
      {/* Contact form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div
              ref={formRef as React.RefObject<HTMLDivElement>}
              className="opacity-0 glass-card p-8"
            >
              <h2 className="text-2xl md:text-3xl font-satoshi font-bold mb-6">
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
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
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message here..."
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-electric-violet hover:bg-electric-violet/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-sm text-gray-400 text-center mt-2">
                  Note: During testing, confirmation emails are sent to our team inbox.
                </p>
              </form>
            </div>
            
            <div
              ref={infoRef as React.RefObject<HTMLDivElement>}
              className="opacity-0 space-y-8"
            >
              <h2 className="text-2xl md:text-3xl font-satoshi font-bold mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start glass-card p-6">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <Mail className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-gray-300">info@hoops.com</p>
                    <p className="text-gray-300">support@hoops.com</p>
                  </div>
                </div>
                
                <div className="flex items-start glass-card p-6">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <Phone className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="mt-1 text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-300">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start glass-card p-6">
                  <div className="mr-4 rounded-full bg-electric-violet/10 p-3">
                    <MapPin className="h-6 w-6 text-electric-violet" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="mt-1 text-gray-300">123 Basketball Court</p>
                    <p className="text-gray-300">Los Angeles, CA 90001</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 mt-8">
                <h3 className="font-medium mb-4">Working Hours</h3>
                <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
