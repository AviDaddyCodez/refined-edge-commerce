
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Use motion values for smooth cursor movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Create spring-based smooth movement
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Optimize the mousemove handler with useCallback
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (hidden) setHidden(false);
  }, [hidden, cursorX, cursorY]);

  // Handle mouse click with debounce
  const handleMouseDown = useCallback(() => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  }, []);

  useEffect(() => {
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
      <motion.div
        className={`
          fixed top-0 left-0 pointer-events-none z-50 
          ${hidden ? "opacity-0" : "opacity-100"}
          ${linkHovered ? "bg-electric-violet/50" : "bg-white"}
          transition-all duration-200 ease-out mix-blend-difference
        `}
        style={{
          width: clicked ? "10px" : "20px",
          height: clicked ? "10px" : "20px",
          x: smoothX,
          y: smoothY,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "width, height, transform"
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: linkHovered ? 1.5 : (clicked ? 0.7 : 1), 
          opacity: hidden ? 0 : 1 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }}
      />
      <motion.div
        className={`
          fixed top-0 left-0 pointer-events-none z-50 
          ${hidden ? "opacity-0" : "opacity-100"}
          border border-electric-violet/50
          transition-all duration-300 ease-out
        `}
        style={{
          width: linkHovered ? "40px" : (clicked ? "30px" : "40px"),
          height: linkHovered ? "40px" : (clicked ? "30px" : "40px"),
          x: smoothX,
          y: smoothY,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "width, height, transform"
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: linkHovered ? 1.3 : (clicked ? 0.8 : 1), 
          opacity: hidden ? 0 : 1,
          borderColor: linkHovered ? "rgba(139, 92, 246, 0.8)" : "rgba(255,255,255,0.3)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 250, 
          damping: 20 
        }}
      />
    </>
  );
};

export default CustomCursor;
