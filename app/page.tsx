"use client";

import { useState } from "react";
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

  const only = (process.env.NEXT_PUBLIC_ONLY_SECTIONS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const envHide = (process.env.NEXT_PUBLIC_HIDE_SECTIONS ?? "")
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

  const [formData, setFormData] = useState({ email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setFormStatus("error");
      return;
    }
    if (!formData.message) {
      setErrorMessage("Please enter a message.");
      setFormStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? `Error ${res.status}`);
      }
      setFormStatus("success");
      setFormData({ email: "", message: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred submitting the form.");
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">MailSprout</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Empowering small businesses with effortless email marketing.
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

        <section className="rounded-2xl border border-[#fb7232]/15 bg-white px-6 py-10 shadow-sm max-w-lg mx-auto w-full animate-section hover-lift">
          <h2 className="mb-6 text-3xl font-bold text-[#3f1b08]">Request a Demo</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="email" className="font-semibold text-[#3f1b08]">
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#fb7232] focus:ring-1 focus:ring-[#fb7232]"
                required
                autoComplete="email"
              />
            </label>

            <label htmlFor="message" className="font-semibold text-[#3f1b08]">
              Message
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-[#fb7232] focus:ring-1 focus:ring-[#fb7232]"
                required
              />
            </label>

            {formStatus === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
            {formStatus === "success" && <p className="text-sm text-green-600">Thank you for your message! We'll get back to you soon.</p>}

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="mt-4 rounded bg-[#fb7232] px-6 py-3 text-white transition hover:bg-[#e06225] disabled:bg-[#fbb59a]"
            >
              {formStatus === "loading" ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      </main>

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