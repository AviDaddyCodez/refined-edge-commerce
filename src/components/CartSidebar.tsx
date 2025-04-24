
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    clearCart,
    getItemTotal
  } = useCart();
  
  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 glass-card border-l border-white/10 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-satoshi font-bold">Your Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 px-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
                <p className="text-lg mb-6">Your cart is empty</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-electric-violet hover:bg-electric-violet/90"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-4 pb-4 border-b border-white/10">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-satoshi font-medium">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400">{item.category}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-white/20 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-white/10"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-white/10"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-medium">{getItemTotal(item)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-bold">{cartTotal}</span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-white/20"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
                <Link to="/checkout">
                  <Button 
                    className="flex-1 bg-electric-violet hover:bg-electric-violet/90"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
