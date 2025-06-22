import * as React from "react";
interface MetaContextLink {
    route?: boolean;
    name: string;
    href: string;
}
interface MetaBoundaryParameters {
    defaultTitle: string;
    defaultDescription: string;
}
interface MetaContextAPI extends MetaBoundaryParameters {
    title?: string;
    description?: string;
    links?: MetaContextLink[];
    getTitle(): string;
    getDescription(): string;
    getLinks(): MetaContextLink[];
    setTitle(newTitle: string, flush?: boolean): void;
    setDescription(newDescription: string, flush?: boolean): void;
    setLinks(links: MetaContextLink[], flush?: boolean): void;
    /** triggers update */
    flush(): void;
}
declare function useMeta(): MetaContextAPI;
declare const MetaBoundary: ({ defaultTitle, defaultDescription, children, }: React.PropsWithChildren<MetaBoundaryParameters>) => import("react/jsx-runtime").JSX.Element;
export { MetaBoundary, useMeta };
//# sourceMappingURL=meta.d.ts.map