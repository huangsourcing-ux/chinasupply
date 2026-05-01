import type { CompanyDetail, SupplierAssessment } from "@/features/supplier-check/types";

const factoryKeywords = ["生产", "制造", "加工", "研发", "模具", "工业园", "厂"];
const tradingKeywords = ["贸易", "批发", "零售", "进出口", "商务中心"];

export function assessSupplier(company: CompanyDetail): SupplierAssessment {
  const source = `${company.name} ${company.address ?? ""} ${company.businessScope ?? ""}`;
  const factorySignals = factoryKeywords.filter((keyword) => source.includes(keyword));
  const tradingSignals = tradingKeywords.filter((keyword) => source.includes(keyword));
  const hasFactorySignals = factorySignals.length >= 2;
  const hasTradingSignals = tradingSignals.length >= 2;

  const supplierType =
    hasFactorySignals && hasTradingSignals
      ? "manufacturer_trader"
      : hasFactorySignals
        ? "factory"
        : hasTradingSignals
          ? "trading_company"
          : "unclear";

  const score =
    supplierType === "factory"
      ? 78
      : supplierType === "manufacturer_trader"
        ? 82
        : supplierType === "trading_company"
          ? 64
          : 45;

  return {
    supplierType,
    riskLevel: score >= 75 ? "low" : score >= 60 ? "medium" : "unknown",
    score,
    summary:
      "This is an initial rule-based assessment using mock data. The production version will combine official company data, website evidence, and AI reasoning.",
    factorySignals,
    tradingSignals,
    riskSignals:
      supplierType === "trading_company"
        ? ["Registered address appears commercial rather than industrial."]
        : [],
    suggestedQuestions: [
      "Can you share factory photos and production line videos?",
      "Do you own the factory or work with partner factories?",
      "Can you provide business license and export records?",
      "What is your MOQ, sample lead time, and mass production lead time?"
    ]
  };
}
