declare const Symbols: {
    Internals: symbol;
};
declare namespace Symbols {
    type WithInternals<D extends object, E extends object | undefined | never | null> = D & {};
}
export { Symbols };
//# sourceMappingURL=symbols.d.ts.map