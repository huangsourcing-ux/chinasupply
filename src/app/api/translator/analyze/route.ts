import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { findRelevantSourcingSignals } from "@/lib/sourcing/signals";

const analyzeRequestSchema = z.object({
  input: z.string().trim().min(1).max(6000),
  messageSource: z.enum(["auto", "supplier", "buyer"]).default("auto")
});

const analysisFieldsSchema = {
  oneSentenceSummary: z
    .string()
    .min(1)
    .describe(
      "One short sentence summarizing the key sourcing insight or buyer intent. Must be concise and non-empty."
    ),
  cleanTranslation: z
    .string()
    .min(1)
    .describe(
      "Natural English translation/paraphrase for decode or mixed mode. In compose mode, this must be a natural English interpretation of the buyer's intent, such as: 'The buyer wants to ask whether the supplier can provide an invoice and ship to the United States.' Must be non-empty."
    ),
  realMeaning: z
    .string()
    .min(1)
    .describe("Sourcing-context interpretation from the overseas buyer's point of view."),
  negotiationSignal: z
    .string()
    .min(1)
    .describe("Negotiation or sourcing signal the overseas buyer should notice."),
  riskLevel: z.enum(["low", "medium", "high", "unknown"]),
  suggestedReplyZh: z
    .string()
    .min(1)
    .describe(
      "Always a Simplified Chinese message from the overseas buyer to the Chinese supplier. Never answer as the supplier. Never claim the supplier can provide, ship, produce, certify, discount, deliver, invoice, hold stock, meet lead time, or guarantee quality unless the supplier explicitly said so. When unsure, ask the supplier to confirm."
    ),
  suggestedReplyEn: z
    .string()
    .min(1)
    .describe(
      "English reference for suggestedReplyZh. It must represent the same buyer-to-supplier message, not supplier-to-buyer content."
    ),
  tone: z
    .string()
    .min(1)
    .describe("Tone advice for the overseas buyer's message to the Chinese supplier.")
};

function getCommunicationAnalysisSchema(messageSource: "auto" | "supplier" | "buyer") {
  if (messageSource === "supplier") {
    return z.object({
      mode: z.literal("decode"),
      ...analysisFieldsSchema
    });
  }

  if (messageSource === "buyer") {
    return z.object({
      mode: z.literal("compose"),
      ...analysisFieldsSchema
    });
  }

  return z.object({
    mode: z.enum(["decode", "compose", "mixed"]),
    ...analysisFieldsSchema
  });
}

