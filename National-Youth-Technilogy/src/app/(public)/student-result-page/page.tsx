/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search, GraduationCap, AlertTriangle } from "lucide-react";
import ResultView from "@/features/public_assets/student-result/ResultView";
import { getResultByRollAction } from "@/features/public_assets/student-result/actions.ts";
import Link from "next/link";

function StudentResultContent() {
  const searchParams = useSearchParams();
  const [roll, setRoll] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const rollFromUrl = searchParams.get("roll");
    if (rollFromUrl) {
      setRoll(rollFromUrl);
      handleSearchByRoll(rollFromUrl);
    }
  }, [searchParams]);

  const handleSearchByRoll = async (rollNumber: string) => {
    try {
      setLoading(true);
      setNotFound(false);
      setResult(null);
      const data = await getResultByRollAction(rollNumber);
      if (!data) {
        setNotFound(true);
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!roll.trim()) return;
    handleSearchByRoll(roll.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-teal-700 pt-16 pb-28 px-6 text-center">
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/5" />

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-black uppercase tracking-widest mb-4">
          <GraduationCap size={12} />
          ফলাফল যাচাই
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Student <span className="text-yellow-300">Result</span>
        </h1>
        <p className="text-emerald-100/80 text-sm md:text-base mt-3 font-medium">
          রোল নম্বর দিয়ে তোমার পরীক্ষার ফলাফল দেখো
        </p>
      </div>

      {/* ── Search Card (overlapping hero) ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-14 relative z-10">
        <div className="print:hidden bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-emerald-900/20 border border-gray-100 dark:border-gray-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2  rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-all bg-gray-50 dark:bg-gray-800">
            <div className="pl-4 text-gray-400 shrink-0">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="রোল নম্বর লিখুন..."
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 min-w-0 bg-transparent text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 py-4 outline-none font-semibold text-sm sm:text-base"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="m-1.5 px-3 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "রেজাল্ট দেখো"
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            সমস্যা হলে{" "}
            <Link
              href="#"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Admin এ যোগাযোগ করুন
            </Link>
          </p>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="mt-4 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl px-5 py-4 animate-in fade-in zoom-in-95 duration-200">
            <AlertTriangle size={20} className="text-red-500 shrink-0" />
            <p className="text-red-600 dark:text-red-400 font-bold text-sm">
              ❌ কোনো ফলাফল পাওয়া যায়নি। রোল নম্বরটি আবার চেক করুন।
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultView result={result} />
          </div>
        )}
      </div>

      <div className="h-16" />
    </div>
  );
}

export default function StudentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <Loader2
                className="animate-spin text-emerald-500 relative z-10"
                size={32}
              />
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              লোড হচ্ছে...
            </p>
          </div>
        </div>
      }
    >
      <StudentResultContent />
    </Suspense>
  );
}
