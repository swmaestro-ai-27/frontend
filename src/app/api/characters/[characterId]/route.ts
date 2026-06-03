import { NextResponse } from "next/server";
import {
  getPlayerIdFromRequest,
  markCharacterInteracted,
} from "@/lib/mockBackendStore";

export async function POST(
  request: Request,
  context: { params: Promise<{ characterId: string }> }
) {
  const playerId = getPlayerIdFromRequest(request);
  const { characterId } = await context.params;
  const numericCharacterId = Number(characterId);

  if (!Number.isFinite(numericCharacterId)) {
    return NextResponse.json({ message: "유효하지 않은 인물 ID입니다." }, { status: 400 });
  }

  const result = markCharacterInteracted(numericCharacterId, playerId);

  if (!result) {
    return NextResponse.json(
      { message: "인물을 찾을 수 없거나 아직 해금되지 않았습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
