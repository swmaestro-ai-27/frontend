import { NextResponse } from "next/server";
import {
  appendAriaMessageAndGenerateReply,
  getAriaMessages,
  getPlayerIdFromRequest,
} from "@/lib/mockBackendStore";

export async function GET(request: Request) {
  const playerId = getPlayerIdFromRequest(request);

  return NextResponse.json({
    messages: getAriaMessages(playerId),
  });
}

export async function POST(request: Request) {
  const playerId = getPlayerIdFromRequest(request);
  const body = (await request.json().catch(() => null)) as
    | { content?: string }
    | null;
  const content = body?.content?.trim();

  if (!content) {
    return NextResponse.json(
      { message: "메시지 내용이 비어 있습니다." },
      { status: 400 }
    );
  }

  const reply = await appendAriaMessageAndGenerateReply({ content, playerId });

  if (!reply) {
    return NextResponse.json(
      { message: "ARIA 응답을 생성할 수 없습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    sender: reply.senderName,
    content: reply.content,
    id: reply.id,
    createdAt: reply.createdAt,
  });
}
