import React from "react";
import { WithVariant } from "./base";
declare const frameVariant: (props?: ({
    color?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    background?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    accent?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    accentForeground?: "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    outline?: "none" | "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    accentOutline?: "none" | "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | null | undefined;
    orientation?: "landscape" | "portrait" | null | undefined;
    dimensionalRatio?: "none" | "1:1" | "1:2" | "1:3" | "1:4" | "2:3" | "3:4" | "4:5" | "3:2" | "16:9" | null | undefined;
    corners?: "circle" | "sm" | "lg" | "rounded" | "md" | "xl" | "2xl" | "3xl" | "full" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
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
declare const Frame: React.FC<WithVariant<React.ComponentProps<"div">, typeof frameVariant>>;
export { Frame };
//# sourceMappingURL=frame.d.ts.map