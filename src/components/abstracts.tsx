"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Section, Wrapper } from "@/components/ui/sections";
import { FileText, Download, ArrowRight } from "lucide-react";
import RegisterModal from "./abstracts_reg_modal";
import { CATEGORIES } from "@/constant/abstracts";
import Link from "next/link";

function CategoryCard({ cat, index, isInView }: {
  cat: (typeof CATEGORIES)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = cat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl border border-zinc-200 p-6 hover:border-fun-blue-200 hover:shadow-lg hover:shadow-fun-blue-50 transition-all duration-300 flex flex-col gap-5"
    >
      {/* Top accent line on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${cat.accent}, transparent)`,
        }}
      />

      {/* Icon + code badge */}
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
          <Icon size={20} className={cat.iconColor} />
        </div>
        {/* <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cat.color}`}>
          {cat.code}
        </span> */}
      </div>

      {/* Title + description */}
      <div className="flex-1">
        {/* <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
          {cat.longLabel}
        </p> */}
        <h3 className="font-bold text-fun-blue-950 text-lg mb-2">
          {cat.label} Abstracts
        </h3>
        <p className="text-zinc-500 text-[13px] leading-relaxed">
          {cat.description}
        </p>
      </div>

    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
export default function AbstractsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [modalOpen, setModalOpen] = useState(false);
  const totalAbstracts = CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <>
      <Section className="bg-[#F7F6F2]">
        <Wrapper>
          <div ref={ref} className="w-full flex flex-col gap-12">

            {/* ── Header ────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-fun-blue-400" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-fun-blue-500">
                    Abstracts
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl text-fun-blue-950 leading-tight">
                  Present Abstracts at <br />
                  <em className="not-italic text-fun-blue-400">NZUSICON</em>
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mt-3 max-w-lg">
                  NZUSICON invites Urologists to present their Abstracts in any of the following formats
                </p>
              </motion.div>

              {/* CTA only */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 bg-fun-blue-950 text-white rounded-2xl font-semibold text-sm hover:bg-fun-blue-800 transition-colors duration-200 whitespace-nowrap"
                >
                  Submit Abstract
                  <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                    <ArrowRight size={11} />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* ── Category cards ─────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* ── NZUSICON 2026 submission strip ─────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl bg-fun-blue-950 px-7 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="flex flex-col gap-1">
                <p className="text-white font-semibold text-sm">
                  Submitting for NZUSICON 2026?
                </p>
                <p className="text-fun-blue-400 text-xs leading-relaxed max-w-md">
                  Abstract submissions for NZUSICON 2026, Amritsar (Nov 27–29)
                  are now open. All formats welcome — video, podium, poster, and
                  e-poster.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/abstracts-2026/guidelines"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-fun-blue-700 text-fun-blue-300 rounded-xl font-semibold text-xs hover:border-fun-blue-500 transition-colors"
                >
                  <FileText size={12} />
                  Guidelines
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-fun-blue-100 text-fun-blue-900 rounded-xl font-semibold text-xs hover:bg-white transition-colors"
                >
                  Submit Now <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>

            {/* ── NZUSICON 2025 stats row ────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-2xl md:text-4xl text-fun-blue-950 leading-tight">
                  Abstracts received in {" "}
                  <em className="not-italic text-fun-blue-400">NZUSICON 2025</em>
                </h2>
                <p className="text-zinc-500 text-sm leading-tight mt-3 max-w-lg mb-10">
                  Browse all {totalAbstracts} peer-reviewed abstracts presented
                  at NZUSICON 2025 across four presentation formats — from best
                  video sessions to e-poster exhibitions.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
                      className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-zinc-200"
                    >
                      <div className={`w-9 h-9 rounded-xl ${cat.iconBg} flex items-center justify-center`}>
                        <Icon size={16} className={cat.iconColor} />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-fun-blue-950 tabular-nums leading-none">
                          {cat.count}
                        </p>
                        <p className="text-[12px] font-semibold text-fun-blue-700 mt-1">
                          {cat.label}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {cat.longLabel}
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-max ${cat.color}`}>
                        {cat.code}
                      </span>

                      {/* Topic pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cat.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Download button */}
                      <Link
                        href={cat.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-5 flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${cat.color} hover:opacity-80`}
                      >
                        <span>Download Abstract Book</span>
                        <Download size={13} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </Wrapper>
      </Section>

      <AnimatePresence>
        {modalOpen && <RegisterModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}