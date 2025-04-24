
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, ChevronRight, Truck, ShieldCheck, ArrowLeft, Smartphone, Wallet } from "lucide-react";
import NeonGridLines from "@/components/NeonGridLines";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAudioEffect } from "@/hooks/useAudioEffect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  paymentMethod: z.enum(["card", "upi"]),
  // Card fields
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expDate: z.string().optional(),
  cvv: z.string().optional(),
  // UPI fields
  upiId: z.string().optional(),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, getItemTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const { playSound } = useAudioEffect();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expDate: "",
      cvv: "",
      upiId: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      playSound("error");
      return;
    }

    setIsLoading(true);
    playSound("success");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigate("/order-success");
      toast.success("Order placed successfully!");
    }, 1500);
  };

  const nextStep = () => {
    const fieldsToValidate = currentStep === 1 
      ? ["firstName", "lastName", "email"] 
      : ["address", "city", "state", "zipCode"];
    
    form.trigger(fieldsToValidate as any).then(isValid => {
      if (isValid) {
        playSound("click");
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const prevStep = () => {
    playSound("click");
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as "card" | "upi");
    form.setValue("paymentMethod", value as "card" | "upi");
    playSound("click");
  };

  return (
    <div className="min-h-screen bg-deep-purple bg-gradient-to-b from-deep-purple to-black">
      <CustomCursor />
      <Navigation />
      <NeonGridLines className="fixed inset-0" opacity={0.1} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl md:text-4xl font-satoshi font-bold mb-4 md:mb-0 gradient-text">Checkout</h1>
            
            {/* Checkout Steps */}
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-electric-violet' : 'bg-white/20'} transition-colors`}>
                <span className="text-white font-medium">1</span>
              </div>
              <div className={`h-1 w-6 ${currentStep >= 2 ? 'bg-electric-violet' : 'bg-white/20'} transition-colors`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-electric-violet' : 'bg-white/20'} transition-colors`}>
                <span className="text-white font-medium">2</span>
              </div>
              <div className={`h-1 w-6 ${currentStep >= 3 ? 'bg-electric-violet' : 'bg-white/20'} transition-colors`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-electric-violet' : 'bg-white/20'} transition-colors`}>
                <span className="text-white font-medium">3</span>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form section - 3 columns */}
            <div className="lg:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                  {currentStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md"
                    >
                      <h2 className="text-xl font-bold mb-6 text-white">Contact Information</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-white">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your@email.com" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-electric-violet hover:bg-electric-violet/90 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          Continue <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md"
                    >
                      <h2 className="text-xl font-bold mb-6 text-white">Shipping Address</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-white">Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-white">ZIP / Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" className="bg-white/10 border-white/20 text-white" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="bg-transparent hover:bg-white/10 text-white border border-white/30 py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          <ArrowLeft size={18} /> Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="bg-electric-violet hover:bg-electric-violet/90 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          Continue <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md"
                    >
                      <h2 className="text-xl font-bold mb-6 text-white">Payment Information</h2>
                      
                      <div className="mb-6">
                        <Tabs defaultValue="card" onValueChange={handlePaymentMethodChange}>
                          <TabsList className="w-full grid grid-cols-2 mb-6 bg-white/10">
                            <TabsTrigger value="card" className="data-[state=active]:bg-electric-violet data-[state=active]:text-white">
                              <div className="flex items-center gap-2">
                                <CreditCard size={18} />
                                <span>Credit Card</span>
                              </div>
                            </TabsTrigger>
                            <TabsTrigger value="upi" className="data-[state=active]:bg-electric-violet data-[state=active]:text-white">
                              <div className="flex items-center gap-2">
                                <Smartphone size={18} />
                                <span>UPI</span>
                              </div>
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="card">
                            <div className="grid md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel className="text-white">Card Number</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input 
                                          placeholder="1234 5678 9012 3456" 
                                          className="bg-white/10 border-white/20 text-white pl-10" 
                                          {...field} 
                                        />
                                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="cardName"
                                render={({ field }) => (
                                  <FormItem className="md:col-span-2">
                                    <FormLabel className="text-white">Name on Card</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="John Doe" 
                                        className="bg-white/10 border-white/20 text-white" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="expDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">Expiration Date</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="MM/YY" 
                                        className="bg-white/10 border-white/20 text-white" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">CVV</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="123" 
                                        type="password" 
                                        className="bg-white/10 border-white/20 text-white" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="upi">
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="upiId"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-white">UPI ID</FormLabel>
                                    <FormControl>
                                      <div className="relative">
                                        <Input 
                                          placeholder="yourname@upi" 
                                          className="bg-white/10 border-white/20 text-white pl-10" 
                                          {...field} 
                                        />
                                        <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-3 gap-4 py-4">
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    form.setValue("upiId", form.getValues("upiId") + "@googlep");
                                    playSound("click");
                                  }} 
                                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
                                >
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google Pay" className="w-8 h-8" />
                                  <span className="text-sm text-white">Google Pay</span>
                                </button>
                                
                                <button 
                                  type="button"
                                  onClick={() => {
                                    form.setValue("upiId", form.getValues("upiId") + "@okbhim");
                                    playSound("click");
                                  }}
                                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
                                >
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" alt="BHIM UPI" className="w-8 h-8" />
                                  <span className="text-sm text-white">BHIM UPI</span>
                                </button>
                                
                                <button 
                                  type="button"
                                  onClick={() => {
                                    form.setValue("upiId", form.getValues("upiId") + "@apl");
                                    playSound("click");
                                  }} 
                                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors"
                                >
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Amazon_logo_RGB.svg/2560px-Amazon_logo_RGB.svg.png" alt="Amazon Pay" className="w-8 h-8" />
                                  <span className="text-sm text-white">Amazon Pay</span>
                                </button>
                              </div>
                              
                              <div className="text-sm text-white/70">
                                <p>By selecting UPI, you agree to pay using your linked UPI ID. A payment request will be sent to your UPI app.</p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      <div className="mt-6 space-y-4 text-white">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                          <ShieldCheck className="text-green-400" size={20} />
                          <div className="text-sm">
                            <p className="font-medium">Secure Checkout</p>
                            <p className="text-white/70 text-xs">Your payment information is encrypted</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                          <Truck className="text-blue-400" size={20} />
                          <div className="text-sm">
                            <p className="font-medium">Fast Shipping</p>
                            <p className="text-white/70 text-xs">Free shipping on all orders over $50</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="bg-transparent hover:bg-white/10 text-white border border-white/30 py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          <ArrowLeft size={18} /> Back
                        </button>
                        <button 
                          type="submit" 
                          className="bg-electric-violet hover:bg-electric-violet/90 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2 relative overflow-hidden"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="animate-pulse">Processing...</span>
                            </>
                          ) : (
                            <>
                              Place Order <ChevronRight size={18} />
                            </>
                          )}
                          {isLoading && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="w-full h-1 bg-white/20 absolute bottom-0 left-0">
                                <span className="h-full bg-white absolute left-0 animate-progress"></span>
                              </span>
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </Form>
            </div>
            
            {/* Order summary - 2 columns */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md sticky top-32"
              >
                <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-white/10 group">
                          <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium text-sm text-white">{item.name}</h3>
                            <p className="text-xs text-white/60">{item.category}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-white/80">Qty: {item.quantity}</span>
                              <span className="font-medium text-electric-violet">{getItemTotal(item)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-white/50">
                      Your cart is empty
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold pt-3 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-electric-violet">{cartTotal}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    to="/products"
                    className="text-sm text-electric-violet hover:underline flex items-center justify-center gap-1"
                    onClick={() => playSound("click")}
                  >
                    <ArrowLeft size={14} /> Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
