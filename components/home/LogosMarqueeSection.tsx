import { LogosContent } from "../../content/home";

// Section: Customer logo marquee for social proof
export function LogosMarqueeSection({ content }: { content: LogosContent }) {
  return (
    <section
      className="rounded-2xl border border-[#fb7232]/15 bg-white/70 px-6 py-8 shadow-sm sm:px-10 animate-section hover-lift"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(251,114,50,0.12) 0%, rgba(255,245,238,0.45) 55%, rgba(255,255,255,0.95) 100%), radial-gradient(circle at 85% 30%, rgba(199,88,41,0.14), transparent 42%)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "center, right 10% 30%",
        backgroundSize: "100% 100%, 260px 260px",
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">{content.title}</p>
          <h3 className="text-xl font-bold text-[#341404]">{content.subtitle}</h3>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-[#fb7232]/10 bg-transparent px-3 py-4">
          <div className="flex gap-4 animate-marquee">
            {content.logos
              .flatMap((logo) => [logo, logo]) // duplicate for seamless loop
              .map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex h-12 min-w-[120px] items-center justify-center rounded-lg border border-[#fb7232]/10 bg-white/90 px-4 text-sm font-semibold tracking-tight text-[#c75829] shadow-sm hover:-translate-y-1 transition"
                >
                  {logo}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
