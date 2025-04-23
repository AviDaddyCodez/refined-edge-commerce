
import { useEffect, useState, useCallback } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true); // Start hidden to avoid initial positioning issues
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Optimize the mousemove handler with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (hidden) setHidden(false);
  }, [hidden]);

  // Handle mouse click with debounce
  const handleMouseDown = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  }, []);

  useEffect(() => {
    // Add a delay to ensure proper initialization
    const initTimeout = setTimeout(() => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseleave", () => setHidden(true));
      document.addEventListener("mouseenter", () => setHidden(false));
      
      // Handle hover state for interactive elements
      const interactiveElements = document.querySelectorAll("a, button, .interactive");
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseleave", () => setHidden(true));
        document.removeEventListener("mouseenter", () => setHidden(false));
        
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", () => setLinkHovered(true));
          el.removeEventListener("mouseleave", () => setLinkHovered(false));
        });
      };
    }, 200);
    
    return () => clearTimeout(initTimeout);
  }, [handleMouseMove, handleMouseDown]);

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-50" : "scale-100"
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : "scale-100"
        } ${linkHovered ? "scale-150 bg-charcoal bg-opacity-5" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
