"use client";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Moon } from "lucide-react";
interface Config {
  Icon: React.ForwardRefExoticComponent<React.JSX.IntrinsicElements["svg"]>;
}

const iconConfig = {
  day: {
    color: "#ff7f7f",
    fill: "#e53935 ",
  },
  night: {
    color: "#1976d2",
    fill: "#1565c0",
  },
};

export const Icon: Config["Icon"] = forwardRef(function render(props, ref) {
  const [date, setDate] = useState(() => new Date()); // now, on server
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setDate(new Date()); // now, on client. aka sync with client
    setMounted(true); // update mount flag
    return () => {
      setMounted(false); // reupdate mount flag
    };
  }, []);

  const hour = date.getHours();
  const isDay = hour >= 6 && hour < 18;
  const config = iconConfig[isDay ? "day" : "night"];

  const timeChangeMaster = useCallback(() => {
    if (!mounted) {
      return;
    }

    setDate(new Date()); // Update date-time
    // 5 minutes should be good... no one is really gonna notice it change
    setTimeout(timeChangeMaster, 300000);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    setTimeout(timeChangeMaster, 300000); // Start monitoring when we mount
  }, [mounted]);

  return <Moon {...props} ref={ref} style={config} />;
});
