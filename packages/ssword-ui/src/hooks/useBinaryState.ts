import * as React from "react";

interface Dispatch {
  state: boolean;
  toggle(): void;
}

/**
 *
 * @param initialState The initial state of the binary state
 * @returns A dispatch
 */
const useBinaryState = (initialState: boolean): Dispatch => {
  const [_innerState, _setInnerState] = React.useState(initialState);
  const toggle = React.useCallback(() => {
    _setInnerState((prev) => !prev);
  }, [_setInnerState]);

  return { toggle, state: _innerState };
};

export { useBinaryState };
export type { Dispatch as BinaryStateDispatch };
