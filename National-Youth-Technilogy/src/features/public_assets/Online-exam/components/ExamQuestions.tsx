/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, Award, Clock } from "lucide-react";
import { getExamQuestionsAction, submitExamAction } from "../exam.actions";
import { ExamAnswer, ExamQuestion } from "../types";

interface Props {
  studentId: string;
  onSubmit: (result: any) => void;
}

const ExamQuestions = ({ studentId, onSubmit }: Props) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const res = await getExamQuestionsAction(studentId);
      if (res.success) {
        setQuestions(res.data || []);
      } else {
        setError(res.message || "❌ প্রশ্ন লোড করা সম্ভব হয়নি!");
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [studentId]);

  const handleSelect = (questionId: string, selectedOptionId: string) => {
    setError("");
    setAnswers((prev) => {
      const exists = prev.find((a) => a.questionId === questionId);
      if (exists) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedOptionId } : a
        );
      }
      return [...prev, { questionId, selectedOptionId }];
    });
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      setError("⚠️ দয়া করে সবকটি প্রশ্নের উত্তর দাও!");
      return;
    }
    setSubmitting(true);
    const res = await submitExamAction(studentId, answers);
    setSubmitting(false);
    if (res.success) {
      onSubmit(res.data);
    } else {
      setError(res.message || "❌ সাবমিট ব্যর্থ হয়েছে! আবার চেষ্টা করো।");
    }
  };

  const completionPercentage =
    questions.length > 0 ? (answers.length / questions.length) * 100 : 0;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <Loader2 className="animate-spin text-emerald-500 relative z-10" size={36} />
        </div>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
          প্রশ্নপত্র লোড হচ্ছে...
        </p>
      </div>
    );

  if (error && questions.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 max-w-md mx-auto text-center">
        <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50">
          <AlertCircle size={40} />
        </div>
        <p className="text-red-600 dark:text-red-400 font-bold text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Sticky Progress Header ── */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-gray-800 p-5 md:p-6 shadow-lg shadow-gray-200/50 dark:shadow-gray-950/50 transition-all">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute -top-4 -right-4 w-24 h-24 rounded-full bg-emerald-500/5" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl">📝</span>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Exam শুরু করো
                </h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5">
                <Award size={14} className="text-emerald-500" />
                মোট{" "}
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {questions.length}টি
                </span>{" "}
                প্রশ্ন
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 text-sm font-black">
                {answers.length}/{questions.length}
              </span>
              <span className="text-emerald-600/70 dark:text-emerald-500 text-xs font-medium">উত্তর দেওয়া</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-right text-[10px] font-bold text-gray-400 mt-1">
              {Math.round(completionPercentage)}% সম্পন্ন
            </p>
          </div>
        </div>

        {/* ── Questions ── */}
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {questions.map((q, i) => {
            const answered = answers.some((a) => a.questionId === q.id);
            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-gray-900 border rounded-3xl p-5 md:p-7 shadow-sm transition-all duration-300 ${
                  answered
                    ? "border-emerald-200 dark:border-emerald-800 shadow-emerald-500/10"
                    : "border-gray-100 dark:border-gray-800 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base md:text-lg leading-relaxed flex-1">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-black mr-2 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {q.questionText}
                  </h3>
                  <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 px-3 py-1 rounded-full text-xs font-black whitespace-nowrap shadow-sm">
                    🎯 {q.mark} নম্বর
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = answers.some(
                      (a) => a.questionId === q.id && a.selectedOptionId === opt.id
                    );
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(q.id, opt.id)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm border transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold ring-2 ring-emerald-500/15"
                            : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 hover:border-emerald-300 dark:hover:border-emerald-700"
                        }`}
                      >
                        <span className="flex-1 pr-4">{opt.text}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && <CheckCircle2 size={11} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 px-4 py-4 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in duration-200">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none text-white font-black text-base uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2.5"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Submit হচ্ছে...</span>
            </>
          ) : (
            <span>🚀 Exam Submit করো</span>
          )}
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
};

export default ExamQuestions;
