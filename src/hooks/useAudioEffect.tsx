
import { useCallback, useEffect, useRef } from "react";

// Define sound types
type SoundType = "click" | "success" | "error" | "add-to-cart";

// Sound URLs
const soundEffects: Record<SoundType, string> = {
  "click": "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  "success": "https://assets.mixkit.co/active_storage/sfx/1688/1688-preview.mp3",
  "error": "https://assets.mixkit.co/active_storage/sfx/6/6-preview.mp3",
  "add-to-cart": "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
};

// Create a hook for managing audio effects
export const useAudioEffect = () => {
  // Use refs to store audio objects to prevent recreating on each render
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    "click": null,
    "success": null,
    "error": null,
    "add-to-cart": null,
  });
  
  // Initialize audio elements on mount
  useEffect(() => {
    // Preload all sound effects
    Object.entries(soundEffects).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.volume = 0.5; // Set default volume
      audioRefs.current[key as SoundType] = audio;
    });
    
    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);
  
  // Function to play a sound
  const playSound = useCallback((type: SoundType) => {
    const audio = audioRefs.current[type];
    if (audio) {
      // Reset the audio to start
      audio.currentTime = 0;
      
      // Play the sound
      audio.play().catch(error => {
        // Handle autoplay restrictions
        console.error("Error playing sound:", error);
      });
    }
  }, []);
  
  return { playSound };
};
