
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Sample product data - in a real app, this would come from an API
const productsData = [
  {
    id: 1,
    name: "Minimalist Table Lamp",
    price: "$129.00",
    category: "Home Decor",
    description: "An elegant table lamp with a minimalist design that fits perfectly in any modern interior. Made from premium materials with attention to detail.",
    features: [
      "Energy-efficient LED bulb included",
      "Adjustable brightness levels",
      "Touch-sensitive controls",
      "Available in multiple finishes",
    ],
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
      "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    price: "$89.00",
    category: "Home Accessories",
    description: "A set of three ceramic vases with organic shapes and textures. Each vase is handcrafted by skilled artisans, making every piece unique.",
    features: [
      "Handcrafted ceramic material",
      "Set of three complementary sizes",
      "Waterproof interior glaze",
      "Suitable for fresh or dried flowers",
    ],
    images: [
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85",
      "https://images.unsplash.com/photo-1604254979495-97b0a25b34e4",
      "https://images.unsplash.com/photo-1604254979498-2d7136b9388f",
    ],
    rating: 4.5,
    reviews: 86,
    inStock: true,
  },
  {
    id: 3,
    name: "Merino Wool Throw",
    price: "$145.00",
    category: "Textiles",
    description: "Ultra-soft merino wool throw blanket that provides exceptional warmth and comfort. Perfect for cozy evenings on the sofa or as an elegant accent piece.",
    features: [
      "100% premium merino wool",
      "Naturally hypoallergenic",
      "Breathable and temperature-regulating",
      "Available in multiple colors",
    ],
    images: [
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4",
      "https://images.unsplash.com/photo-1580644547095-3c95595f9d2d",
      "https://images.unsplash.com/photo-1603662452531-303a98fe09b4",
    ],
    rating: 4.9,
    reviews: 215,
    inStock: false,
  },
  {
    id: 4,
    name: "Leather Desk Organizer",
    price: "$75.00",
    category: "Office",
    description: "Keep your workspace tidy with this premium leather desk organizer. Features multiple compartments for stationery and small office supplies.",
    features: [
      "Genuine full-grain leather",
      "Multiple storage compartments",
      "Non-slip base",
      "Ages beautifully with use",
    ],
    images: [
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      "https://images.unsplash.com/photo-1649962239132-8a2e2fcafa78",
      "https://images.unsplash.com/photo-1581539450436-345725a9ff2f",
    ],
    rating: 4.7,
    reviews: 68,
    inStock: true,
  },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find(p => p.id === Number(id)) || productsData[0]; // Fallback to first product
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  const imageRef = useScrollAnimation();
  const contentRef = useScrollAnimation({ delay: 200 });
  
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        image: product.images[0],
        name: product.name,
        price: product.price,
        category: product.category
      });
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navigation />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <div
              ref={imageRef as React.RefObject<HTMLDivElement>}
              className="opacity-0 space-y-4"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index ? "border-electric-violet" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Information */}
            <div
              ref={contentRef as React.RefObject<HTMLDivElement>}
              className="opacity-0 space-y-6"
            >
              <div>
                <p className="text-electric-violet">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-satoshi font-bold mt-2">{product.name}</h1>
                <div className="flex items-center mt-4">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-400">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <p className="text-2xl font-medium">{product.price}</p>
              
              <p className="text-gray-300">{product.description}</p>
              
              <div className="pt-6 border-t border-gray-800">
                <p className="mb-3 font-medium">Features:</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-violet mr-2"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Quantity:</p>
                  <div className="flex items-center border border-gray-700 rounded">
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 min-w-[2rem] text-center">{quantity}</span>
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                <span className={product.inStock ? "text-green-400" : "text-red-400"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-electric-violet hover:bg-electric-violet/90 px-8 py-6"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Product Tabs */}
              <div className="pt-8 mt-8">
                <div className="border-b border-gray-800">
                  <div className="flex space-x-8">
                    <button
                      className={`pb-2 font-medium ${
                        activeTab === "description"
                          ? "border-b-2 border-electric-violet text-white"
                          : "text-gray-400"
                      }`}
                      onClick={() => setActiveTab("description")}
                    >
                      Description
                    </button>
                    <button
                      className={`pb-2 font-medium ${
                        activeTab === "details"
                          ? "border-b-2 border-electric-violet text-white"
                          : "text-gray-400"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </button>
                    <button
                      className={`pb-2 font-medium ${
                        activeTab === "reviews"
                          ? "border-b-2 border-electric-violet text-white"
                          : "text-gray-400"
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </button>
                  </div>
                </div>
                <div className="pt-6">
                  {activeTab === "description" && (
                    <div>
                      <p>{product.description}</p>
                      <p className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac erat vitae nisl consequat vestibulum. 
                        Fusce at urna eget justo placerat tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus 
                        et ultrices posuere cubilia curae; Donec pulvinar libero at nunc fringilla, at sodales metus vestibulum.
                      </p>
                    </div>
                  )}
                  {activeTab === "details" && (
                    <div>
                      <h3 className="font-medium mb-3">Product Specifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400">Material</p>
                          <p>Premium Quality</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Dimensions</p>
                          <p>H: 30cm, W: 20cm, D: 20cm</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Weight</p>
                          <p>1.5kg</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Made in</p>
                          <p>United States</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-current"
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg">{product.rating} out of 5</span>
                      </div>
                      <p>{product.reviews} verified customer reviews</p>
                      <Button variant="outline" className="mt-4">
                        Read All Reviews
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
