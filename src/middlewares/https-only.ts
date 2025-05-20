import { NextRequest, NextResponse } from "next/server";
import { MiddlewareResult } from "./compose";

async function httpOnly(
  req: NextRequest,
  res: NextResponse | null,
): Promise<MiddlewareResult> {
  const isLocalhost = req.nextUrl.hostname === "localhost";
  const isHttps = req.nextUrl.protocol === "https:";

  if (!isLocalhost && !isHttps) {
    return {
      halt: true,
      response: NextResponse.json(
        {
          errorCode: "403",
          cause: "HTTPS only",
          message: "Rejected",
        },
        {
          status: 403,
          statusText: "Forbidden",
        },
      ),
    };
  }

  return {
    response: res ?? NextResponse.next(),
  };
}

export { httpOnly };
