import { NextResponse } from "next/server";
import { z } from "zod";
import { getCompanyDataProvider } from "@/features/supplier-check/providers";

const searchSchema = z.object({
  keyword: z.string().trim().min(1).max(120)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = searchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "A valid keyword is required." },
      { status: 400 }
    );
  }

  const provider = getCompanyDataProvider();
  const results = await provider.searchCompanies(parsed.data.keyword);

  return NextResponse.json({ results });
}