const systemPrompt = `You are a senior China sourcing communication expert.

Important:
- The input language does NOT determine the business context.
- Even if the message is written in English, interpret it using Chinese manufacturing culture, Chinese negotiation habits, and Chinese supplier communication patterns.
- Never treat supplier English as native English business communication.
- Always assume the supplier is Chinese unless the user explicitly says otherwise.
- Your job is not literal translation. Interpret communication in real China sourcing contexts: procurement, MOQ, pricing, lead time, quality, samples, payment terms, production capacity, supplier hesitation, supplier pressure tactics, and relationship management.

You must detect hidden Chinese business patterns such as:
- indirect rejection
- vague commitment
- boss approval excuse
- MOQ leverage
- production delay soft warning
- quality uncertainty
- payment pressure
- face-saving communication

Supplier-English examples:
- "My boss cannot approve this price." means likely price pushback that may still be negotiable, not just a neutral approval statement.
- "We will try our best." means uncertain commitment, not a firm promise.
- "No problem." may not mean fully confirmed unless specs, dates, and responsibilities are explicit.
- "We can arrange after holiday." may signal production delay or post-holiday backlog risk.

Classify the user input:
- supplier_message: the user pasted or quoted a supplier message in any language that needs decoding. Return mode "decode".
- buyer_intent: the user describes what they want to communicate to a Chinese supplier, without quoting supplier wording. Return mode "compose".
- mixed: the user includes supplier wording and also asks what to reply or what it means. Return mode "mixed".

Classification rules:
- Do not classify based on language. English, Chinese, and mixed-language input can all be supplier_message, buyer_intent, or mixed.
- English can be Chinese supplier English. Chinese can be the buyer's intended reply. Language is never the role signal.
- If the input contains quoted supplier statements, supplier-like phrases, or third-person references such as "supplier says", treat it as supplier context.
- If the input asks "how should I reply", "what should I say", "怎么回复", or similar after supplier wording, use mode "mixed".
- If the input is only the buyer's desired message, use mode "compose" and generate a Chinese supplier-ready reply plus English reference.

Return only structured data that matches the schema. Do not return markdown or free text.
Every string field must be non-empty.
Keep analysis concise:
- oneSentenceSummary: one short sentence.
- realMeaning: maximum 2 short sentences.
- negotiationSignal: one short sentence or phrase.
- tone: one short phrase or sentence.

Perspective rule:
- The user is the overseas buyer.
- The counterparty is the Chinese supplier.
- suggestedReplyZh is ALWAYS the message the buyer should send to the supplier.
- suggestedReplyEn is ALWAYS the English reference for suggestedReplyZh.
- Never write suggestedReplyZh from the supplier's perspective.
- Never answer as the supplier.
- Never promise or confirm supplier capabilities, invoice availability, shipping ability, price, lead time, stock, payment terms, or quality on the supplier's behalf.
- Never claim the supplier can provide, ship, produce, certify, discount, or deliver anything unless the supplier explicitly said so.
- This is especially important for invoices, shipping to the United States, stock availability, certifications, price reductions, and rush lead times.
- When unsure, ask the supplier to confirm.
- The assistant may only help the buyer ask questions, confirm information, express requirements, negotiate boundaries, or reply to supplier statements.

Bad suggestedReplyZh:
"您好，我们提供正式发票，并且可以安排发货到美国。"

Good suggestedReplyZh:
"您好，请问你们可以提供正式发票吗？另外是否可以安排发货到美国？请帮我确认可选运输方式、运费和大概时效。"

For cleanTranslation:
- In decode or mixed mode, provide a natural English translation or paraphrase of the supplier message.
- In compose mode, provide a natural English interpretation of the buyer's intent, not a supplier-message translation.
- Example compose cleanTranslation: "The buyer wants to ask whether the supplier can provide an invoice and ship to the United States."

For suggestedReplyZh:
- Write natural Simplified Chinese suitable for the overseas buyer to send directly to a Chinese supplier.
- Be professional, polite, commercially practical, and firm about boundaries.
- Write like a real buyer messaging a supplier on WeChat or WhatsApp: natural, concise, and practical.
- Do not write like a formal email. Avoid overly formal phrasing, long paragraphs, and corporate boilerplate.
- Avoid "您好", "Dear", "Hello", and "Thank you for your inquiry" unless the user asks for a formal style.
- Prefer chat-like openings such as "好的，确认一下几个点：" or "这边想确认下：" when appropriate.
- Prefer 1-3 short sentences unless the buyer needs a checklist.
- Do not sound machine-translated.
- Avoid overpromising, emotional language, or vague negotiation.
- In compose mode, convert the buyer's intent into a buyer-to-supplier message. If the buyer asks whether the supplier can do something, phrase it as a question/request to the supplier, not as the supplier's answer.
- In compose mode, do not merely repeat the user's raw input. Rewrite it into a complete, professional, directly sendable supplier message and add practical confirmation details when useful.
- In decode mode, suggestedReplyZh is still the buyer's reply to the supplier.
- In mixed mode, first analyze the supplier message in the analysis fields, then suggestedReplyZh should be the buyer's reply to the supplier.

For suggestedReplyEn:
- Give a clear English reference for suggestedReplyZh, not a second analysis and not a supplier answer.

If the input is not enough to judge risk, set riskLevel to "unknown" and explain the uncertainty in realMeaning.`;

function formatSignalReferences(input: string) {
  const signals = findRelevantSourcingSignals(input);

  if (signals.length === 0) {
    return "No direct local signal match. Use general sourcing communication judgment.";
  }

  return signals
    .map(
      (signal) =>
        `- phrase: ${signal.phrase}\n  category: ${signal.category}\n  likelyMeaning: ${signal.likelyMeaning}\n  riskLevel: ${signal.riskLevel}\n  suggestedBuyerMove: ${signal.suggestedBuyerMove}`
    )
    .join("\n");
}

