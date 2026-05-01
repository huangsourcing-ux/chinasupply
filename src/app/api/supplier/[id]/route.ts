import { NextResponse } from "next/server";
import { assessSupplier } from "@/features/supplier-check/assessment";
import { getCompanyDataProvider } from "@/features/supplier-check/providers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const provider = getCompanyDataProvider();

  try {
    const company = await provider.getCompanyDetail(id);
    const assessment = assessSupplier(company);

    return NextResponse.json({ company, assessment });
  } catch {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }
}
