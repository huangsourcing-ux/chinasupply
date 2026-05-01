import { MockCompanyProvider } from "@/features/supplier-check/providers/mock-company-provider";
import type { CompanyDataProvider } from "@/features/supplier-check/types";

export function getCompanyDataProvider(): CompanyDataProvider {
  const provider = process.env.COMPANY_DATA_PROVIDER ?? "mock";

  switch (provider) {
    case "mock":
      return new MockCompanyProvider();
    default:
      return new MockCompanyProvider();
  }
}
