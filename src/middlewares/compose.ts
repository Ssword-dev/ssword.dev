import { NextRequest, NextResponse } from "next/server";

type MiddlewareResult = { halt?: boolean; response: NextResponse };
/**
 * The response is only ever null when the middleware is
 *
 * the first middleware in the list
 *
 * to stop the request from propagating (e.g the user is not authenticated)
 *
 * return a halting response
 */
type Middleware = (
  req: NextRequest,
  res: NextResponse | null,
) => Promise<MiddlewareResult>;
function compose(...middlewares: Middleware[]) {
  return async function (req: NextRequest) {
    let res = null;
    for (const middleware of middlewares) {
      const result = await middleware(req, res);
      if (result.halt) {
        return result.response;
      }

      res = result.response;
    }

    return res ?? NextResponse.next();
  };
}

export { compose };
export type { MiddlewareResult };
