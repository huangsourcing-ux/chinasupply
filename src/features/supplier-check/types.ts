export type SupplierType =
  | "factory"
  | "trading_company"
  | "manufacturer_trader"
  | "unclear";

export type RiskLevel = "low" | "medium" | "high" | "unknown";

export type CompanySearchResult = {
  id: string;
  name: string;
  creditCode?: string;
  legalPerson?: string;
  registeredCapital?: string;
  status?: string;
  base?: string;
};

export type CompanyDetail = CompanySearchResult & {
  establishedDate?: string;
  address?: string;
  businessScope?: string;
  website?: string;
  contactPhone?: string;
};

export type SupplierAssessment = {
  supplierType: SupplierType;
  riskLevel: RiskLevel;
  score: number;
  summary: string;
  factorySignals: string[];
  tradingSignals: string[];
  riskSignals: string[];
  suggestedQuestions: string[];
};

export interface CompanyDataProvider {
  searchCompanies(keyword: string): Promise<CompanySearchResult[]>;
  getCompanyDetail(companyIdOrCode: string): Promise<CompanyDetail>;
}
