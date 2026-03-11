// Server Component: keep layout/content server-rendered; sections are data-driven.
import { getHomeContent } from "../content/home";
import { HeroSection } from "../components/home/HeroSection";
import { LogosMarqueeSection } from "../components/home/LogosMarqueeSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { MetricsSection } from "../components/home/MetricsSection";
import { PricingSection } from "../components/home/PricingSection";
import { SecuritySection } from "../components/home/SecuritySection";
import { DocsSupportSection } from "../components/home/DocsSupportSection";
import { LegalSection } from "../components/home/LegalSection";
import { CtaSection } from "../components/home/CtaSection";

export default function Home() {
  const content = getHomeContent();

  // Simple toggles so agents/users can hide sections without touching JSX.
  // Use ONLY_SECTIONS (comma list) to whitelist, or HIDE_SECTIONS to blacklist.
  const only = (process.env.ONLY_SECTIONS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const envHide = (process.env.HIDE_SECTIONS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const defaultHide = ["features", "metrics", "pricing", "security", "docs", "legal"];
  const whitelist = only.length ? new Set(only) : null;
  const hide = new Set(whitelist ? envHide : [...defaultHide, ...envHide]);
  const sections = [
    ["hero", <HeroSection key="hero" content={content.hero} />],
    ["logos", <LogosMarqueeSection key="logos" content={content.logos} />],
    ["features", <FeaturesSection key="features" content={content.features} />],
    ["metrics", <MetricsSection key="metrics" content={content.metrics} />],
    ["pricing", <PricingSection key="pricing" content={content.pricing} />],
    ["security", <SecuritySection key="security" content={content.security} />],
    ["docs", <DocsSupportSection key="docs" content={content.docs} />],
    ["legal", <LegalSection key="legal" content={content.legal} />],
    ["cta", <CtaSection key="cta" content={content.cta} />],
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header: Panda wordmark and primary actions (docs/deploy); wraps on small screens */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">Panda</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Lightweight SaaS starter ready to ship.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="https://nextjs.org/docs"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Docs
            </a>
            <a
              href="https://vercel.com/new"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Deploy
            </a>
          </div>
        </header>

        {sections
          .filter(([id]) => (whitelist ? whitelist.has(id) : true))
          .filter(([id]) => !hide.has(id))
          .map(([, node]) => node)}
      </main>

      {/* lightweight animations defined locally to avoid tailwind config changes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-section {
          animation: fade-slide 0.7s ease both;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 14s ease-in-out infinite;
        }
        .animate-fade-slide {
          animation: fade-slide 0.6s ease both;
        }
        .animate-marquee {
          width: max-content;
          animation: marquee 24s linear infinite;
        }
        .hover-lift {
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -24px rgba(251, 114, 50, 0.45);
        }
      `}</style>
    </div>
  );
}
