"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import React from "react";

async function thematicMiddleware(
  req: NextRequest,
  res: NextResponse | null,
): Promise<{ halt?: boolean; response: NextResponse }> {
  const isPageRequest =
    req.nextUrl.pathname.endsWith("/") ||
    req.nextUrl.pathname.endsWith(".html") ||
    !req.nextUrl.pathname.includes(".");

  const pass = res ?? NextResponse.next();
  if (!isPageRequest) {
    return { response: pass };
  }

  if (!req.cookies.has("X-Theme")) {
    pass.cookies.set("X-Theme", "default", {
      sameSite: "strict",
      maxAge: 31536000,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
    });
  }

  return {
    response: pass,
  };
}

export { thematicMiddleware };
