/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2, Mail, Phone, ShieldAlert, LogIn, BookOpen } from "lucide-react";
import { studentLoginAction } from "../exam.actions";

interface Props {
  onLogin: (studentData: any) => void;
}

const StudentLoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !guardianPhone) {
      setError("⚠️ Email এবং Phone নম্বর সঠিকভাবে দাও!");
      return;
    }
    setLoading(true);
    setError("");
    const res = await studentLoginAction(email, guardianPhone);
    setLoading(false);
    if (res.success) {
      onLogin(res.data);
    } else {
      setError(res.message || "❌ প্রবেশ ব্যর্থ হয়েছে! আবার চেষ্টা করো।");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-teal-700 pt-16 pb-32 text-center px-4">
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-black uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
          অনলাইন পরীক্ষা
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Online <span className="text-yellow-300">Exam</span>
        </h1>
        <p className="text-emerald-100/80 text-sm mt-3 font-medium">
          তোমার Email ও Phone নম্বর দিয়ে পরীক্ষায় প্রবেশ করো
        </p>
      </div>

      {/* ── Login Card (overlapping hero) ── */}
      <div className="max-w-md mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-emerald-900/20 border border-gray-100 dark:border-gray-800 p-7 md:p-9 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 ring-2 ring-emerald-200 dark:ring-emerald-800 flex items-center justify-center shadow-sm">
              <BookOpen size={30} className="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <Mail size={12} /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <Phone size={12} /> Phone Number
              </label>
              <input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 px-4 py-3 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold animate-in fade-in duration-200">
                <ShieldAlert size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>যাচাই হচ্ছে...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Exam এ প্রবেশ করো</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginForm;
