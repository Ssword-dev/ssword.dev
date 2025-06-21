import * as React from "react";

/**
 * According to the whatwg spec (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)
 *
 * Any attribute that has a value even when blank is considered html truthy
 */
type HtmlSpecTrue = string;

/**
 * According to the whatwg spec (https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)
 *
 * Any attribute that is omitted (not present) is considered false
 */
type HtmlSpecFalse = undefined;

/**
 * A type for all data-* attribute states for rework.
 *
 * interpreted based on whatwg spec
 */
type HtmlSpecBoolean = HtmlSpecTrue | HtmlSpecFalse;
type HtmlSpecBooleanToBoolean<T> = T extends HtmlSpecTrue
  ? true
  : T extends HtmlSpecFalse
    ? false
    : T;

type ReworkConfiguration<T> = {
  [key in keyof T]: HtmlSpecBooleanToBoolean<T[key]>;
};

interface LinkReworkProps {
  /**
   * Reworks the DOM to:
   * - disable links if a `data-link-disabled` attribute is present
   */
  "data-link-disabled"?: HtmlSpecBoolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ReworkProps extends ReworkConfiguration<LinkReworkProps> {}

const Rework: React.FC<ReworkProps> = (props) => {
  React.useEffect(() => {
    const controller = new AbortController();

    const linkRework = (ev: MouseEvent) => {
      const el = (ev.target as Element)?.closest?.("a");

      if (
        el instanceof HTMLAnchorElement &&
        el.hasAttribute("data-link-disabled") &&
        props["data-link-disabled"]
      ) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
    };

    const signal = controller.signal;

    // make sure we are not on passive mode AND we are listening on capture mode.
    // aka "go before any event listener"
    window.addEventListener("click", linkRework, {
      passive: false,
      capture: true,
      signal,
    });

    return () => controller.abort();
  }, [props["data-link-disabled"]]);

  return null;
};

Rework.displayName = "DOMRework";
export { Rework };
export type {
  ReworkConfiguration,
  ReworkProps,
  HtmlSpecBoolean,
  HtmlSpecBooleanToBoolean,
  HtmlSpecTrue,
  HtmlSpecFalse,
};
