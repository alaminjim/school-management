/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  CheckCircle2,
  Download,
  Award,
  User,
  Mail,
  Hash,
  ShieldAlert,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { ExamResult as ExamResultType } from "../types";

interface Props {
  result: ExamResultType;
  student: any;
}

const ExamResult = ({ result, student }: Props) => {
  const handleDownload = () => {
    const percentage = parseFloat(result.percentage);
    const grade =
      percentage >= 80
        ? "A+"
        : percentage >= 70
        ? "A"
        : percentage >= 60
        ? "B"
        : percentage >= 50
        ? "C"
        : "F";

    const content = `
====================================
        EXAM RESULT CARD 🎯
====================================
Name       : ${student.name}
Student ID : ${student.studentId}
Roll       : ${student.roll}
Email      : ${student.email}
------------------------------------
Score      : ${result.score}/${result.totalMarks}
Percentage : ${result.percentage}%
Grade      : ${grade}
------------------------------------
Generated on: ${new Date().toLocaleDateString()}
====================================
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam-result-${student.roll}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const percentage = parseFloat(result.percentage);

  const getColorScheme = () => {
    if (percentage >= 80)
      return {
        text: "text-emerald-600 dark:text-emerald-400",
        gradientBar: "from-emerald-500 to-teal-500",
        gradientHero: "from-emerald-600 via-green-700 to-teal-700",
        ring: "ring-emerald-200 dark:ring-emerald-800",
        badge: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
        emoji: "🎉",
        label: "অসাধারণ!",
      };
    if (percentage >= 50)
      return {
        text: "text-amber-600 dark:text-amber-400",
        gradientBar: "from-amber-500 to-orange-500",
        gradientHero: "from-amber-500 via-orange-600 to-rose-600",
        ring: "ring-amber-200 dark:ring-amber-800",
        badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        iconBg: "bg-amber-50 dark:bg-amber-900/30",
        emoji: "👍",
        label: "ভালো করেছ!",
      };
    return {
      text: "text-red-600 dark:text-red-400",
      gradientBar: "from-red-500 to-rose-500",
      gradientHero: "from-red-600 via-rose-600 to-pink-700",
      ring: "ring-red-200 dark:ring-red-800",
      badge: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
      iconBg: "bg-red-50 dark:bg-red-900/30",
      emoji: "📚",
      label: "আরো পড়াশোনা করো",
    };
  };

  const colors = getColorScheme();
  const grade =
    percentage >= 80
      ? "A+"
      : percentage >= 70
      ? "A"
      : percentage >= 60
      ? "B"
      : percentage >= 50
      ? "C"
      : "F";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">

      {/* ── Hero ── */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${colors.gradientHero} pt-14 pb-28 text-center px-4`}>
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${colors.iconBg} ring-2 ${colors.ring} shadow-xl mb-4 animate-bounce`}>
            <CheckCircle2 size={40} className={colors.text} strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Exam শেষ! {colors.emoji}
          </h1>

          <div className="flex items-center justify-center gap-2 mt-2 text-white/80 font-medium text-sm">
            <User size={15} />
            <span>{student.name}</span>
          </div>

          <p className="mt-1 text-white/60 text-xs font-semibold uppercase tracking-widest">
            {colors.label}
          </p>
        </div>
      </div>

      {/* ── Result Card (overlapping hero) ── */}
      <div className="max-w-md mx-auto px-4 -mt-16 relative z-10 pb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Score card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-gray-900/10 border border-gray-100 dark:border-gray-800 p-6 md:p-8">

          {/* Score + percentage */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <Award size={14} /> Score
              </span>
              <span className="text-3xl font-black text-gray-900 dark:text-white">
                {result.score}
                <span className="text-gray-400 dark:text-gray-500 text-xl font-semibold">
                  /{result.totalMarks}
                </span>
              </span>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Percentage
                </span>
                <span className={`text-xs font-black ${colors.text}`}>
                  {result.percentage}%
                </span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradientBar}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Grade */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <span className="flex items-center gap-1.5 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <Trophy size={14} /> Grade
              </span>
              <span className={`px-5 py-1.5 rounded-full text-sm font-black border ${colors.badge} shadow-sm`}>
                {grade}
              </span>
            </div>
          </div>
        </div>

        {/* Student details */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-1.5">
            📌 Student Details
          </p>

          <div className="space-y-3">
            {[
              { icon: <Hash size={12} />, label: "Student ID", value: student.studentId, mono: true },
              { icon: <Hash size={12} />, label: "Roll", value: student.roll, mono: true },
              { icon: <Mail size={12} />, label: "Email", value: student.email, mono: false },
            ].map(({ icon, label, value, mono }) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 shrink-0">
                  {icon} {label}
                </span>
                <span className={`text-xs font-bold text-gray-700 dark:text-gray-300 truncate max-w-[55%] text-right ${mono ? "font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700" : ""}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Retry status */}
        <div className="flex justify-center">
          {result.canRetry ? (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-2xl text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse">
              <RefreshCw size={13} className="animate-spin" style={{ animationDuration: "3s" }} />
              <span>Admin আবার exam দেওয়ার সুযোগ দিয়েছে!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-2xl text-gray-500 dark:text-gray-400 text-xs font-medium">
              <ShieldAlert size={13} />
              <span>Exam একবারই দেওয়া যাবে</span>
            </div>
          )}
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Result Download করো
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
