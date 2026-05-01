import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "chinasupply-ai",
    timestamp: new Date().toISOString()
  });
}
