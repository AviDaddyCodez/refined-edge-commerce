
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    document.addEventListener("mousemove", mMove);
    document.addEventListener("mousedown", mDown);
    document.addEventListener("mouseleave", mLeave);
    document.addEventListener("mouseenter", mEnter);
    
    handleLinkHoverEvents();

    return () => {
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mousedown", mDown);
      document.removeEventListener("mouseleave", mLeave);
      document.removeEventListener("mouseenter", mEnter);
      
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true));
        el.removeEventListener("mouseleave", () => setLinkHovered(false));
      });
    };
  }, []);

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
