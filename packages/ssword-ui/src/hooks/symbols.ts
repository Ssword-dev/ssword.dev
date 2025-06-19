const Symbols = {
  Internals: Symbol("[[Internals]]"),
};

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Symbols {
  export type WithInternals<
    D extends object,
    E extends object | undefined | never | null,
  > = D & {
    [Symbols.Internals]: E;
  };
}

export { Symbols };
