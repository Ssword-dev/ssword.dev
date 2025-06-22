"use client";

import * as React from "react";
import { useChainedState } from "@/hooks";

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

const MetaContext = React.createContext<MetaContextAPI | null>(null);

function useMeta() {
  const ctx = React.useContext(MetaContext);
  if (!ctx) throw new Error("useMeta must be used within a <MetaBoundary />");
  return ctx;
}

const MetaBoundary = ({
  defaultTitle,
  defaultDescription,
  children,
}: React.PropsWithChildren<MetaBoundaryParameters>) => {
  const { state, commit, setChainedState } = useChainedState<{
    title?: string;
    description?: string;
    links?: MetaContextLink[];
  }>([
    ["title", undefined],
    ["description", undefined],
    ["links", []],
  ]);

  const setTitle = (title: string, flush = false) => flush ? setChainedState(["title", title]) : commit(["title", title]);
  const setDescription = (desc: string, flush = false) => flush ? setChainedState(["description", desc]) : commit(["description", desc]);
  const setLinks = (links: MetaContextLink[], flush = false) => flush ? setChainedState(["links", links]) : commit(["title", links]);
  const flush = () => setChainedState();

  const getTitle = () => state.title ?? defaultTitle;
  const getDescription = () => state.description ?? defaultDescription;
  const getLinks = () => state.links ?? [];

  const api: MetaContextAPI = {
    ...state,
    defaultTitle,
    defaultDescription,
    setTitle,
    setDescription,
    setLinks,
    getTitle,
    getDescription,
    getLinks,
    flush,
  };

  return <MetaContext.Provider value={api}>{children}</MetaContext.Provider>;
};

export { MetaBoundary, useMeta };
