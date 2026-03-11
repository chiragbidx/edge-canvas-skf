import { HugeiconsIcon } from "@hugeicons/react";
import { Shield01Icon } from "@hugeicons/core-free-icons";
import { SecurityContent } from "../../content/home";

// Section: Security, compliance posture, and CTA
export function SecuritySection({ content }: { content: SecurityContent }) {
  return (
    <section
      className="grid gap-6 rounded-2xl border border-[#fb7232]/15 bg-white/80 px-6 py-10 shadow-sm sm:grid-cols-[1fr_1fr] sm:px-12 animate-section hover-lift"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(251,114,50,0.14) 0%, rgba(255,232,218,0.5) 60%, rgba(255,255,255,0.96) 100%), radial-gradient(circle at 90% 10%, rgba(251,114,50,0.16), transparent 40%)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "center, right -20px top 10px",
        backgroundSize: "100% 100%, 200px 200px",
      }}
    >
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Security</p>
        <h2 className="flex items-center gap-3 text-3xl font-bold text-[#341404] sm:text-4xl">
          <HugeiconsIcon icon={Shield01Icon} size={28} color="#fb7232" strokeWidth={1.6} />
          {content.title}
        </h2>
        <p className="text-base text-[#6a3515]">{content.blurb}</p>
        <ul className="space-y-2 text-sm text-[#5a2a12]">
          {content.checklist.map((item) => (
            <li key={item} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#fb7232]" /> {item}</li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4 rounded-xl border border-[#fb7232]/15 bg-gradient-to-br from-white via-[#fff5ee] to-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#5a2a12]">Compliance posture</span>
          <span className="rounded-full bg-[#ffe8da] px-3 py-1 text-xs font-semibold text-[#c75829]">In progress</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-[#5a2a12] sm:grid-cols-3">
          {content.badges.map((badge) => (
            <div key={badge} className="rounded-lg border border-[#fb7232]/10 bg-white/80 px-3 py-2 text-center shadow-sm">
              {badge}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6a3515]">Need something specific? Share your latest security questionnaire and we will map controls.</p>
        <a
          href={content.cta.href}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
        >
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
