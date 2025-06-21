import { ReactElement } from "react";
interface TypewriterProps {
    text: string[];
    speed?: number;
    deleteSpeed?: number;
    pause?: number;
    loop?: boolean;
    textCursor?: ReactElement<React.JSX.IntrinsicElements["span"], "span">;
}
declare const Typewriter: React.FC<TypewriterProps>;
export default Typewriter;
//# sourceMappingURL=typewriter.d.ts.map