import { Transition } from "framer-motion";
import { AnimationControls } from "../legacy-types/framer-motion";
import { ReactNode, RefObject } from "react";
import { motion } from "framer-motion";
type PrimitiveReactElement = string | number | bigint | boolean | null;

type ElementLevel = "block" | "inline";
type ResolveTagBasedOnLevel<T extends ElementLevel> = T extends "block"
  ? "div"
  : "span";
type ResolveHTML<Ttag extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[Ttag];

interface BaseEffectProps<Tlevel extends ElementLevel = "block"> {
  ref?: RefObject<HTMLElementTagNameMap[ResolveTagBasedOnLevel<Tlevel>] | null>;
  slot?: Tlevel;
  "data-ui-role": string;
  animate: AnimationControls;
  transition?: Transition;
  children: ReactNode; // any single child
}

type EffectProps<Tlevel extends ElementLevel> = Omit<
  React.JSX.IntrinsicElements[ResolveTagBasedOnLevel<Tlevel>],
  keyof BaseEffectProps<Tlevel>
> &
  BaseEffectProps<Tlevel>;

const defaultTransition: Transition = {
  duration: 0.4,
  ease: "easeOut",
  type: "tween",
};

function Effect<Tlevel extends ElementLevel>({
  slot = "block" as Tlevel,
  "data-ui-role": uiRole,
  animate,
  transition = defaultTransition,
  children,
  ...props
}: EffectProps<Tlevel>) {
  const Tag = (slot === "block" ? motion.div : motion.span) as React.FC<
    Record<string, unknown>
  >;
  return (
    <Tag animate={animate} transition={transition} {...props} aria-hidden>
      {children}
    </Tag>
  );
}

export default Effect;
