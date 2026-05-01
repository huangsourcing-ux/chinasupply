import { Building2, Languages, Map, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Building2,
    title: "Supplier Check",
    text: "Identify whether a Chinese company looks like a factory, trading company, or manufacturer-trader."
  },
  {
    icon: Languages,
    title: "Trade Translator",
    text: "Translate supplier chats with manufacturing context, real meaning, risks, and suggested replies."
  },
  {
    icon: Map,
    title: "Supply Map",
    text: "Explore China’s major sourcing regions, industry clusters, and product advantages."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-neutral-950">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6">
        <header className="flex items-center justify-between border-b border-neutral-300/80 pb-5">
          <div className="text-xl font-semibold tracking-tight">ChinaSupply.ai</div>
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
            <a href="#supplier-check">Supplier Check</a>
            <a href="#translator">Translator</a>
            <a href="#map">Supply Map</a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal-700">
              AI sourcing intelligence
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              China supplier intelligence, powered by AI.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-650">
              Check Chinese companies, understand supplier messages, and discover
              where products are made across China.
            </p>

            <form className="mt-10 flex max-w-2xl flex-col gap-3 rounded-md border border-neutral-300 bg-white p-2 shadow-sm md:flex-row">
              <label className="sr-only" htmlFor="supplier-search">
                Search supplier
              </label>
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search className="h-5 w-5 text-neutral-500" />
                <input
                  id="supplier-search"
                  className="h-12 w-full border-0 bg-transparent text-base outline-none placeholder:text-neutral-400"
                  placeholder="Enter Chinese company name, credit code, or website"
                />
              </div>
              <Button type="button">Check Supplier</Button>
            </form>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  className="rounded-lg border border-neutral-300 bg-white p-5 shadow-sm"
                  key={feature.title}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-teal-700 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight">{feature.title}</h2>
                  <p className="mt-3 leading-7 text-neutral-600">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
