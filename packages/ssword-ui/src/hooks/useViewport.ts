"use client";
import { useEffect, useState } from "react";

interface Nothing {}
type Union<U extends G, G> = U | (G & Nothing);

const enum Orientation {
  Landscape = "landscape",
  Portrait = "portrait",
  Server = "",
}

type DimensionalOrientation = Union<Orientation, string>;

interface ClientViewport {
  vh: number;
  vw: number;
  dimensionalOrientation: DimensionalOrientation;
}

interface NullViewport extends ClientViewport {
  vh: 0;
  vw: 0;
  dimensionalOrientation: Orientation.Server;
}

const nullViewport: NullViewport = {
  vh: 0,
  vw: 0,
  dimensionalOrientation: Orientation.Server,
};
/**
 * A react hook that returns either a null viewport or a
 * client viewport
 *
 * Specifically, a null viewport in the server (just incase next.js)
 * because there is no viewport in the server
 *
 * A client viewport in the client
 * @returns Either a null viewport or a client viewport depending on context
 */
function useViewport(): Readonly<ClientViewport | NullViewport> {
  const [viewport, setViewport] = useState<ClientViewport | NullViewport>(
    nullViewport,
  );
  useEffect(() => {
    const handler = (_?: Event) => {
      if (
        window.innerHeight === viewport.vh &&
        window.innerWidth === viewport.vw
      ) {
        return;
      }

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      setViewport({
        vh,
        vw,
        dimensionalOrientation:
          vh > vw ? Orientation.Portrait : Orientation.Landscape,
      });
    };
    handler();
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return viewport;
}

export { useViewport, nullViewport, Orientation };
export type { ClientViewport, NullViewport };
