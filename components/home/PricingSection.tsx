import { HugeiconsIcon } from "@hugeicons/react";
import { CreditCardIcon } from "@hugeicons/core-free-icons";
import { PricingContent } from "../../content/home";

// Section: Pricing plans grid with CTAs
export function PricingSection({ content }: { content: PricingContent }) {
  return (
    <section
      className="rounded-2xl border border-[#fb7232]/15 bg-white/80 px-6 py-10 shadow-sm sm:px-12 animate-section hover-lift"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,245,238,0.82) 0%, rgba(255,255,255,0.97) 60%), radial-gradient(circle at 18% 18%, rgba(251,114,50,0.14), transparent 36%), radial-gradient(circle at 82% 82%, rgba(199,88,41,0.12), transparent 34%)",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
      }}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Pricing</p>
          <h2 className="flex items-center gap-3 text-3xl font-bold text-[#341404] sm:text-4xl">
            <HugeiconsIcon icon={CreditCardIcon} size={28} color="#fb7232" strokeWidth={1.6} />
            {content.title}
          </h2>
          <p className="text-base text-[#6a3515]">{content.blurb}</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <a href={content.ctas.sales.href} className="rounded-lg bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md">
            {content.ctas.sales.label}
          </a>
          <a href={content.ctas.terms.href} className="rounded-lg border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            {content.ctas.terms.label}
          </a>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {content.plans.map((plan) => (
          <div key={plan.name} className="flex flex-col gap-4 rounded-xl border border-[#fb7232]/15 bg-white p-5 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c75829]">{plan.name}</p>
              <p className="text-2xl font-black text-[#341404]">{plan.price}</p>
              <p className="text-sm text-[#5a2a12]">{plan.desc}</p>
            </div>
            <ul className="space-y-2 text-sm text-[#5a2a12]">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#fb7232]" /> {feat}</li>
              ))}
            </ul>
            <a
              href={plan.cta.href}
              className="mt-auto inline-flex items-center justify-center rounded-lg border border-[#fb7232]/30 bg-[#ffe8da] px-3 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {plan.cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
