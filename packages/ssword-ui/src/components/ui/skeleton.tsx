import React from "react";
import { cn } from "@/utils";
import { baseVariantAuthority, WithVariant } from "./base";

// TODO: Extend with BVA
// 6/9/25 Ssword: I will try now...

function Skeleton({
  color,
  accentForeground,
  background,
  accent,
  outline,
  accentOutline,
  className,
  ...props
}: WithVariant<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-muted animate-pulse",
        baseVariantAuthority({
          color,
          accentForeground,
          background,
          accent,
          outline,
          accentOutline,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
