"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import rawAnimationData from "@/animations/about-us.json";
import Link from "next/link";
import { PhoneCall, Sparkles } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false, loading: () => null });

export default function LoadingScreen() {
  const animationData = useMemo(() => {
    return JSON.parse(JSON.stringify(rawAnimationData));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50/70 via-emerald-50/30 to-white dark:from-[#03140e] dark:via-[#070c0a] dark:to-[#070707] transition-colors duration-500 flex items-center justify-center border-b border-gray-150 dark:border-white/5 py-12 md:py-20 lg:py-28">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        .hero-badge    { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .hero-title    { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .hero-desc     { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.30s both; }
        .hero-btns     { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.42s both; }
        .hero-lottie   { animation: fadeRight 0.9s cubic-bezier(.22,1,.36,1) 0.25s both; }
        .hero-float    { animation: floatY 7s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #059669 0%, #34d399 40%, #059669 60%, #34d399 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      {/* ── Background blobs ── */}
      <div
        className="absolute -top-40 -left-20 w-120 h-120 rounded-full pointer-events-none dark:block hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "glowPulse 5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -top-40 -left-20 w-120 h-120 rounded-full pointer-events-none block dark:hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,105,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "glowPulse 5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-40 -right-20 w-120 h-120 rounded-full pointer-events-none dark:block hidden"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "glowPulse 5s ease-in-out infinite 2.5s",
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* ── Spinning decorative ring ── */}
      <div
        className="absolute top-12 right-20 w-32 h-32 pointer-events-none hidden lg:block opacity-20 dark:opacity-30"
        style={{ animation: "spinRing 25s linear infinite" }}
      >
        <svg viewBox="0 0 112 112" fill="none">
          <circle
            cx="56"
            cy="56"
            r="52"
            stroke="#059669"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle cx="56" cy="4" r="3.5" fill="#34d399" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* ── Left: Text (7 Cols on large screen) ── */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 max-w-3xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide border border-green-200/50 dark:border-green-800/30 bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-emerald-400 backdrop-blur-md shadow-sm">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500"
                style={{ animation: "pulseDot 2s ease-in-out infinite" }}
              />
              <span className="uppercase tracking-[0.12em] font-sans">
                BANGLADESH NATIONAL YOUTH TECHNICAL INSTITUTE
              </span>
            </div>

            {/* Headline */}
            <div className="hero-title space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.15] tracking-tight">
                Empowering Youth <br />
                <span className="shimmer-text">With Technical Skills</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-emerald-400 mt-2 font-sans tracking-wide">
                কারিগরি দক্ষতায় গড়বো সমৃদ্ধ স্মার্ট বাংলাদেশ
              </h2>
              {/* Accent line */}
              <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
                <div
                  className="h-[3px] w-16 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #059669, transparent)",
                  }}
                />
                <div className="h-[3px] w-8 rounded-full bg-green-600/30 dark:bg-green-500/20" />
              </div>
            </div>

            {/* Description */}
            <p className="hero-desc text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Bangladesh National Youth Technical Institute is dedicated to providing high-quality, industry-aligned technical and vocational training. We empower students with hands-on skills, mentorship, and credentials needed to excel in national and international career markets.
            </p>

            {/* Buttons */}
            <div className="hero-btns flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/courses"
                className="btn-glow w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-black text-xs uppercase tracking-widest hover:from-green-500 hover:to-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-green-600/20 hover:shadow-green-600/35 cursor-pointer"
              >
                <Sparkles size={14} />
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-white font-black text-xs uppercase tracking-widest hover:bg-gray-55 dark:hover:bg-white/10 hover:border-green-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <PhoneCall size={14} className="text-green-600 dark:text-emerald-400" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* ── Right: Lottie (5 Cols on large screen) ── */}
          <div className="lg:col-span-5 hero-lottie flex justify-center items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-none hero-float">
              {/* Soft glow behind animation */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none -z-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 75%)",
                  filter: "blur(30px)",
                  transform: "scale(0.9)",
                }}
              />
              <div className="border border-green-500/10 dark:border-green-500/5 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-[3rem] p-4 sm:p-6 shadow-xl shadow-green-950/5 dark:shadow-none">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

