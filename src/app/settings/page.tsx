"use client";
import styles from "./page.module.scss";
import {
  CurrentPage,
  PaginationProvider,
  usePagination,
  useThematicAgent,
} from "@ssword/ui/client";
import config from "./config.json";
import {
  Theme,
  ThemeChangeHandler,
  ThemeList,
  ThemeSelect,
} from "@/components/theme-select";
import { useEventListener } from "@/hooks/@react-vueuse/useEventListener";
import { useWindow } from "@/hooks/useWindow";
import React, { useCallback, useEffect, useRef, useState } from "react";

/** Appearance Settings */
const AppearanceSettings: React.FC = () => {
  const themeContext = useThematicAgent();
  const { middleman: thematicAgentMiddleman } = themeContext;
  const [themes, setThemes] = useState<ThemeList>([
    { label: "Default", value: "default-theme" },
    { label: "Solarized", value: "solarized-theme" },
    { label: "Mono", value: "mono-theme" },
    { label: "Dim", value: "dim-theme" },
    { label: "Old English", value: "ye-olde-english" },
    { label: "Modern", value: "modern" },
  ]);

  const keyStack = useRef("");
  const [themeSecretsDiscovered, setThemeSecretsDiscovered] = useState(false);
  const [themeValue, setThemeValue] = useState("loading...");
  const themeHandler = useCallback<ThemeChangeHandler>(
    (theme) => {
      themeContext.middleman?.setTheme(theme);
      setThemeValue(theme);
    },
    [themeContext],
  );

  useEffect(() => {
    let ignore = false;
    if (thematicAgentMiddleman) {
      const promise = thematicAgentMiddleman.getTheme();
      promise
        .then((value) => {
          if (ignore) return;
          setThemeValue(value);
        })
        .catch(console.error);

      return () => {
        ignore = true;
      };
    }
  }, [thematicAgentMiddleman]);

  const window = useWindow();
  useEventListener(window, "keydown", (e: KeyboardEvent) => {
    if (
      themeSecretsDiscovered ||
      !new RegExp(`^${config.keyListener.allowedKeys}$`).test(e.key)
    )
      return;
    keyStack.current += e.shiftKey ? e.key.toUpperCase() : e.key;
    if (keyStack.current.length >= config.THEME_SECRET.length) {
      const textWindow = keyStack.current.slice(-config.THEME_SECRET.length);
      if (textWindow === config.THEME_SECRET) {
        setThemeSecretsDiscovered(true);
      }
    }
  });

  useEffect(() => {
    if (themeSecretsDiscovered) {
      setThemes((prevThemes) => [...prevThemes, ...config.themes]);
    }
  }, [themeSecretsDiscovered]);

  return (
    <div className="p-6">
      <h2 className="text-primary mb-2 text-2xl font-semibold">Appearance</h2>
      <p className="text-primary mb-4 text-xl italic">Theme</p>
      <ThemeSelect
        className="text-secondary"
        value={themeValue}
        themes={themes}
        onChange={themeHandler}
      />
    </div>
  );
};

const Settings = () => {
  const pagination = usePagination();
  return (
    <div
      className={`${styles["settings-container"]} bg-background text-foreground flex`}
    >
      <aside
        className={`${styles["settings-aside"]} border-border bg-muted border-r p-6`}
      >
        <h3 className="mb-4 font-medium">Settings</h3>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => pagination.goto("appearance")}
                className="hover:bg-accent hover:text-accent-foreground w-full rounded-md px-4 py-2 text-left"
              >
                Appearance
              </button>
            </li>
            {/* Extend with more setting pages here */}
          </ul>
        </nav>
      </aside>
      <main
        className={`${styles["settings-current-page"]} flex-1 overflow-y-auto p-6`}
      >
        <CurrentPage />
      </main>
    </div>
  );
};

const SettingsPage = () => (
  <PaginationProvider
    initialPage={"appearance"}
    entries={[["appearance", <AppearanceSettings key={1} />]]}
  >
    <Settings />
  </PaginationProvider>
);

export default SettingsPage;
