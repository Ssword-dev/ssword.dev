import React, { PropsWithChildren, ReactNode } from "react";
type NumberKeyOnly<K, T> = K extends number ? T : never;
interface PaginationContextProps<K> {
    pageMap: Map<K, ReactNode>;
    /**
     * The current page's key
     */
    currentPage: K;
    /**
     * The previous page's key,
     * undefined if `ctx.goto` has not yet been called
     */
    previousPage?: K;
    /**
     * Mavigates through the page indexed `pageKey`
     *
     * @param pageKey The key for the page
     */
    goto(pageKey: K): void;
    /**
     * A shorthand for `ctx.goto(ctx.currentPage + 1)`
     *
     * @throws {Error} when the map is indexed by numbers
     */
    next: () => NumberKeyOnly<K, void>;
    /**
     * A shorthand for `ctx.goto(ctx.previousPage)`
     */
    back(): void;
    /**
     *
     * @param key The key for the content
     * @param content The content that will be indexed to `key`
     */
    add(key: K, content: ReactNode): void;
    /**
     *
     * @param key The key of the page you wish to remove
     */
    remove(key: K): void;
    currentPageContent: ReactNode;
}
interface PaginationProviderProps<K> {
    pageMap?: Map<K, ReactNode>;
    entries?: [K, ReactNode][];
    initialPage: K;
}
declare const PaginationContext: React.Context<PaginationContextProps<unknown> | null>;
declare function usePagination<T>(): PaginationContextProps<T>;
declare const PaginationProvider: React.FC<PropsWithChildren<PaginationProviderProps<unknown>>>;
declare const CurrentPage: () => React.ReactNode;
export { PaginationProvider, usePagination, CurrentPage, PaginationContext };
export type { PaginationContextProps, PaginationProviderProps, NumberKeyOnly };
//# sourceMappingURL=pages.d.ts.map