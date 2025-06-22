import { HTMLAttributes, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const frameVariants: (props?: ({
    preset?: "video" | "content" | "avatar" | "image" | null | undefined;
    orientation?: "landscape" | "portrait" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
type FrameProps = {
    children?: ReactNode;
} & HTMLAttributes<HTMLDivElement> & VariantProps<typeof frameVariants>;
declare function Frame({ preset, orientation, children, className, ...props }: FrameProps): import("react/jsx-runtime").JSX.Element;
export { Frame };
//# sourceMappingURL=frame.d.ts.map