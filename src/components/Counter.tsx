import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Counter({ value, duration = 1800, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}
