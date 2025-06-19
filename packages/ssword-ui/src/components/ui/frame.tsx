import { cva } from "class-variance-authority";
import { cn } from "@/utils";
import React from "react";
import { baseVariant, WithVariant } from "./base";

const frameVariant = cva(
  "flex justify-center content-center align-center p-1",
  {
    variants: {
      orientation: {
        portrait: "flex-col aspect-[16/9] portrait",
        landscape: "flex-row aspect-[9/16] landscape",
      },
      /**
       * Aspect ratio, but dimensional
       *
       * This means:
       *  `<Frame orientation="portrait" />` will have an aspect ratio inverse to the dimensional-ratio
       *
       *  `<Frame orientation="landscape" />` will have an aspect ratio equal to the dimensional-ratio
       */
      dimensionalRatio: {
        none: "",
        "1:1": "aspect-square",

        "1:2": "aspect-[1/2] [.portrait]:aspect-[2/1]",
        "1:3": "aspect-[1/3] [.portrait]:aspect-[3/1]",
        "1:4": "aspect-[1/4] [.portrait]:aspect-[4/1]",

        "2:3": "aspect-[2/3] [.portrait]:aspect-[3/2]",
        "3:4": "aspect-[3/4] [.portrait]:aspect-[4/3]",
        "4:5": "aspect-[4/5] [.portrait]:aspect-[5/4]",

        "3:2": "aspect-[3/2] [.portrait]:aspect-[2/3]",
        "16:9": "aspect-[16/9] [.portrait]:aspect-[9/16]",
      },
      corners: {
        // circle
        circle: "aspect-square rounded-[50%]",
        rounded: "rounded",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
      ...baseVariant.variants,
    },
    defaultVariants: {
      orientation: "landscape",
      corners: "sm",
      dimensionalRatio: "none",
      ...baseVariant.defaultVariants,
    },
  },
);

/**
 * A normal frame
 *
 * Definition of frame:
 *
 * - Fits the contents only
 * - Customizable
 * - Better if round
 *
 */
const Frame: React.FC<
  WithVariant<React.ComponentProps<"div">, typeof frameVariant>
> = ({
  color,
  background,
  accent,
  accentForeground,
  orientation,
  dimensionalRatio,
  className,
  ...props // Spread remaining props
}) => {
  return (
    <div
      {...props} // Spread remaining props
      data-slot="frame"
      className={cn(
        "",
        frameVariant({
          color,
          background,
          accent,
          accentForeground,
          orientation,
          dimensionalRatio,
        }),
        className,
      )}
    />
  );
};

export { Frame };
