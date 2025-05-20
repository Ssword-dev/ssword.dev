import { MiddlewareConfig } from "next/server";
import { compose } from "./middlewares/compose";
import { httpOnly } from "./middlewares/https-only";

export const middleware = compose(httpOnly);

export const config: MiddlewareConfig = {};
