type ChainedState<T = any> = [string, T];
type ChainedStates<T = any> = ChainedState<T>[];
interface ChainedStateDispatch<T extends Record<string, any>> {
    state: T;
    commit: (state: ChainedState) => void;
    setChainedState: (...states: ChainedStates) => void;
}
export declare function useChainedState<T extends Record<string, any>>(states: ChainedStates): ChainedStateDispatch<T>;
export {};
//# sourceMappingURL=useChainedState.d.ts.map