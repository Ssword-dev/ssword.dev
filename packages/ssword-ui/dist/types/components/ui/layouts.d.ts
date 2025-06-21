import * as React from "react";
import { WithVariant } from "./base";
interface LayoutProps extends WithVariant<React.ComponentProps<"div">> {
    children?: React.ReactNode;
}
declare const Row: React.FC<LayoutProps>;
declare const Column: React.FC<LayoutProps>;
declare const Grid: React.FC<LayoutProps>;
export { Row, Column, Grid };
export type { LayoutProps };
//# sourceMappingURL=layouts.d.ts.map