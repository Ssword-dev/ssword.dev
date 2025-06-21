import { cva, VariantProps } from "class-variance-authority";
declare const baseVariant: {
    readonly variants: {
        readonly color: {
            readonly primary: "primary-fg";
            readonly secondary: "secondary-fg";
            readonly tertiary: "tertiary-fg";
            readonly accent: "text-accent";
            readonly destructive: "text-destructive";
            readonly muted: "text-muted";
        };
        readonly background: {
            readonly primary: "primary-bg";
            readonly secondary: "secondary-bg";
            readonly tertiary: "tertiary-bg";
            readonly accent: "bg-accent";
            readonly destructive: "bg-destructive";
            readonly muted: "bg-muted";
        };
        readonly accent: {
            readonly primary: "hover:primary-bg focus:primary-bg active:primary-bg";
            readonly secondary: "hover:secondary-bg focus:secondary-bg active:secondary-bg";
            readonly tertiary: "hover:tertiary-bg focus:tertiary-bg active:tertiary-bg";
            readonly accent: "hover:bg-accent focus:bg-accent active:bg-accent";
            readonly destructive: "hover:bg-destructive focus:bg-destructive active:bg-destructive";
            readonly muted: "hover:bg-muted focus:bg-muted active:bg-muted";
        };
        readonly accentForeground: {
            readonly primary: "hover:primary-fg focus:primary-fg active:primary-fg";
            readonly secondary: "hover:secondary-fg focus:secondary-fg active:secondary-fg";
            readonly tertiary: "hover:tertiary-fg focus:tertiary-fg active:tertiary-fg";
            readonly accent: "hover:fg-accent focus:fg-accent active:fg-accent";
            readonly destructive: "hover:fg-destructive focus:fg-destructive active:fg-destructive";
            readonly muted: "hover:fg-muted focus:fg-muted active:fg-muted";
        };
        readonly outline: {
            readonly none: "";
            readonly primary: "outline-primary-fg";
            readonly secondary: "outline-secondary-fg";
            readonly tertiary: "outline-tertiary-fg";
            readonly accent: "outline-accent";
            readonly destructive: "outline-destructive";
            readonly muted: "outline-muted";
        };
        readonly accentOutline: {
            readonly none: "";
            readonly primary: "hover:outline-primary-fg focus:outline-primary-fg active:outline-primary-fg";
            readonly secondary: "hover:outline-secondary-fg focus:outline-secondary-fg active:outline-secondary-fg";
            readonly tertiary: "hover:outline-tertiary-fg focus:outline-tertiary-fg active:outline-tertiary-fg";
            readonly accent: "hover:outline-accent focus:outline-accent active:outline-accent";
            readonly destructive: "hover:outline-destructive focus:outline-destructive active:outline-destructive";
            readonly muted: "hover:outline-muted focus:outline-muted active:outline-muted";
        };
    };
    readonly defaultVariants: {
        readonly color: "primary";
        readonly background: "primary";
        readonly accent: "primary";
        readonly accentForeground: "primary";
        readonly outline: "none";
        readonly accentOutline: "none";
    };
};
/**
 * The base variants for all components.
 *
 * @since 1.0.0
 */
declare const baseVariantAuthority: (props?: ({
    readonly color?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    readonly background?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    readonly accent?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    readonly accentForeground?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    readonly outline?: "none" | "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    readonly accentOutline?: "none" | "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
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
type WithVariant<P extends object, V extends ReturnType<typeof cva> = typeof baseVariantAuthority> = Omit<P, keyof V> & VariantProps<V>;
export { baseVariant, baseVariantAuthority };
export type { WithVariant };
//# sourceMappingURL=base.d.ts.map