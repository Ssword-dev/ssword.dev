"use server";
import { NextRequest, NextResponse } from "next/server";

type MiddlewareResult = { halt?: boolean; response: NextResponse };

function isIE(userAgent: string | null) {
  if (!userAgent) return false;

  userAgent = userAgent.toLowerCase();
  return (
    userAgent.includes("msie") || // Matches MSIE for older IE versions
    userAgent.includes("trident") // Matches Trident/7.0; for IE 11
  );
}

async function noSupportIE(
  req: NextRequest,
  res: NextResponse | null,
): Promise<MiddlewareResult> {
  const pass = res ?? NextResponse.next();

  const isClientIE = isIE(req.headers.get("user-agent"));

  if (isClientIE) {
    return {
      halt: true,
      response: NextResponse.redirect(
        new URL("/browser_unsupported.html", req.url),
      ),
    };
  }

  return {
    response: pass,
  };
}

export { noSupportIE };
