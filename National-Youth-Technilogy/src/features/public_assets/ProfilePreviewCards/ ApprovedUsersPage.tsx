/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { getApprovedUsersAction } from "./approved-users.actions";
import { Building2, MapPin, BookOpen, Eye, X, Search, Loader2, GraduationCap, Users, Award } from "lucide-react";
import { IApprovedUser } from "./approved-users.types";

export default function ApprovedUsersPage() {
  const [users, setUsers] = useState<IApprovedUser[]>([]);
  const [filtered, setFiltered] = useState<IApprovedUser[]>([]);
  const [selected, setSelected] = useState<IApprovedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getApprovedUsersAction().then((res: any) => {
      setUsers(res?.data ?? []);
      setFiltered(res?.data ?? []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          (u.instituteName ?? "").toLowerCase().includes(q) ||
          (u.district ?? "").toLowerCase().includes(q) ||
          (u.courseName ?? "").toLowerCase().includes(q)
      )
    );
  }, [query, users]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-700 to-teal-700 py-16 px-6 text-center">
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs font-black uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
          অনুমোদিত শাখাসমূহ
        </span>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          All <span className="text-yellow-300">Branches</span>
        </h1>
        <p className="text-emerald-100/80 text-sm md:text-base mt-3 max-w-xl mx-auto font-medium">
          আমাদের সকল অনুমোদিত শাখা ও ইন্সটিটিউটের তালিকা
        </p>

        {/* stats */}
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {[
            { icon: <Building2 size={16} />, label: "শাখা", value: users.length },
            { icon: <Users size={16} />, label: "জেলা", value: [...new Set(users.map(u => u.district))].filter(Boolean).length },
            { icon: <GraduationCap size={16} />, label: "কোর্স", value: [...new Set(users.map(u => u.courseName))].filter(Boolean).length },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 text-white">
              {icon}
              <span className="font-black text-base">{value}</span>
              <span className="text-white/70 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ইন্সটিটিউট, জেলা বা কোর্স খুঁজুন..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-400 text-sm font-medium shadow-xl outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <Loader2 className="animate-spin text-emerald-500 relative z-10" size={32} />
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">লোড হচ্ছে...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4 ring-1 ring-emerald-200 dark:ring-emerald-800">
              <Building2 size={28} className="text-emerald-300 dark:text-emerald-700" />
            </div>
            <p className="font-bold text-gray-500 dark:text-gray-400">কোনো ইন্সটিটিউট পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-400 hover:-translate-y-1"
              >
                {/* top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" />

                {/* Institute Photo */}
                <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 overflow-hidden">
                  {user.institutePhoto ? (
                    <img
                      src={user.institutePhoto}
                      alt={user.instituteName ?? ""}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building2 size={48} className="text-emerald-200 dark:text-emerald-800" />
                    </div>
                  )}
                  {/* branch badge */}
                  {user.branchId && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {user.branchId}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-black text-gray-900 dark:text-white text-base leading-snug line-clamp-2">
                      {user.instituteName ?? "—"}
                    </h2>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 shrink-0 shadow-sm">
                      <img
                        src={user.directorPhoto ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name ?? ""}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin size={12} className="text-emerald-500 shrink-0" />
                      <span>{user.district ?? "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <BookOpen size={12} className="text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{user.courseName ?? "—"}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelected(user)}
                    className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-bold transition-all hover:shadow-sm"
                  >
                    <Eye size={15} /> বিস্তারিত দেখুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white">
              <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
                  <img
                    src={selected.directorPhoto ?? `https://api.dicebear.com/7.x/initials/svg?seed=${selected.name}`}
                    alt={selected.name ?? ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-black text-lg leading-tight">{selected.instituteName}</h2>
                  <p className="text-emerald-200 text-xs font-medium mt-0.5">{selected.branchId}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-2 gap-3">
              {[
                ["Branch ID", selected.branchId],
                ["Director", selected.directorName],
                ["Institute Age", selected.instituteAge],
                ["Course", selected.courseName],
                ["Duration", selected.duration],
                ["Session", `${selected.startMonth}/${selected.startYear} — ${selected.endMonth}/${selected.endYear}`],
                ["Education", selected.educationQualification],
                ["Gender", selected.gender],
                ["Nationality", selected.nationality],
                ["Religion", selected.religion],
                ["District", selected.district],
                ["Thana", selected.thanaUpazila],
                ["Village", selected.village],
                ["Post Office", selected.postOffice],
                ["Full Address", selected.fullAddress],
                ["Father", selected.fatherName],
                ["Mother", selected.motherName],
              ].map(([label, value]) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{label}</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-words">{value ?? "—"}</div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setSelected(null)}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-lg shadow-emerald-600/30"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}