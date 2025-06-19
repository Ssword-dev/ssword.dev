"use client";
import * as React from "react";
import { baseVariantAuthority, WithVariant } from "./base";
import { cn } from "@/utils";
interface LayoutProps extends WithVariant<React.ComponentProps<"div">> {
  children?: React.ReactNode;
}

// Base Component Abstract (Yes, we are building this as an Abstract Tree)

const Base: React.FC<LayoutProps> = ({
  color,
  background,
  accent,
  accentForeground,
  outline,
  accentOutline,
  className,
  ...props
}) => (
  <div
    className={cn(
      baseVariantAuthority({
        color,
        background,
        accent,
        accentForeground,
        outline,
        accentOutline,
      }),
      className,
    )}
    {...props}
  />
);

// Tabular-like: Rows, Columns
const Row: React.FC<LayoutProps> = ({ className, ...props }) => (
  <Base className={cn("flex flex-row gap-1", className)} {...props} />
);
const Column: React.FC<LayoutProps> = ({ className, ...props }) => (
  <Base className={cn("flex flex-col gap-1", className)} {...props} />
);

const Grid: React.FC<LayoutProps> = ({ className, ...props }) => (
  <Base className={cn("grid gap-1", className)} {...props} />
);

export { Row, Column, Grid };
export type { LayoutProps };
