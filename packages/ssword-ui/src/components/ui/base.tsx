import { cva, VariantProps } from "class-variance-authority";

const baseVariant = {
  variants: {
    color: {
      primary: "primary-fg",
      secondary: "secondary-fg",
      tertiary: "tertiary-fg",
      accent: "text-accent",
      destructive: "text-destructive",
      muted: "text-muted",
    },
    background: {
      primary: "primary-bg",
      secondary: "secondary-bg",
      tertiary: "tertiary-bg",
      accent: "bg-accent",
      destructive: "bg-destructive",
      muted: "bg-muted",
    },
    accent: {
      primary: "hover:primary-bg focus:primary-bg active:primary-bg",
      secondary: "hover:secondary-bg focus:secondary-bg active:secondary-bg",
      tertiary: "hover:tertiary-bg focus:tertiary-bg active:tertiary-bg",
      accent: "hover:bg-accent focus:bg-accent active:bg-accent",
      destructive:
        "hover:bg-destructive focus:bg-destructive active:bg-destructive",
      muted: "hover:bg-muted focus:bg-muted active:bg-muted",
    },
    accentForeground: {
      primary: "hover:primary-fg focus:primary-fg active:primary-fg",
      secondary: "hover:secondary-fg focus:secondary-fg active:secondary-fg",
      tertiary: "hover:tertiary-fg focus:tertiary-fg active:tertiary-fg",
      accent: "hover:fg-accent focus:fg-accent active:fg-accent",
      destructive:
        "hover:fg-destructive focus:fg-destructive active:fg-destructive",
      muted: "hover:fg-muted focus:fg-muted active:fg-muted",
    },

    outline: {
      none: "",
      primary: "outline-primary-fg",
      secondary: "outline-secondary-fg",
      tertiary: "outline-tertiary-fg",
      accent: "outline-accent",
      destructive: "outline-destructive",
      muted: "outline-muted",
    },

    accentOutline: {
      none: "",
      primary:
        "hover:outline-primary-fg focus:outline-primary-fg active:outline-primary-fg",
      secondary:
        "hover:outline-secondary-fg focus:outline-secondary-fg active:outline-secondary-fg",
      tertiary:
        "hover:outline-tertiary-fg focus:outline-tertiary-fg active:outline-tertiary-fg",
      accent: "hover:outline-accent focus:outline-accent active:outline-accent",
      destructive:
        "hover:outline-destructive focus:outline-destructive active:outline-destructive",
      muted: "hover:outline-muted focus:outline-muted active:outline-muted",
    },
  } as const,

  defaultVariants: {
    color: "primary",
    background: "primary",
    accent: "primary",
    accentForeground: "primary",
    outline: "none",
    accentOutline: "none",
  } as const,
} as const;

/**
 * The base variants for all components.
 *
 * @since 1.0.0
 */
const baseVariantAuthority = cva("", baseVariant);

/**
 * A type helper that accepts 2 type arguments
 *
 * @template P The base props of the component extending the variant V
 * @template V The variant authority that is returned from `cva`.
 * The default is `typeof baseVariantAuthority`
 *
 * @example
 * ```typescriptreact
 * "use client"; // Just in case you are on next.js, always include use client
 * import * as React from "react";
 * import { baseVariantAuthority, WithVariant, Card } from "@ssword/ui/client"; // make sure you use this if you have radix deps and not client/standalone
 *
 * const MyComponent: React.FC<WithVariant<React.ComponentProps<"div">, typeof baseVariantAuthority>> = (
 * ...props
 * ) => <Card {...props} />;
 * ```
 *
 * to use `baseVariantAuthority` you can do the following:
 *
 * @example
 * ```typescriptreact
 * import * as React from "react";
 * import { baseVariantAuthority, cn, WithVariant } from "@ssword/ui/client";
 *
 * // Declare your component
 * const MyComponent: React.FC<WithVariant<React.ComponentProps<"div">>> = ({
 *  color,
    background,
    accent,
    accentForeground,
    outline,
    accentOutline,
    className,
    ...props
 * }) => <div className={cn(
    "px-2 py-3", // Base styles here
    baseVariantAuthority({
 *  color,
    background,
    accent,
    accentForeground,
    outline,
    accentOutline,
     // Make sure you include a className props so you can override stuff with className later
 * }, className))};

 * ```
 */
type WithVariant<
  P extends object,
  V extends ReturnType<typeof cva> = typeof baseVariantAuthority,
> = Omit<P, keyof V> & VariantProps<V>;

export { baseVariant, baseVariantAuthority };
export type { WithVariant };
