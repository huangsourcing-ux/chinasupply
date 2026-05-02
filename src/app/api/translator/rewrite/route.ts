import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const rewriteRequestSchema = z.object({
  suggestedReplyZh: z.string().trim().min(1).max(3000),
  suggestedReplyEn: z.string().trim().min(1).max(3000),
  style: z.enum(["short", "strong", "friendly", "push_back"])
});

const rewriteResponseSchema = z.object({
  suggestedReplyZh: z
    .string()
    .min(1)
    .describe(
      "Rewritten Simplified Chinese buyer-to-supplier message. It must never be written from the supplier perspective."
    ),
  suggestedReplyEn: z
    .string()
    .min(1)
    .describe("English reference for the rewritten Chinese buyer-to-supplier message.")
});

const styleInstructions = {
  short:
    "Make it short and punchy, like a buyer sending a quick WhatsApp or WeChat message.",
  strong:
    "Make it stronger and commercially firm while staying professional.",
  friendly:
    "Make it warmer and relationship-friendly while keeping the buyer's request clear.",
  push_back:
    "Make it push back on the supplier's position, ask for confirmation or improvement, and keep buyer leverage."
};

async function generateRewrite({
  suggestedReplyZh,
  suggestedReplyEn,
  style
}: z.infer<typeof rewriteRequestSchema>) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const { output } = await generateText({
        model: process.env.AI_MODEL ?? "deepseek/deepseek-v4-flash",
        system: `You rewrite China sourcing buyer messages.

Rules:
- The user is the overseas buyer.
- The recipient is the Chinese supplier.
- suggestedReplyZh must always be buyer -> supplier.
- Never answer as the supplier.
- Never claim the supplier can provide, ship, produce, certify, discount, or deliver anything unless the original reply already says the supplier explicitly confirmed it.
- Write like a real buyer on WeChat or WhatsApp: natural, professional, concise, and practical.
- Do not write like a formal email.
- Keep it to 1-3 short chat sentences by default.
- Even for push back, sound like a buyer negotiating in chat, not a complaint letter.
- Avoid "您好", "Dear", "Hello", and "Thank you for your inquiry" unless the original message clearly asks for formal style.
- Return only structured data that matches the schema.`,
        prompt: `Rewrite this buyer-to-supplier message.

Style: ${styleInstructions[style]}

Current Chinese message:
${suggestedReplyZh}

Current English reference:
${suggestedReplyEn}

${attempt > 1 ? "Retry instruction: Return only the required schema fields. Every string field must be non-empty. No markdown, no explanation outside the object." : ""}`,
        temperature: attempt === 1 ? 0.2 : 0,
        maxOutputTokens: 500,
        maxRetries: 1,
        output: Output.object({
          name: "RewrittenSupplierMessage",
          description: "Rewritten buyer-to-supplier message and English reference.",
          schema: rewriteResponseSchema
        })
      });

      return output;
    } catch (error) {
      lastError = error;
      console.warn(`Translator rewrite attempt ${attempt} failed`, error);
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = rewriteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "A valid reply and rewrite style are required." },
      { status: 400 }
    );
  }

  try {
    const output = await generateRewrite(parsed.data);

    return NextResponse.json(output);
  } catch (error) {
    console.error("Translator rewrite failed", error);

    return NextResponse.json(
      { error: "Unable to rewrite this message right now. Please try again." },
      { status: 500 }
    );
  }
}
