import { NextResponse } from "next/server";
import {
  getPlayerIdFromRequest,
  markClueInteracted,
} from "@/lib/mockBackendStore";

export async function POST(
  request: Request,
  context: { params: Promise<{ clueId: string }> }
) {
  const playerId = getPlayerIdFromRequest(request);
  const { clueId } = await context.params;
  const numericClueId = Number(clueId);

  if (!Number.isFinite(numericClueId)) {
    return NextResponse.json({ message: "유효하지 않은 단서 ID입니다." }, { status: 400 });
  }

  const result = markClueInteracted(numericClueId, playerId);

  if (!result) {
    return NextResponse.json(
      { message: "단서를 찾을 수 없거나 아직 해금되지 않았습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}
