"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImpactStat } from "./types";
import { impactData, newsData } from "./data";
import Link from "next/dist/client/link";

const AnimatedRing = ({ value, color, label, subtitle, icon }: ImpactStat) => {
  const [count, setCount] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 },
    );
    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const incrementTime = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <div
      ref={ringRef}
      className="flex flex-col items-center rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-2 bg-white dark:bg-gray-900 border border-transparent dark:border-gray-800"
      style={{
        boxShadow: `0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)`,
      }}
    >
      {/* Colored top accent bar */}
      <div
        className="w-full h-1.5 shrink-0"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
      />

      <div className="flex flex-col items-center px-6 pt-8 pb-7 w-full">
        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, border: `1.5px solid ${color}30` }}
        >
          {icon}
        </div>

        {/* Ring */}
        <div className="relative flex items-center justify-center mb-6">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-90"
            style={{ background: color }}
          />
          <svg
            className="w-36 h-36 -rotate-90 relative z-10"
            viewBox="0 0 128 128"
          >
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={`${color}18`}
              strokeWidth="9"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={color}
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={circumference}
              strokeLinecap="round"
              style={{
                strokeDashoffset: isVisible ? strokeDashoffset : circumference,
                transition: "stroke-dashoffset 0.08s linear",
                filter: `drop-shadow(0 0 6px ${color}70)`,
              }}
            />
          </svg>
          <div className="absolute flex flex-col items-center leading-none z-20">
            <span
              className="text-3xl font-black tracking-tight"
              style={{ color }}
            >
              {count}%
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-0.5">
              Complete
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-10 h-0.5 rounded-full mb-4"
          style={{ background: `${color}40` }}
        />

        {/* Label */}
        <h4 className="text-[12px] font-black uppercase tracking-[0.18em] text-gray-800 dark:text-gray-100 mb-2 text-center">
          {label}
        </h4>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default function CircularProgress() {
  return (
    <div className="bg-white shadow-sm dark:bg-black font-sans">
      {/* ── Recent News ── */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
              Recent{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                News
              </span>
            </h2>
          </div>
          <a
            href="#"
            className="group flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            View All News
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Highlight Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-8 flex flex-col justify-between rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-850 text-white min-h-[280px] group/feat">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover/feat:scale-125 transition-transform duration-500 pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-emerald-450/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-emerald-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 012 2v4a2 2 0 01-2 2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
                Announcements
              </span>
              <h3 className="text-2xl font-black text-white leading-tight mt-2">
                Stay updated with our latest news
              </h3>
            </div>

            <p className="text-emerald-100/60 text-xs mt-4 mb-6 leading-relaxed relative z-10">
              Get official news, event information, and notice summaries
              directly from the institute board.
            </p>
          </div>

          {newsData.map((news) => (
            <div
              key={news.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/50 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 min-w-[56px] h-14 flex flex-col items-center justify-center rounded-xl shrink-0">
                  <span className="text-xl font-black tracking-tight leading-none mb-0.5">
                    {news.date}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-wider leading-none">
                    {news.monthYear.split(" ")[0]}
                  </span>
                </div>

                <h4 className="font-extrabold text-gray-850 dark:text-gray-100 text-sm leading-snug line-clamp-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {news.title}
                </h4>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-3">
                {news.description}
              </p>

              <button className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-wider mt-auto text-left group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-200">
                <span>Read More</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Start Project ── */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 border-y border-gray-200/60 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Launch Your Journey
              </span>

              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase leading-tight tracking-tight">
                Start Your <br />
                <span className="text-emerald-600 dark:text-emerald-400">
                  New Project
                </span>
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-lg">
                ভবিষ্যতের দক্ষ আইটি পেশাদার হিসেবে নিজেকে তৈরি করতে অথবা আপনার
                প্রতিষ্ঠানের জন্য কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "২৪ ঘণ্টার মধ্যে নিশ্চিত ফিডব্যাক",
                  "অভিজ্ঞ পরামর্শকদের মাধ্যমে ফ্রী ক্যারিয়ার কাউন্সেলিং",
                  "ব্রাঞ্চ ও কোর্স রেজিস্ট্রেশনের সকল গাইডলাইন",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200/70 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-white/5 pb-4">
                  Request Consultation
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      label: "Name",
                      type: "text",
                      placeholder: "Enter your name",
                    },
                    {
                      label: "Email Address",
                      type: "email",
                      placeholder: "Enter your email",
                    },
                    {
                      label: "Phone Number",
                      type: "tel",
                      placeholder: "Enter your phone number",
                    },
                  ].map((field) => (
                    <div key={field.label} className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full bg-gray-50 dark:bg-black/30 hover:bg-gray-100/60 focus:bg-white dark:focus:bg-gray-800 border border-gray-200 dark:border-white/10 focus:border-emerald-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-emerald-500/50"
                      />
                    </div>
                  ))}
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 cursor-pointer mt-2">
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Rings ── */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
        <div className="absolute -left-32 top-0 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 w-96 h-96 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #00bcd4 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-[#059669] dark:border-green-800 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#059669] dark:text-green-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
            Our Performance
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">
            Our Global <span className="text-[#059669]">Impact</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto mb-16 leading-relaxed">
            বাংলাদেশের সেরা প্রযুক্তি প্রশিক্ষণ কেন্দ্র হিসেবে আমাদের অর্জনের
            একটি সংক্ষিপ্ত চিত্র।
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {impactData.map((stat, idx) => (
              <AnimatedRing key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply Now ── */}
      <section className="relative overflow-hidden py-0">
        <div
          className="relative mx-6 lg:mx-12 xl:mx-20 rounded-3xl overflow-hidden my-12"
          style={{
            background:
              "linear-gradient(135deg, #0097a7 0%, #00bcd4 40%, #4caf50 100%)",
          }}
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/8 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-4 right-40 w-3 h-3 bg-white/30 rounded-full" />
          <div className="absolute bottom-6 right-60 w-2 h-2 bg-white/40 rounded-full" />
          <div className="absolute top-8 left-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />

          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-14">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Registration Now Open
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                  আপনার ক্যারিয়ার <br className="hidden md:block" />
                  <span className="text-white/80">শুরু করুন আজই</span>
                </h3>

                <p className="text-white/70 text-sm leading-relaxed max-w-md mb-8 lg:mb-0">
                  বাংলাদেশ ন্যাশনাল ইয়ুথ টেকনিক্যাল ইনস্টিটিউটে ভর্তি হন এবং
                  আপনার স্বপ্নের ক্যারিয়ার গড়ে তুলুন।
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-6 shrink-0">
                <div className="flex items-center gap-6">
                  {[
                    { value: "৫০০০+", label: "শিক্ষার্থী" },
                    { value: "৩০+", label: "কোর্স" },
                    { value: "৯৫%", label: "সফলতার হার" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-black text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-white/20" />

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/register"
                    className="group flex items-center gap-2.5 bg-white text-cyan-700 hover:bg-white/90 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-black/20 hover:-translate-y-0.5 hover:shadow-black/30"
                  >
                    এখনই ভর্তি হন
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 border border-white/25 hover:border-white/40"
                  >
                    যোগাযোগ করুন
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
