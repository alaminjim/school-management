"use client";

import { TaskData } from "@/features/AdminDashboard/UniversalAlertBoard/Team-meeting-task-data/types/task-data.types";
import { Link2, Clock, ExternalLink, Inbox } from "lucide-react";

interface Props {
  data: TaskData[];
}

export default function LinkResourceTable({ data }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500">

      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 ring-1 ring-emerald-200 dark:ring-emerald-800 shrink-0">
          <Link2 size={18} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
            গুরুত্বপূর্ণ লিঙ্ক সমূহ
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {data.length} টি লিঙ্ক পাওয়া গেছে
          </p>
        </div>
        <span className="ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-black shrink-0">
          {data.length}
        </span>
      </div>

      {data.length > 0 ? (
        <>
          {/* Mobile cards */}
          <div className="block md:hidden divide-y divide-gray-50 dark:divide-gray-800/60">
            {data.map((item, i) => (
              <div
                key={item.id}
                className="px-5 py-4 flex flex-col gap-3 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/10 transition-colors"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug break-words">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                      <Clock size={12} />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/30"
                >
                  লিঙ্ক খুলুন <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-800/40 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  <th className="px-6 py-3.5">#</th>
                  <th className="px-4 py-3.5">মেসেজ</th>
                  <th className="px-4 py-3.5">সময়</th>
                  <th className="px-4 py-3.5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {data.map((item, i) => (
                  <tr
                    key={item.id}
                    className="hover:bg-emerald-50/40 dark:hover:bg-emerald-900/10 transition-colors group/row"
                  >
                    <td className="px-6 py-4">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-black">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xs break-words leading-relaxed">
                      {item.text}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-300 dark:text-gray-600" />
                        {item.time}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:scale-105 active:scale-95"
                      >
                        খুলুন <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-800">
            <Inbox size={24} className="text-emerald-300 dark:text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">কোনো লিঙ্ক পাওয়া যায়নি</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">Admin নতুন লিঙ্ক যোগ করলে এখানে দেখা যাবে।</p>
          </div>
        </div>
      )}
    </div>
  );
}
