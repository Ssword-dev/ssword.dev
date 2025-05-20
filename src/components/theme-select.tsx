import React from "react";

type Theme = string;
type ThemeList = { label: string; value: Theme }[];
type ThemeChangeHandler = (theme: Theme) => void;
interface ThemeSelectProps {
  value: Theme;
  onChange: ThemeChangeHandler;
  themes: ThemeList;
  className?: string;
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({
  value,
  onChange,
  themes,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Theme)}
      aria-label="Select theme"
      className={className}
    >
      {themes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.label}
        </option>
      ))}
    </select>
  );
};

export { ThemeSelect };
export type { Theme, ThemeChangeHandler, ThemeList, ThemeSelectProps };
