export type SourcingSignalCategory =
  | "price"
  | "moq"
  | "lead_time"
  | "quality"
  | "sample"
  | "payment";

export type SourcingSignalRiskLevel = "low" | "medium" | "high" | "unknown";

export type SourcingSignal = {
  phrase: string;
  category: SourcingSignalCategory;
  likelyMeaning: string;
  riskLevel: SourcingSignalRiskLevel;
  suggestedBuyerMove: string;
};

export const sourcingSignals: SourcingSignal[] = [
  {
    phrase: "这个价格不好做",
    category: "price",
    likelyMeaning: "The supplier is resisting the target price and may have limited margin or is testing whether the buyer will push harder.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for a costed alternative, quantity break, or specification tradeoff instead of accepting the first refusal."
  },
  {
    phrase: "老板批不了",
    category: "price",
    likelyMeaning: "The salesperson is using an internal authority blocker to avoid direct concession.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask what price or quantity would be approvable and request written confirmation after internal review."
  },
  {
    phrase: "已经是最低价了",
    category: "price",
    likelyMeaning: "The supplier is anchoring the negotiation and creating a price floor, which may or may not be true.",
    riskLevel: "medium",
    suggestedBuyerMove: "Shift discussion to total landed cost, packaging, payment terms, warranty, or tiered pricing."
  },
  {
    phrase: "再低就亏本了",
    category: "price",
    likelyMeaning: "The supplier is signaling little willingness to cut price further and may reduce quality if pushed too hard.",
    riskLevel: "medium",
    suggestedBuyerMove: "Do not simply force a lower price; ask what specs or terms would change at the target price."
  },
  {
    phrase: "看你后面订单量",
    category: "price",
    likelyMeaning: "The supplier wants future volume commitment before offering better pricing.",
    riskLevel: "low",
    suggestedBuyerMove: "Offer a realistic forecast but avoid binding volume promises before sample and quality approval."
  },
  {
    phrase: "价格可以再商量",
    category: "price",
    likelyMeaning: "There is room to negotiate, often if quantity, payment, or timeline improves.",
    riskLevel: "low",
    suggestedBuyerMove: "Ask for a revised quotation based on exact quantity, packaging, and delivery terms."
  },
  {
    phrase: "原材料涨价了",
    category: "price",
    likelyMeaning: "The supplier is justifying a price increase; it may be valid but needs evidence.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for the affected material, change percentage, validity period, and whether old pricing can hold for this order."
  },
  {
    phrase: "这个价只能做普通质量",
    category: "price",
    likelyMeaning: "The quoted low price may compromise material, workmanship, testing, or warranty.",
    riskLevel: "high",
    suggestedBuyerMove: "Clarify quality standard, materials, inspection criteria, and request separate pricing for acceptable quality."
  },
  {
    phrase: "数量太少不好安排",
    category: "moq",
    likelyMeaning: "The order is below efficient production quantity or the supplier does not prioritize small buyers.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for trial-order options, surcharge, mixed SKU allowance, or stock availability."
  },
  {
    phrase: "这个起订量做不了",
    category: "moq",
    likelyMeaning: "The supplier claims the requested MOQ is below production or purchasing constraints.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for the true constraint and the lowest feasible MOQ for a paid trial order."
  },
  {
    phrase: "低于这个数量成本很高",
    category: "moq",
    likelyMeaning: "Small volume may trigger setup, material, or labor inefficiency costs.",
    riskLevel: "low",
    suggestedBuyerMove: "Request a low-MOQ surcharge and a price ladder for larger quantities."
  },
  {
    phrase: "可以拼单",
    category: "moq",
    likelyMeaning: "The supplier may combine the buyer's order with other production, reducing MOQ but limiting control.",
    riskLevel: "medium",
    suggestedBuyerMove: "Confirm production schedule, batch consistency, labeling, packaging, and quality control responsibility."
  },
  {
    phrase: "先试单可以",
    category: "moq",
    likelyMeaning: "The supplier is open to a smaller first order, often at a higher unit price.",
    riskLevel: "low",
    suggestedBuyerMove: "Define trial order quantity, price, QC criteria, and future price after approval."
  },
  {
    phrase: "这个数量没有优势",
    category: "moq",
    likelyMeaning: "The supplier is signaling weak pricing power for the requested volume.",
    riskLevel: "low",
    suggestedBuyerMove: "Ask for the quantity tiers where pricing improves and compare against budget."
  },
  {
    phrase: "要整箱出",
    category: "moq",
    likelyMeaning: "The supplier wants to ship full cartons to simplify packing and reduce handling.",
    riskLevel: "low",
    suggestedBuyerMove: "Ask for units per carton, carton dimensions, and whether partial cartons are possible with a fee."
  },
  {
    phrase: "节后安排",
    category: "lead_time",
    likelyMeaning: "Production or shipment will likely wait until after a Chinese holiday, with possible backlog risk.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for exact restart date, production slot, and written delivery schedule."
  },
  {
    phrase: "要看物料情况",
    category: "lead_time",
    likelyMeaning: "Key materials are not confirmed; lead time is uncertain.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask which materials are pending, when availability can be confirmed, and whether substitutes affect quality."
  },
  {
    phrase: "尽量给你赶",
    category: "lead_time",
    likelyMeaning: "The supplier is not committing firmly and may be offering best-effort timing.",
    riskLevel: "medium",
    suggestedBuyerMove: "Request a confirmed production timeline with milestones and consequences for delay."
  },
  {
    phrase: "差不多这个时间",
    category: "lead_time",
    likelyMeaning: "The delivery estimate is approximate and not a firm commitment.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for exact dates for sample, mass production, inspection, and shipment."
  },
  {
    phrase: "现在排单比较满",
    category: "lead_time",
    likelyMeaning: "Factory capacity is constrained and the buyer may not get priority.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for earliest available slot and whether deposit timing secures the slot."
  },
  {
    phrase: "下周应该可以",
    category: "lead_time",
    likelyMeaning: "The supplier is giving a soft promise, not a guaranteed date.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask them to confirm a specific date after checking production and logistics."
  },
  {
    phrase: "今天发不了",
    category: "lead_time",
    likelyMeaning: "There is an immediate delay, possibly due to stock, payment, packing, or logistics issues.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for the blocker and the exact next shipment date with tracking expectations."
  },
  {
    phrase: "问题不大",
    category: "quality",
    likelyMeaning: "The supplier may be minimizing a quality or feasibility issue without giving firm assurance.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for objective specs, test results, samples, or photos before accepting."
  },
  {
    phrase: "差不多",
    category: "quality",
    likelyMeaning: "The supplier may treat tolerances, color, material, or finish as approximate.",
    riskLevel: "high",
    suggestedBuyerMove: "Define measurable acceptance standards and reject vague equivalence."
  },
  {
    phrase: "我们一直这样做",
    category: "quality",
    likelyMeaning: "The supplier is relying on existing process rather than adapting to the buyer's standard.",
    riskLevel: "medium",
    suggestedBuyerMove: "Share your required specification and ask if they can meet it exactly."
  },
  {
    phrase: "正常现象",
    category: "quality",
    likelyMeaning: "The supplier may be dismissing a defect as acceptable industry variance.",
    riskLevel: "high",
    suggestedBuyerMove: "Ask for defect standard, tolerance range, photos, and whether replacements or rework are available."
  },
  {
    phrase: "不影响使用",
    category: "quality",
    likelyMeaning: "The supplier admits an issue exists but argues it is not functional.",
    riskLevel: "medium",
    suggestedBuyerMove: "Clarify cosmetic versus functional acceptance criteria and customer-facing impact."
  },
  {
    phrase: "按行业标准",
    category: "quality",
    likelyMeaning: "The supplier is using a vague standard unless a specific standard is named.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask which exact standard applies and attach your inspection checklist."
  },
  {
    phrase: "可以改一下",
    category: "quality",
    likelyMeaning: "The supplier can make adjustments, but cost, time, and consistency may change.",
    riskLevel: "low",
    suggestedBuyerMove: "Confirm revised spec, sample approval process, added cost, and lead time impact."
  },
  {
    phrase: "可以先打样看看",
    category: "sample",
    likelyMeaning: "The supplier wants to validate feasibility through a sample before committing to mass production.",
    riskLevel: "low",
    suggestedBuyerMove: "Proceed with sample only after confirming sample fee, timeline, refund terms, and acceptance criteria."
  },
  {
    phrase: "样品费后面可以退",
    category: "sample",
    likelyMeaning: "Refund is conditional and may depend on order size, timing, or internal policy.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for written refund conditions: order quantity, order deadline, and deduction method."
  },
  {
    phrase: "样品和大货会有一点差异",
    category: "sample",
    likelyMeaning: "The approved sample may not exactly match mass production, creating quality risk.",
    riskLevel: "high",
    suggestedBuyerMove: "Define golden sample rules and require mass production to match approved sample."
  },
  {
    phrase: "打样时间不确定",
    category: "sample",
    likelyMeaning: "The supplier has uncertainty around materials, engineering, or production priority.",
    riskLevel: "medium",
    suggestedBuyerMove: "Ask for the reason and the earliest realistic sample completion date."
  },
  {
    phrase: "样品只能做接近的",
    category: "sample",
    likelyMeaning: "The sample will not fully represent final production specs.",
    riskLevel: "high",
    suggestedBuyerMove: "Ask what will differ and avoid approving mass production based on a non-representative sample."
  },
  {
    phrase: "样品寄出后不能退",
    category: "sample",
    likelyMeaning: "Sample costs are non-refundable or refund terms are restrictive.",
    riskLevel: "medium",
    suggestedBuyerMove: "Confirm total sample cost, freight, and whether credit can apply to the first bulk order."
  },
  {
    phrase: "尾款发货前付清",
    category: "payment",
    likelyMeaning: "The supplier wants full payment before shipment, which is common but reduces buyer leverage.",
    riskLevel: "medium",
    suggestedBuyerMove: "Tie balance payment to pre-shipment inspection approval and final packing photos."
  },
  {
    phrase: "先付定金我们安排生产",
    category: "payment",
    likelyMeaning: "The supplier requires deposit before allocating materials or production capacity.",
    riskLevel: "low",
    suggestedBuyerMove: "Use a standard deposit only after PI, specs, timeline, and refund/cancellation terms are clear."
  },
  {
    phrase: "不支持账期",
    category: "payment",
    likelyMeaning: "The supplier will not offer credit terms, often for new buyers or small orders.",
    riskLevel: "low",
    suggestedBuyerMove: "Negotiate milestone payment, inspection before balance, or escrow-like protection if needed."
  },
  {
    phrase: "款到发货",
    category: "payment",
    likelyMeaning: "Shipment will only happen after payment receipt; buyer has limited leverage after paying.",
    riskLevel: "medium",
    suggestedBuyerMove: "Require inspection evidence, packing list, photos, and shipment booking before final payment."
  },
  {
    phrase: "美金账户暂时用不了",
    category: "payment",
    likelyMeaning: "Payment account change or limitation may be legitimate, but it can also signal fraud or compliance risk.",
    riskLevel: "high",
    suggestedBuyerMove: "Do not pay a new account without independent verification through known contacts and company documents."
  },
  {
    phrase: "可以走私人账户",
    category: "payment",
    likelyMeaning: "The supplier suggests personal-account payment, creating fraud, tax, and accountability risk.",
    riskLevel: "high",
    suggestedBuyerMove: "Refuse personal-account payment and request verified company bank details matching the supplier entity."
  }
];

