import { RefObject, useEffect, useRef, useState } from "react";

const INTERSECTION_THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

interface ViewImplementation {
  ratio: number;
  percentage: number;
}

function useView<E extends HTMLElement>(
  ref: RefObject<E | null>,
): ViewImplementation {
  const [view, setView] = useState({ ratio: 0, percentage: 0 });
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    obsRef.current = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        setView({
          ratio,
          percentage: ratio * 100,
        });
      },
      {
        threshold: INTERSECTION_THRESHOLDS,
      },
    );

    obsRef.current.observe(ref.current);

    return () => {
      obsRef.current?.disconnect();
      obsRef.current = null;
    };
  }, [ref]);

  return view;
}

export { useView };
export type { ViewImplementation };
