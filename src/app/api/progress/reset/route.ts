import { NextResponse } from "next/server";
import { getPlayerIdFromRequest, resetStore } from "@/lib/mockBackendStore";

export async function POST(request: Request) {
  resetStore(getPlayerIdFromRequest(request));

  return NextResponse.json({
    ok: true,
    message: "progress reset",
    timestamp: new Date().toISOString(),
  });
}
