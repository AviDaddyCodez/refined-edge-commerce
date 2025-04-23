
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const titleRef = useScrollAnimation();
  const textRef = useScrollAnimation({ rootMargin: "50px" });
  const imageRef = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-beige">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-3xl md:text-4xl lg:text-5xl mb-6 opacity-0"
            >
              Crafted with intention, designed for living.
            </h2>
            <div
              ref={textRef as React.RefObject<HTMLDivElement>}
              className="space-y-4 opacity-0"
            >
              <p className="text-lg">
                LUMA was born from a desire to create products that merge functionality with aesthetic beauty.
                We believe the objects in your life should bring joy through both form and function.
              </p>
              <p>
                Each piece in our collection is carefully considered, ethically sourced, and made to last.
                We work with skilled artisans and responsible manufacturers who share our commitment to quality
                and sustainability.
              </p>
              <p>
                Our collections reflect a philosophy of intentional living—choosing fewer, better things
                and finding beauty in simplicity.
              </p>
            </div>
          </div>
          
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="opacity-0"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1483058712412-4245e9b90334"
                alt="Workspace with LUMA products"
                className="w-full h-full object-cover hover-scale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
