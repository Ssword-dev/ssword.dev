import { useRef, useState } from "react";

type ChainedState<T = any> = [string, T];
type ChainedStates<T = any> = ChainedState<T>[];

interface ChainedStateDispatch<T extends Record<string, any>> {
  state: T;
  commit: (state: ChainedState) => void;
  setChainedState: (...states: ChainedStates) => void;
}

export function useChainedState<T extends Record<string, any>>(
  states: ChainedStates
): ChainedStateDispatch<T> {
  const initialState: Record<string, any> = {};
  for (const [key, value] of states) {
    if (initialState[key]) throw new Error(`Duplicate state: ${key}`);
    initialState[key] = value;
  }

  const [chainedState, setChained] = useState(initialState);
  const commitCacheRef = useRef(new Map<string, any>())
  const commitCache = commitCacheRef.current;

  const commit = ([key, value]: ChainedState) => {
    commitCache.set(key, value);
  };

  const setChainedState = (...updates: ChainedStates) => {
    if (updates.length === 0) {
      if (commitCache.size === 0) return;
      setChained(prev => ({ ...prev, ...Object.fromEntries(commitCache) }));
      commitCache.clear();
      return;
    }

    const result = { ...chainedState };
    for (const [key, value] of updates) result[key] = value;
    setChained(result);
  };

  return {
    state: chainedState as T,
    commit,
    setChainedState,
  };
}
