import { MiddlewareConfig } from "next/server";
import { compose } from "./middlewares/compose";
import { httpOnly } from "./middlewares/https-only";
import { noSupportIE } from "./middlewares/ie-no-support";

export const middleware = compose(httpOnly, noSupportIE);

export const config: MiddlewareConfig = {};
