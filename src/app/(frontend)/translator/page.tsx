"use client";

import {
  AlertCircle,
  Check,
  Clipboard,
  Languages,
  Loader2,
  MessageSquareText,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type AnalysisResult = {
  mode: "decode" | "compose" | "mixed";
  oneSentenceSummary: string;
  cleanTranslation: string;
  realMeaning: string;
  negotiationSignal: string;
  riskLevel: "low" | "medium" | "high" | "unknown";
  suggestedReplyZh: string;
  suggestedReplyEn: string;
  tone: string;
};

type MessageSource = "auto" | "supplier" | "buyer";
type RewriteStyle = "short" | "strong" | "friendly" | "push_back";

const messageSourceOptions: Array<{
  value: MessageSource;
  label: string;
}> = [
  { value: "auto", label: "Auto" },
  { value: "supplier", label: "Supplier" },
  { value: "buyer", label: "Me" }
];

const riskStyles = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-red-200 bg-red-50 text-red-800",
  unknown: "border-neutral-200 bg-neutral-100 text-neutral-700"
};

const resultTitles = {
  decode: "What this supplier really means",
  compose: "Suggested message to supplier",
  mixed: "Meaning + suggested reply"
};

const rewriteOptions: Array<{
  style: RewriteStyle;
  label: string;
}> = [
  { style: "short", label: "Short" },
  { style: "strong", label: "Strong" },
  { style: "friendly", label: "Friendly" },
  { style: "push_back", label: "Push back" }
];

const examples = [
  {
    label: "Price pushback",
    input: "老板说这个价格不好做",
    translation: "This price is difficult for us.",
    meaning: "Supplier is pushing back on margin, not rejecting the order.",
    reply: "理解，请问在什么数量下这个价格可以成立？"
  },
  {
    label: "MOQ pressure",
    input: "数量太少不好安排",
    translation: "The quantity is too small to arrange.",
    meaning: "Supplier wants more volume or a small-order surcharge.",
    reply: "明白。请问最低可以按多少数量试单？如果数量少一些，单价会怎么变？"
  },
  {
    label: "Delivery delay",
    input: "节后安排",
    translation: "We can arrange it after the holiday.",
    meaning: "Likely delay risk, especially with post-holiday backlog.",
    reply: "可以，请先确认节后具体哪天能排产，预计什么时候可以发货。"
  },
  {
    label: "Sample refund",
    input: "样品费后面可以退",
    translation: "The sample fee can be refunded later.",
    meaning: "Refund is conditional and needs exact rules.",
    reply: "可以，请确认样品费退还条件：订单数量、下单时间，以及是全额退还是抵扣货款。"
  }
];

