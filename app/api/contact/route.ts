import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, phone, business, memo } = await req.json();

  const text = `새 문의가 왔어요!\n\n이름: ${name}\n연락처: ${phone}\n업종: ${business}\n메모: ${memo}`;

  // 텔레그램
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
  });

  // 이메일
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kundr5@naver.com",
    subject: `[Void Studio] 새 문의 - ${name}`,
    text,
  });

  return NextResponse.json({ ok: true });
}