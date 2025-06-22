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
type HtmlSpecBooleanToBoolean<T> = T extends HtmlSpecTrue ? true : T extends HtmlSpecFalse ? false : T;
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
interface ReworkProps extends ReworkConfiguration<LinkReworkProps> {
}
declare const Rework: React.FC<ReworkProps>;
export { Rework };
export type { ReworkConfiguration, ReworkProps, HtmlSpecBoolean, HtmlSpecBooleanToBoolean, HtmlSpecTrue, HtmlSpecFalse, };
//# sourceMappingURL=rework.d.ts.map