import { NextResponse } from "next/server";
import {
  getClueInteractions,
  getPlayerIdFromRequest,
} from "@/lib/mockBackendStore";

export async function GET(request: Request) {
  const playerId = getPlayerIdFromRequest(request);

  return NextResponse.json({
    clues: getClueInteractions(playerId),
  });
}
