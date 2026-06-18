import { useState, useEffect, useRef } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const progress = Math.min(
        1,
        Math.max(0, (windowHeight - elementTop) / (elementHeight + windowHeight))
      );

      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, ref };
}
