import { RefObject } from "react";
interface ViewImplementation {
    ratio: number;
    percentage: number;
}
declare function useView<E extends HTMLElement>(ref: RefObject<E | null>): ViewImplementation;
export { useView };
export type { ViewImplementation };
//# sourceMappingURL=useView.d.ts.map