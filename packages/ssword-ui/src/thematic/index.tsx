"use client";
import Script from "next/script";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";

type UserWithName<N extends string> = {
  [key in N]: string;
};

interface ThematicAgentProps<N extends string> {
  themeReadApi?: string | URL;
  themeWriteApi?: string | URL;
  usernameProperty: N;
  themeProperty?: string;
  user: UserWithName<N>;
}

interface ThematicAgentMiddleman<N extends string> {
  agentProps: ThematicAgentProps<N>;
  currentTheme: string;
  getTheme(): Promise<string>;
  setTheme(theme: string): Promise<void>;
}

interface ThematicAgentContext<N extends string> {
  middleman: ThematicAgentMiddleman<N> | null;
  setMiddleman: (middleMan: ThematicAgentMiddleman<N>) => void;
}

const ThematicAgentContext = createContext<
  ThematicAgentContext<any> | undefined
>(undefined);

function ThematicAgentProvider<N extends string>({
  children,
}: PropsWithChildren) {
  const [middleman, setMiddleman] = useState<ThematicAgentMiddleman<N> | null>(
    null,
  );
  return (
    <ThematicAgentContext.Provider value={{ middleman, setMiddleman }}>
      {children}
    </ThematicAgentContext.Provider>
  );
}

function useThematicAgent<N extends string = string>() {
  const context = useContext(ThematicAgentContext);
  if (!context) {
    throw new Error(
      "useThematicAgent must be used within a ThematicAgentProvider",
    );
  }
  return context as ThematicAgentContext<N>;
}

// DRY helpers
function getThemeFromLocalStorage() {
  return localStorage.getItem("theme") || "default";
}

const setTheme = (name: string) => {
  const html = document.documentElement;
  html.setAttribute("data-theme", name);
};

async function fetchTheme<N extends string>(
  props: ThematicAgentProps<N>,
): Promise<string> {
  if (!props.themeReadApi) {
    return getThemeFromLocalStorage();
  }
  try {
    const url = new URL(props.themeReadApi.toString());
    const req = new Request(url.toString(), {
      method: "GET",
      headers: {
        "X-User": props.user[props.usernameProperty],
      },
    });
    const res = await fetch(req);
    const apiJson = await res.json();
    const theme = apiJson[props.themeProperty || "theme"];
    if (typeof theme !== "string" || !theme) {
      console.warn(
        `Invalid theme property value, expected a string but received ${typeof theme}`,
      );
      return getThemeFromLocalStorage();
    }
    return theme;
  } catch (err) {
    console.error(`Failed to get theme, using default, error:${err}`);
    return "default";
  }
}

async function writeTheme<N extends string>(
  props: ThematicAgentProps<N>,
  theme: string,
) {
  if (!props.themeWriteApi) return;
  try {
    const url = new URL(props.themeWriteApi.toString());
    const req = new Request(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User": props.user[props.usernameProperty],
        "X-Value": theme,
      },
    });
    await fetch(req);
  } catch (err) {
    console.error("Failed to write theme:", err);
  }
}

function ThematicAgent<N extends string>(props: ThematicAgentProps<N>) {
  const context = useThematicAgent<N>();

  const middlemanRef = useRef<ThematicAgentMiddleman<N>>({
    agentProps: props,
    currentTheme: "default",
    async getTheme() {
      return fetchTheme(props);
    },
    async setTheme(theme) {
      localStorage.setItem("theme", theme);
      setTheme(theme);
      await writeTheme(props, theme);
    },
  });

  // Update middleman when props change
  useEffect(() => {
    middlemanRef.current.agentProps = props;
    context.setMiddleman(middlemanRef.current);
    (window as any).__setTheme = middlemanRef.current.setTheme;
  }, [props, context]);

  // listen to theme changes and storage events
  // sadly, the storage event doesnt fire
  // for the setter so we have to manually update it
  useEffect(() => {
    let isMounted = true;
    middlemanRef.current.getTheme().then((theme) => {
      if (isMounted) setTheme(theme);
    });

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}

/**
 * Warning: This is made to be rendered only in the server
 */
function ThematicInitScript() {
  return (
    <Script id="theme-init" strategy="afterInteractive">
      {`
        try {
          var theme = localStorage.getItem("theme");
          document.documentElement.setAttribute("data-theme", theme || "default");
        } catch (e) {}
      `}
    </Script>
  );
}

export {
  ThematicAgentProvider,
  useThematicAgent,
  ThematicAgent,
  ThematicAgentContext,
  ThematicInitScript,
};
