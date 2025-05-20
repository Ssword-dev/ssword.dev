"use client";

import { useEffect, useState } from "react";

const useWindow = () => {
  const [win, setWin] = useState<typeof window | null>(null);
  useEffect(() => {
    setWin(window);
  });

  return win;
};

export { useWindow };
