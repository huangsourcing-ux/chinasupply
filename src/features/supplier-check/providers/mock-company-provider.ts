import type {
  CompanyDataProvider,
  CompanyDetail,
  CompanySearchResult
} from "@/features/supplier-check/types";

const mockCompanies: CompanyDetail[] = [
  {
    id: "mock-dongguan-precision",
    name: "东莞市华源精密制造有限公司",
    creditCode: "91441900MA00000001",
    legalPerson: "Chen Wei",
    registeredCapital: "1000万人民币",
    establishedDate: "2016-08-12",
    status: "存续",
    base: "广东东莞",
    address: "广东省东莞市长安镇某工业园",
    businessScope:
      "研发、生产、加工、销售：五金制品、塑胶制品、模具、电子配件；货物或技术进出口。",
    website: "https://example-factory.cn"
  },
  {
    id: "mock-shenzhen-trade",
    name: "深圳市远航国际贸易有限公司",
    creditCode: "91440300MA00000002",
    legalPerson: "Li Ming",
    registeredCapital: "100万人民币",
    establishedDate: "2021-03-18",
    status: "存续",
    base: "广东深圳",
    address: "深圳市福田区某商务中心",
    businessScope:
      "电子产品、家居用品、日用品的批发与零售；国内贸易；货物及技术进出口。",
    website: "https://example-trading.cn"
  }
];

export class MockCompanyProvider implements CompanyDataProvider {
  async searchCompanies(keyword: string): Promise<CompanySearchResult[]> {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return mockCompanies
      .filter((company) => {
        if (!normalizedKeyword) {
          return true;
        }

        return (
          company.name.toLowerCase().includes(normalizedKeyword) ||
          company.creditCode?.toLowerCase().includes(normalizedKeyword) ||
          company.base?.toLowerCase().includes(normalizedKeyword)
        );
      })
      .map(({ id, name, creditCode, legalPerson, registeredCapital, status, base }) => ({
        id,
        name,
        creditCode,
        legalPerson,
        registeredCapital,
        status,
        base
      }));
  }

  async getCompanyDetail(companyIdOrCode: string): Promise<CompanyDetail> {
    const company = mockCompanies.find(
      (item) => item.id === companyIdOrCode || item.creditCode === companyIdOrCode
    );

    if (!company) {
      throw new Error("Company not found in mock provider.");
    }

    return company;
  }
}
