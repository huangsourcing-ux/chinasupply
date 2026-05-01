import {
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  Factory,
  FileText,
  Globe2,
  Languages,
  Map,
  MapPin,
  Radar,
  Search,
  Share2,
  ShieldCheck,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workflow = [
  {
    step: "1",
    icon: Search,
    title: "Search",
    text: "Enter a company name, credit code, or website to start."
  },
  {
    step: "2",
    icon: Radar,
    title: "AI Analysis",
    text: "Our AI analyzes company profile, risk, region, and performance signals."
  },
  {
    step: "3",
    icon: FileText,
    title: "Intelligence Report",
    text: "Get a clear report with classification, evidence, and suggested next steps."
  },
  {
    step: "4",
    icon: CheckCircle2,
    title: "Decide with Confidence",
    text: "Share, export, and act with data-backed sourcing confidence."
  }
];

const modules = [
  {
    icon: ShieldCheck,
    title: "Supplier Check",
    text: "Deep company background checks, risk monitoring, and performance insights.",
    action: "Check a Supplier"
  },
  {
    icon: Languages,
    title: "Trade Translator",
    text: "AI-powered translation of supplier messages, contracts, and technical documents.",
    action: "Try Translator"
  },
  {
    icon: Map,
    title: "Supply Map",
    text: "Discover production regions, industry clusters, and supply chain opportunities.",
    action: "Explore Map"
  }
];

const signals = [
  "Business Operating Normally",
  "No Serious Legal Risks",
  "Export Experience: 6+ Years",
  "High-Response Supplier"
];

const regions = [
  { name: "Guangdong", specialty: "Electronics, Machinery", x: "72%", y: "68%" },
  { name: "Zhejiang", specialty: "Apparel, Textiles", x: "78%", y: "49%" },
  { name: "Sichuan", specialty: "Electronics, Auto Parts", x: "48%", y: "53%" }
];

function MiniChart() {
  return (
    <div className="relative h-24 overflow-hidden rounded-md bg-[#061219]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.08)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 120" fill="none">
        <path
          d="M0 91L42 88L82 93L122 69L164 78L207 43L248 63L286 39L328 29L360 12V120H0V91Z"
          fill="url(#chartFill)"
        />
        <path
          d="M0 91L42 88L82 93L122 69L164 78L207 43L248 63L286 39L328 29L360 12"
          stroke="#2dd4bf"
          strokeWidth="4"
        />
        <defs>
          <linearGradient id="chartFill" x1="180" x2="180" y1="12" y2="120">
            <stop stopColor="#2dd4bf" stopOpacity="0.42" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ChinaMap() {
  return (
    <div className="relative min-h-[350px] overflow-hidden bg-[#061219]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg
        className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 520 390"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M150 93L205 55L270 71L318 36L376 74L424 122L397 182L452 236L389 287L331 272L292 334L221 305L168 322L114 277L80 209L116 157L150 93Z"
          fill="#0b2229"
          stroke="#2dd4bf"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
        <path
          d="M151 166C209 142 244 149 300 189C336 214 368 230 424 223"
          stroke="#2dd4bf"
          strokeOpacity="0.45"
          strokeWidth="2"
        />
        <path
          d="M190 276C248 242 316 235 389 247"
          stroke="#fbbf24"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        {regions.map((region) => (
          <g key={region.name}>
            <circle cx={region.x} cy={region.y} r="18" fill="#2dd4bf" opacity="0.12" />
            <circle cx={region.x} cy={region.y} r="7" fill="#2dd4bf" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_62%,rgba(45,212,191,0.25),transparent_26%),radial-gradient(circle_at_58%_42%,rgba(251,191,36,0.18),transparent_22%)]" />
      {regions.map((region) => (
        <div
          className="absolute rounded-md border border-white/15 bg-[#07151c]/85 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur"
          key={region.name}
          style={{ left: region.x, top: region.y }}
        >
          <div className="font-semibold">{region.name}</div>
          <div className="mt-1 text-white/58">{region.specialty}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0d1117]">
      <section className="relative overflow-hidden bg-[#02070b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_26%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(59,130,246,0.13),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute -bottom-24 left-0 right-0 h-44 bg-gradient-to-t from-white to-transparent" />

        <div className="relative mx-auto flex min-h-[820px] w-full max-w-[1440px] flex-col px-5 py-4 sm:px-8 lg:min-h-[860px] lg:px-12">
          <header className="flex h-16 items-center justify-between">
            <a className="text-xl font-semibold tracking-tight sm:text-2xl" href="#">
              ChinaSupply<span className="text-teal-300">.ai</span>
            </a>
            <nav className="hidden items-center gap-8 text-sm font-medium text-white/78 lg:flex">
              <a className="transition hover:text-white" href="#supplier-check">
                Supplier Check
              </a>
              <a className="transition hover:text-white" href="#translator">
                Translator
              </a>
              <a className="transition hover:text-white" href="#map">
                Supply Map
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button
                className="hidden border-white/20 bg-transparent text-white hover:bg-white/10 sm:inline-flex"
                type="button"
                variant="secondary"
              >
                Log in
              </Button>
              <Button className="bg-teal-500 text-[#01100e] hover:bg-teal-300" type="button">
                Check Supplier
              </Button>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.82fr_1fr] lg:py-14">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.7rem]">
                China supplier intelligence, powered by AI.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Check Chinese companies. Understand supplier messages. Discover where
                and what gets made.
              </p>

              <form className="mt-9 flex max-w-3xl flex-col overflow-hidden rounded-md border border-white/10 bg-white shadow-2xl shadow-teal-950/30 sm:flex-row">
                <label className="sr-only" htmlFor="supplier-search">
                  Search supplier
                </label>
                <div className="flex min-h-16 flex-1 items-center gap-4 px-5 text-[#0d1117]">
                  <Search className="h-5 w-5 shrink-0 text-[#0d1117]" />
                  <input
                    autoComplete="organization"
                    id="supplier-search"
                    name="q"
                    enterKeyHint="search"
                    className="h-14 w-full min-w-0 border-0 bg-transparent text-base outline-none placeholder:text-neutral-500"
                    placeholder="输入中文公司名、统一社会信用代码或官网"
                  />
                </div>
                <Button
                  className="h-16 rounded-none bg-teal-500 px-8 text-[#01100e] hover:bg-teal-300"
                  type="button"
                >
                  Check Supplier
                </Button>
              </form>

              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/48">
                <span>示例：深圳市示例科技有限公司</span>
                <span>91310101MA1FPJMT6E</span>
                <span>hktdc.com</span>
              </div>
            </div>

            <aside className="rounded-lg border border-white/18 bg-[#081118]/78 p-4 shadow-2xl shadow-black/45 backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xl font-semibold">
                    Shenzhen Example Technology Co., Ltd.
                    <Star className="h-4 w-4 text-white/55" />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/48">
                    <span>91310101MA1FPJMT6E</span>
                    <span>Shenzhen, Guangdong, China</span>
                    <span>Updated: May 23, 2025</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="h-10 border-white/14 bg-transparent px-3 text-xs text-white hover:bg-white/10"
                    type="button"
                    variant="secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                  <Button
                    className="h-10 border-white/14 bg-transparent px-3 text-xs text-white hover:bg-white/10"
                    type="button"
                    variant="secondary"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Overall Risk</div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-2xl font-semibold text-teal-300">Low Risk</div>
                    <ShieldCheck className="h-12 w-12 text-teal-300" />
                  </div>
                  <div className="mt-7 text-xs text-white/52">Confidence Score</div>
                  <div className="mt-1 flex items-end gap-1">
                    <span className="text-2xl font-semibold">87</span>
                    <span className="text-sm text-white/50">/100</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[87%] rounded-full bg-teal-300" />
                  </div>
                </div>

                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Company Type</div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-2xl font-semibold text-amber-300">Manufacturer</div>
                    <Factory className="h-12 w-12 text-amber-300" />
                  </div>
                  <div className="mt-7 text-xs text-white/52">Employee Scale</div>
                  <div className="mt-1 text-2xl font-semibold">200-499</div>
                </div>

                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Key Signals</div>
                  <div className="mt-4 space-y-3">
                    {signals.map((signal) => (
                      <div className="flex items-center justify-between gap-3 text-xs" key={signal}>
                        <span className="flex items-center gap-2 text-white/68">
                          <Check className="h-3.5 w-3.5 text-teal-300" />
                          {signal}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-teal-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Overview</div>
                  <dl className="mt-4 space-y-2 text-xs">
                    {[
                      ["Established", "2016-08-12"],
                      ["Registered Capital", "CNY 5,000,000"],
                      ["Industry", "Consumer Electronics"],
                      ["Business Scope", "R&D, Production, Sales"]
                    ].map(([label, value]) => (
                      <div className="flex justify-between gap-5" key={label}>
                        <dt className="text-white/45">{label}</dt>
                        <dd className="text-right text-white/78">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Region Insight</div>
                  <div className="mt-4 text-sm font-medium">Shenzhen, Guangdong</div>
                  <div className="mt-3 space-y-2 text-xs text-white/62">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-teal-300" />
                      Electronics manufacturing hub
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-teal-300" />
                      Strong supply chain ecosystem
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-teal-300" />
                      High export activity
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-xs font-semibold text-white/70">Industry Insight</div>
                  <div className="mt-4 grid grid-cols-[1fr_120px] items-center gap-3">
                    <div className="space-y-2 text-xs text-white/62">
                      <div>High global demand</div>
                      <div>Competitive industry</div>
                      <div>Avg. lead time: 15-30 days</div>
                    </div>
                    <div className="relative h-28">
                      <div className="absolute inset-5 rounded-full border border-teal-300/20" />
                      <div className="absolute inset-8 rounded-full border border-teal-300/20" />
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 120 120">
                        <path
                          d="M60 12L99 48L84 96L39 99L17 52Z"
                          fill="#2dd4bf"
                          fillOpacity="0.25"
                          stroke="#2dd4bf"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1376px] gap-10 lg:grid-cols-[250px_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              From search to confident decisions
            </h2>
            <p className="mt-6 text-sm leading-6 text-neutral-600">
              Our AI analyzes multi-source data in minutes, turning complexity into
              clarity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <article className="relative border-l border-neutral-200 pl-6" key={item.title}>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-teal-600 text-xs font-semibold text-teal-700">
                      {item.step}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-800">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="map" className="grid bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[420px] flex-col justify-center bg-[#061219] px-5 py-16 text-white sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight">
              See the landscape. Source with advantage.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/65">
              Explore China&apos;s manufacturing hubs to discover capabilities by region,
              compare cluster strengths, and avoid sourcing blind spots.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-300"
              href="#map"
            >
              Explore Supply Map
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <ChinaMap />
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1376px]">
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight">
            Three core modules. One source of truth.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article
                  className="group flex min-h-[300px] flex-col justify-between rounded-md border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-teal-200"
                  id={
                    module.title === "Supplier Check"
                      ? "supplier-check"
                      : module.title === "Trade Translator"
                        ? "translator"
                        : undefined
                  }
                  key={module.title}
                >
                  <div>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-teal-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{module.title}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">
                      {module.text}
                    </p>
                    <a
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
                      href="#"
                    >
                      {module.action}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </a>
                  </div>
                  {module.title === "Supplier Check" && <MiniChart />}
                  {module.title === "Trade Translator" && (
                    <div className="grid gap-2 rounded-md bg-neutral-50 p-2 text-xs">
                      <div className="rounded bg-[#081118] p-3 text-white/78">
                        Chinese supplier message...
                      </div>
                      <div className="rounded border border-neutral-200 bg-white p-3 text-neutral-700">
                        English meaning, risk notes, and reply suggestion.
                      </div>
                    </div>
                  )}
                  {module.title === "Supply Map" && (
                    <div className="relative h-24 overflow-hidden rounded-md bg-[#061219]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_50%,rgba(45,212,191,0.35),transparent_18%),radial-gradient(circle_at_62%_34%,rgba(251,191,36,0.32),transparent_18%),radial-gradient(circle_at_78%_68%,rgba(45,212,191,0.28),transparent_16%)]" />
                      <Globe2 className="absolute bottom-4 right-4 h-10 w-10 text-teal-300/70" />
                      <MapPin className="absolute left-8 top-7 h-5 w-5 text-amber-300" />
                      <MapPin className="absolute left-1/2 top-9 h-5 w-5 text-teal-300" />
                      <MapPin className="absolute right-16 top-5 h-5 w-5 text-amber-300" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 px-5 py-9 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1376px] flex-col gap-5 text-sm text-neutral-500 lg:flex-row lg:items-center lg:justify-between">
          <span>Trusted by sourcing and procurement teams worldwide</span>
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-lg font-semibold tracking-wide text-neutral-400">
            <span>ANKER</span>
            <span>UGREEN</span>
            <span>Baseus</span>
            <span>Jackery</span>
            <span>ECOFLOW</span>
            <span>SHEIN</span>
            <span>ZTE</span>
          </div>
        </div>
      </section>
    </main>
  );
}
