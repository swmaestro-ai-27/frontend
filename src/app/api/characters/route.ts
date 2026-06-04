import { NextResponse } from "next/server";
import {
  getCharacterInteractions,
  getPlayerIdFromRequest,
} from "@/lib/mockBackendStore";

export async function GET(request: Request) {
  const playerId = getPlayerIdFromRequest(request);

  return NextResponse.json({
    characters: getCharacterInteractions(playerId),
  });
}