const categoryKeywords: Record<SourcingSignalCategory, string[]> = {
  price: [
    "价",
    "报价",
    "成本",
    "涨价",
    "优惠",
    "便宜",
    "利润",
    "price",
    "cost",
    "boss",
    "approve",
    "lowest",
    "best price",
    "cannot approve",
    "not easy"
  ],
  moq: [
    "数量",
    "起订",
    "起订量",
    "MOQ",
    "箱",
    "试单",
    "拼单",
    "quantity",
    "order quantity",
    "small order",
    "minimum order",
    "carton",
    "trial order"
  ],
  lead_time: [
    "交期",
    "生产",
    "排单",
    "发货",
    "安排",
    "下周",
    "节后",
    "物料",
    "lead time",
    "production",
    "arrange",
    "after holiday",
    "try our best",
    "next week",
    "material",
    "schedule",
    "ship"
  ],
  quality: [
    "质量",
    "问题",
    "差不多",
    "标准",
    "不影响",
    "改",
    "正常",
    "quality",
    "no problem",
    "almost same",
    "similar",
    "normal",
    "standard",
    "does not affect",
    "can change"
  ],
  sample: [
    "样品",
    "打样",
    "样板",
    "寄样",
    "样品费",
    "sample",
    "sample fee",
    "make sample",
    "send sample",
    "refund sample"
  ],
  payment: [
    "付款",
    "尾款",
    "定金",
    "账户",
    "款到",
    "账期",
    "美金",
    "payment",
    "balance",
    "deposit",
    "bank account",
    "pay before shipment",
    "private account",
    "usd account",
    "payment terms"
  ]
};

export function findRelevantSourcingSignals(input: string, limit = 10) {
  const normalizedInput = input.toLowerCase();

  const scoredSignals = sourcingSignals.map((signal, index) => {
    const phraseMatch = normalizedInput.includes(signal.phrase.toLowerCase()) ? 8 : 0;
    const keywordMatch = categoryKeywords[signal.category].filter((keyword) =>
      normalizedInput.includes(keyword.toLowerCase())
    ).length;

    return {
      signal,
      index,
      score: phraseMatch + keywordMatch
    };
  });

  return scoredSignals
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.signal);
}
