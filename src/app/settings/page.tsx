"use client";
import config from "./config.json";
import { useThematicAgent } from "@/components/agents/thematic";
import {
  Theme,
  ThemeChangeHandler,
  ThemeList,
  ThemeSelect,
} from "@/components/theme-select";
import { useEventListener } from "@/hooks/@react-vueuse/useEventListener";
import { useWindow } from "@/hooks/useWindow";
import React, { useCallback, useEffect, useRef, useState } from "react";

const SettingsPage: React.FC = () => {
  const themeContext = useThematicAgent();
  const { middleman: thematicAgentMiddleman } = themeContext;
  const [themes, setThemes] = useState<ThemeList>([
    { label: "Default", value: "default-theme" },
    { label: "Solarized", value: "solarized-theme" },
    { label: "Mono", value: "mono-theme" },
    { label: "Dim", value: "dim-theme" },
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

  /** hooks.appearance.theme */
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
      return; // no need for us to scan for key press anymore
    keyStack.current += e.shiftKey ? e.key.toUpperCase() : e.key;
    console.log(keyStack.current);
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
    <main className="bg-secondary mx-auto mt-10 max-w-xl rounded-xl p-8 font-sans shadow-lg">
      <h1 className="text-primary mb-4 text-3xl font-bold">Settings</h1>
      <h2 className="text-primary mb-2 text-2xl font-semibold">Appearance</h2>
      <p className="text-primary mb-2 text-xl italic">Theme</p>
      <ThemeSelect value={themeValue} themes={themes} onChange={themeHandler} />
    </main>
  );
};

export default SettingsPage;
