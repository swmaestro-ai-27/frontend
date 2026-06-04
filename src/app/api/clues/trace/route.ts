import { NextResponse } from "next/server";
import {
  getPlayerIdFromRequest,
  probeRecoveredTrace,
} from "@/lib/mockBackendStore";

export async function POST(request: Request) {
  const playerId = getPlayerIdFromRequest(request);

  return NextResponse.json(probeRecoveredTrace(playerId));
}
