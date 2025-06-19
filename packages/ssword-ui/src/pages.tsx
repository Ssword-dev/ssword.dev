import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

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

const PaginationContext = createContext<PaginationContextProps<unknown> | null>(
  null,
);
function usePagination<T>(): PaginationContextProps<T> {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePagination can only be used inside a PaginationProvider!",
    );
  }
  return context as PaginationContextProps<T>;
}
const PaginationProvider: React.FC<
  PropsWithChildren<PaginationProviderProps<unknown>>
> = ({
  pageMap: _pageMap,
  entries: _entries = undefined,
  initialPage,
  children,
}) => {
  if (!(_pageMap || _entries)) {
    throw new Error("A page map or entries must be provided to use pagination");
  }

  const pageMap = useMemo(
    () => _pageMap ?? new Map(_entries),
    [_pageMap, _entries],
  );
  const [currentPage, i_setCurrentPage] = useState(initialPage);
  const previousPageRef = useRef<unknown>(undefined);
  const currentPageContent = useMemo(() => {
    const content = pageMap.get(currentPage);
    if (!content) {
      throw new Error(`Page ${currentPage} does not exists!`);
    }

    return content;
  }, [pageMap, currentPage]);

  const goto = (pageKey: unknown) => {
    const previous = currentPage;
    previousPageRef.current = previous;
    i_setCurrentPage(pageKey);
  };

  const back = () => goto(previousPageRef.current);
  const next = () => {
    if (typeof currentPage !== "number") {
      throw new Error(
        "Cannot call .next on a paginatioin that is not numerically indexed",
      );
    }

    goto(currentPage + 1);
  };

  const add = (pageKey: unknown, content: ReactNode) => {
    if (pageMap.has(pageKey)) {
      console.warn(`Cannot add page ${pageKey} as it is already defined`);
      return null;
    }

    pageMap.set(pageKey, content);
  };

  const remove = (pageKey: unknown) => {
    if (!pageMap.has(pageKey)) {
      console.warn(
        `Cannot remove page ${pageKey} as it is not defined defined`,
      );
      return false;
    }

    pageMap.delete(pageKey);
    return true;
  };

  const value: PaginationContextProps<unknown> = useMemo(
    () => ({
      pageMap,
      currentPage,
      previousPage: previousPageRef.current,
      goto,
      back,
      next: next as PaginationContextProps<unknown>["next"],
      add,
      remove,
      currentPageContent,
    }),
    [pageMap, currentPage],
  );

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

const CurrentPage = () => {
  const ctx = usePagination();

  return ctx.currentPageContent;
};

export { PaginationProvider, usePagination, CurrentPage, PaginationContext };
export type { PaginationContextProps, PaginationProviderProps, NumberKeyOnly };
