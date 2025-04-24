
import { useEffect, useRef } from "react";

interface ScrollObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: ScrollObserverOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = true,
    delay = 0,
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay for staggered animations if needed
            setTimeout(() => {
              if (currentRef) {
                currentRef.classList.remove("opacity-0");
                currentRef.classList.add("animate-fade-in");
              }
            }, delay);
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once && currentRef) {
            currentRef.classList.add("opacity-0");
            currentRef.classList.remove("animate-fade-in");
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      observer.unobserve(currentRef);
    };
  }, [once, rootMargin, threshold, delay]);
  
  return ref;
}
