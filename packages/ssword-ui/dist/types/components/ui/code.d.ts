import { ReactNode } from "react";
interface CodeProps {
    lang: string;
    children: ReactNode;
    /**
     * @unit Time-ms (milliseconds)
     */
    copyResetDelay?: number;
}
declare function Code({ lang, copyResetDelay, children }: CodeProps): import("react/jsx-runtime").JSX.Element;
export { Code };
//# sourceMappingURL=code.d.ts.map