function FieldCard({
  title,
  value,
  icon: Icon
}: {
  title: string;
  value: string;
  icon: typeof MessageSquareText;
}) {
  return (
    <article className="rounded-md border border-neutral-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-950">
        <Icon className="h-4 w-4 text-teal-700" />
        {title}
      </div>
      <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-650">{value}</p>
    </article>
  );
}

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button
      className="h-10 border-neutral-300 bg-white px-4 text-neutral-950 hover:bg-neutral-100"
      onClick={handleCopy}
      type="button"
      variant="secondary"
    >
      {copied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export default function TranslatorPage() {
  const [input, setInput] = useState("");
  const [messageSource, setMessageSource] = useState<MessageSource>("auto");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rewriteStyle, setRewriteStyle] = useState<RewriteStyle | null>(null);

  const canAnalyze = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  async function handleAnalyze() {
    if (!input.trim()) {
      setError("Paste a supplier message or describe what you want to say.");
      return;
    }

    setIsLoading(true);
    setRewriteStyle(null);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/translator/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, messageSource })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Analysis failed.");
      }

      setResult(data as AnalysisResult);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to analyze this message right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRewrite(style: RewriteStyle) {
    if (!result || rewriteStyle) {
      return;
    }

    setRewriteStyle(style);
    setError("");

    try {
      const response = await fetch("/api/translator/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestedReplyZh: result.suggestedReplyZh,
          suggestedReplyEn: result.suggestedReplyEn,
          style
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Rewrite failed.");
      }

      setResult({
        ...result,
        suggestedReplyZh: data.suggestedReplyZh,
        suggestedReplyEn: data.suggestedReplyEn
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to rewrite this message right now."
      );
    } finally {
      setRewriteStyle(null);
    }
  }

  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const activeExample = examples[activeExampleIndex];

  function handleTryExample(index = activeExampleIndex) {
    setActiveExampleIndex(index);
    setInput(examples[index].input);
    setMessageSource("supplier");
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-[#0d1117]">
      <section className="border-b border-neutral-200 bg-[#02070b] text-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between">
            <Link className="text-xl font-semibold tracking-tight" href="/">
              ChinaSupply<span className="text-teal-300">.ai</span>
            </Link>
            <Link
              className="text-sm font-medium text-white/70 transition hover:text-white"
              href="/"
            >
              Back to Home
            </Link>
          </header>

          <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Talk with Chinese Suppliers Like a Pro
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Decode what Chinese suppliers really mean — even in English. Paste
                supplier messages in Chinese, English, or mixed chat. Get instant
                intent analysis and a ready-to-send reply.
              </p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/[0.045] p-5 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-400 text-[#02100f]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">Communication Copilot</div>
                  <div className="mt-1 text-sm text-white/55">
                    Built for MOQ, price, samples, lead time, quality, and payment talks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.7fr_1.55fr] lg:px-12">
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-[0_18px_70px_rgba(15,23,42,0.07)]">
          <div className="mb-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Paste a supplier message
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                We&apos;ll decode the intent and draft a reply.
              </p>
            </div>
          </div>

          <label className="sr-only" htmlFor="supplier-message">
            Supplier message or buyer intent
          </label>
          <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-3 transition focus-within:border-teal-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-100">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <MessageSquareText className="h-4 w-4" />
              Message
            </div>
            <textarea
              className="min-h-[112px] w-full resize-y border-0 bg-transparent text-base leading-7 outline-none placeholder:text-neutral-400"
              id="supplier-message"
              onChange={(event) => setInput(event.target.value)}
              placeholder={`老板说这个价格不好做
We will try our best.
I want to ask about MOQ.`}
              value={input}
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="text-neutral-500">{input.trim().length} characters</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500">Try</span>
            {examples.slice(0, 3).map((example, index) => (
              <button
                className="font-semibold text-teal-700 transition hover:text-teal-900"
                key={example.label}
                onClick={() => handleTryExample(index)}
                type="button"
              >
                {example.label}
              </button>
            ))}
          </div>

          <fieldset className="mt-4">
            <legend className="mb-2 text-sm font-semibold text-neutral-950">
              Who&apos;s talking? <span className="font-normal text-neutral-500">(optional)</span>
            </legend>
            <div className="grid gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-1 sm:grid-cols-3">
              {messageSourceOptions.map((option) => {
                const isSelected = messageSource === option.value;

                return (
                  <button
                    className={`h-10 rounded px-3 text-sm font-semibold transition ${
                      isSelected
                        ? "bg-[#07151c] text-white shadow-sm"
                        : "text-neutral-650 hover:bg-white hover:text-neutral-950"
                    }`}
                    key={option.value}
                    onClick={() => setMessageSource(option.value)}
                    type="button"
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {error && (
            <div className="mt-4 flex gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-5">
            <Button
              className="h-11 w-full bg-teal-600 px-6 text-white hover:bg-teal-700"
              disabled={!canAnalyze}
              onClick={handleAnalyze}
              type="button"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Decode & Reply
            </Button>
          </div>
        </div>

        <div className="min-h-[460px]">
          {!result && (
            <div
              className="min-h-[460px] cursor-pointer rounded-md border border-neutral-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.07)] transition hover:-translate-y-0.5 hover:border-teal-200"
              onClick={() => handleTryExample()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleTryExample();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
                Example analysis
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {examples.map((example, index) => {
                  const isActive = activeExampleIndex === index;

                  return (
                    <button
                      className={`h-9 rounded-full border px-3 text-sm font-semibold transition ${
                        isActive
                          ? "border-[#07151c] bg-[#07151c] text-white"
                          : "border-neutral-200 bg-white text-neutral-650 hover:border-teal-300 hover:text-neutral-950"
                      }`}
                      key={example.label}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleTryExample(index);
                      }}
                      type="button"
                    >
                      {example.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-sm font-semibold text-neutral-950">Supplier said</div>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                  {activeExample.input}
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  “{activeExample.translation}”
                </p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <article className="rounded-md border border-neutral-200 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <Languages className="h-4 w-4 text-teal-700" />
                    What it means
                  </div>
                  <p className="text-sm leading-7 text-neutral-650">
                    {activeExample.meaning}
                  </p>
                </article>
                <article className="rounded-md border border-neutral-200 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <MessageSquareText className="h-4 w-4 text-teal-700" />
                    Ready to send
                  </div>
                  <p className="text-sm leading-7 text-neutral-650">
                    {activeExample.reply}
                  </p>
                </article>
              </div>

              <button
                className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#07151c] px-4 text-sm font-semibold text-white transition hover:bg-[#10222c]"
                onClick={(event) => {
                  event.stopPropagation();
                  handleTryExample();
                }}
                type="button"
              >
                Try this example
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-[0_18px_70px_rgba(15,23,42,0.07)]">
                <div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
                      {result.mode}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      {resultTitles[result.mode]}
                    </h2>
                  </div>
                </div>

                <div className="mt-5 rounded-md border border-teal-100 bg-teal-50 p-4 text-sm font-semibold leading-6 text-teal-950">
                  {result.oneSentenceSummary}
                </div>

                <div className="mt-4 rounded-md bg-[#07151c] p-5 text-white">
                  <div className="mb-3 text-sm font-semibold text-teal-300">
                    Recommended Chinese reply
                  </div>
                  <p className="whitespace-pre-wrap text-base leading-8">{result.suggestedReplyZh}</p>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                    <span className="mr-1 flex h-9 items-center text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                      Quick Styles
                    </span>
                    {rewriteOptions.map((option) => (
                      <button
                        className="inline-flex h-9 items-center justify-center rounded border border-white/15 px-3 text-sm font-semibold text-white/82 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-55"
                        disabled={rewriteStyle !== null}
                        key={option.style}
                        onClick={() => handleRewrite(option.style)}
                        type="button"
                      >
                        {rewriteStyle === option.style && (
                          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        )}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-5">
                  <div className="mb-3 text-sm font-semibold text-neutral-950">
                    English reference
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-650">
                    {result.suggestedReplyEn}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <CopyButton label="Copy & Send" value={result.suggestedReplyZh} />
                  <CopyButton label="Copy English reference" value={result.suggestedReplyEn} />
                </div>
              </section>

              <div className="grid gap-4 xl:grid-cols-2">
                <FieldCard
                  icon={Languages}
                  title="Natural translation"
                  value={result.cleanTranslation}
                />
                <FieldCard
                  icon={MessageSquareText}
                  title="Real meaning"
                  value={result.realMeaning}
                />
                <article className="rounded-md border border-neutral-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    <ShieldAlert className="h-4 w-4 text-teal-700" />
                    Risk level
                  </div>
                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold ${riskStyles[result.riskLevel]}`}
                  >
                    {result.riskLevel} risk
                  </span>
                </article>
                <FieldCard
                  icon={ShieldAlert}
                  title="Negotiation signal"
                  value={result.negotiationSignal}
                />
                <FieldCard icon={Sparkles} title="Tone advice" value={result.tone} />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
