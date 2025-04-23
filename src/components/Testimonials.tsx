
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "The attention to detail in every LUMA product is exceptional. Each piece I've purchased feels special and elevates my space in a subtle yet significant way.",
    author: "Emma T.",
    location: "New York",
  },
  {
    id: 2,
    text: "I appreciate LUMA's commitment to sustainable materials and ethical production. It's refreshing to find a brand that values quality and responsibility equally.",
    author: "Michael L.",
    location: "San Francisco",
  },
  {
    id: 3,
    text: "LUMA products have transformed my living space. The minimalist aesthetic and thoughtful design make everyday objects feel like art pieces.",
    author: "Sarah K.",
    location: "London",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useScrollAnimation();
  const testimonialRef = useScrollAnimation({ threshold: 0.3 });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <h2
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="text-3xl md:text-4xl lg:text-5xl text-center mb-16 opacity-0"
        >
          What Our Customers Say
        </h2>

        <div
          ref={testimonialRef as React.RefObject<HTMLDivElement>}
          className="max-w-3xl mx-auto opacity-0"
        >
          <div className="bg-beige p-8 md:p-12 rounded-lg text-center">
            <p className="text-lg md:text-xl font-space mb-8 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            <div className="mb-8">
              <p className="font-medium">{testimonials[currentIndex].author}</p>
              <p className="text-sm text-charcoal-light">{testimonials[currentIndex].location}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
