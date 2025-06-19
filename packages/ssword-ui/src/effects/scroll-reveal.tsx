"use client";
import { useAnimation } from "framer-motion";
import { useRef, useEffect, PropsWithChildren } from "react";
import { useView } from "../hooks";
import Effect from "./base";

interface ScrollRevealProps {
  /**
   * what is internally used to calculate the opacity
   * based on view ratio
   */
  interval: number;
}
const ScrollReveal: React.FC<PropsWithChildren<ScrollRevealProps>> = ({
  interval,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const view = useView(ref);
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      opacity: Math.max(0, Math.min(view.ratio * interval, 1)),
      // clamp: max(1)
    });
  }, [view.ratio, controls]);

  // effects
  return (
    <Effect
      slot="block"
      ref={ref}
      data-ui-role="effect:scroll-reveal"
      animate={controls}
    >
      {children}
    </Effect>
  );
};

ScrollReveal.displayName = "ui-effect[scroll-reveal]";
export default ScrollReveal;
