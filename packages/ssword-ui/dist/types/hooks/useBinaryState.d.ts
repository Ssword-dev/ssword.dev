interface Dispatch {
    state: boolean;
    toggle(): void;
}
/**
 *
 * @param initialState The initial state of the binary state
 * @returns A dispatch
 */
declare const useBinaryState: (initialState: boolean) => Dispatch;
export { useBinaryState };
export type { Dispatch as BinaryStateDispatch };
//# sourceMappingURL=useBinaryState.d.ts.map