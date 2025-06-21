import { NextRequest, NextResponse } from "next/server";
declare function thematicMiddleware(req: NextRequest, res: NextResponse | null): Promise<{
    halt?: boolean;
    response: NextResponse;
}>;
export { thematicMiddleware };
//# sourceMappingURL=server.d.ts.map