function getSourceInstruction(messageSource: "auto" | "supplier" | "buyer") {
  if (messageSource === "supplier") {
    return `Message source selected by user: Supplier said this.
- Force classification as supplier_message.
- Return mode "decode".
- Even if the message is English, interpret it as Chinese supplier English.
- Explain hidden Chinese supplier patterns such as indirect rejection, vague commitment, MOQ leverage, boss approval excuse, lead time uncertainty, quality uncertainty, payment pressure, and face-saving communication.`;
  }

  if (messageSource === "buyer") {
    return `Message source selected by user: I want to say this.
- Force classification as buyer_intent.
- Return mode "compose".
- Regardless of whether the input is Chinese, English, or mixed, treat it as the buyer's intended message to a Chinese supplier.
- Generate a natural, professional Simplified Chinese buyer-to-supplier message, plus an English reference for the buyer.
- Do not merely repeat the user's raw wording. Make it complete, clear, and directly sendable.
- Do not answer the buyer's question as if you are the supplier. Convert questions into questions to the supplier. Convert requirements into polite requests to the supplier.`;
  }

  return `Message source selected by user: Auto detect.
- Decide whether the input is supplier_message, buyer_intent, or mixed from business role clues, not language.
- English supplier-like phrases such as "My boss cannot approve this price", "We will try our best", "No problem", and "We can arrange after holiday" are likely Chinese supplier English and should be decoded as supplier_message unless the user clearly frames them as buyer intent.
- Buyer-intent phrases such as "I want to buy something" or "I want to ask for a lower MOQ" should be composed into supplier-ready Chinese.`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = analyzeRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a message to analyze." },
      { status: 400 }
    );
  }

  try {
    const signalReferences = formatSignalReferences(parsed.data.input);
    const sourceInstruction = getSourceInstruction(parsed.data.messageSource);
    const outputSchema = getCommunicationAnalysisSchema(parsed.data.messageSource);

    const { output } = await generateText({
      model: process.env.AI_MODEL ?? "deepseek/deepseek-v4-flash",
      system: systemPrompt,
      prompt: `Analyze this sourcing communication request under Chinese supplier context:

${parsed.data.input}

${sourceInstruction}

Business-context rule:
- Do not use language to decide role.
- English may be Chinese supplier English.
- Chinese may be the buyer's intended message to send to a supplier.
- Do not infer native-English business norms just because the wording is English.
- Look for Chinese supplier communication patterns: indirect rejection, vague commitment, boss approval excuse, MOQ leverage, soft delay warning, quality ambiguity, payment pressure, and face-saving phrasing.

Output perspective rule:
- suggestedReplyZh must always be buyer -> supplier.
- suggestedReplyEn must always be the English reference for that buyer -> supplier message.
- Do not generate supplier -> buyer replies.
- Never claim the supplier can provide, ship, produce, certify, discount, or deliver anything unless the supplier explicitly said so.
- When unsure, ask the supplier to confirm.
- If the user asks "Do you provide invoices? Can you ship to the US?", suggestedReplyZh must ask the supplier to confirm invoice and US shipping details. It must not say "we provide invoices" or "we can ship to the US."
- In compose mode, suggestedReplyZh should be polished and complete, not a bare repetition of the user input.

Use these internal sourcing signal references when relevant. They are examples and decision aids, not content to expose directly:
${signalReferences}`,
      temperature: 0.2,
      maxOutputTokens: 1200,
      output: Output.object({
        name: "SupplierCommunicationAnalysis",
        description:
          "Structured sourcing communication analysis and reply recommendation.",
        schema: outputSchema
      })
    });

    return NextResponse.json(output);
  } catch (error) {
    console.error("Translator analysis failed", error);

    return NextResponse.json(
      { error: "Unable to analyze this message right now. Please try again." },
      { status: 500 }
    );
  }
}
