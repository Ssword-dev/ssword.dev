import { Transition } from "framer-motion";
import { AnimationControls } from "../legacy-types/framer-motion";
import { ReactNode, RefObject } from "react";
type ElementLevel = "block" | "inline";
type ResolveTagBasedOnLevel<T extends ElementLevel> = T extends "block" ? "div" : "span";
interface BaseEffectProps<Tlevel extends ElementLevel = "block"> {
    ref?: RefObject<HTMLElementTagNameMap[ResolveTagBasedOnLevel<Tlevel>] | null>;
    slot?: Tlevel;
    "data-ui-role": string;
    animate: AnimationControls;
    transition?: Transition;
    children: ReactNode;
}
type EffectProps<Tlevel extends ElementLevel> = Omit<React.JSX.IntrinsicElements[ResolveTagBasedOnLevel<Tlevel>], keyof BaseEffectProps<Tlevel>> & BaseEffectProps<Tlevel>;
declare function Effect<Tlevel extends ElementLevel>({ slot, "data-ui-role": uiRole, animate, transition, children, ...props }: EffectProps<Tlevel>): import("react/jsx-runtime").JSX.Element;
export default Effect;
//# sourceMappingURL=base.d.ts.map