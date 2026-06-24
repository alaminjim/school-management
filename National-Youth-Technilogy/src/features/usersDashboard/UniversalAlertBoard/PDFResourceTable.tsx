"use client";

import { CompleteNewData } from "@/features/AdminDashboard/UniversalAlertBoard/CompleteNewPDF/Types/complete-new.types";
import { FileText, Calendar, Download, Inbox, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  data: CompleteNewData[];
}

function DownloadButton({ pdfUrl, fileName }: { pdfUrl: string; fileName: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/download-pdf?url=${encodeURIComponent(pdfUrl)}`);
      if (!response.ok) throw new Error("Failed");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      alert("PDF download করা যাচ্ছে না। Admin কে জানান। ⚠️");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-sm shadow-teal-600/20 hover:shadow-teal-600/40 hover:scale-105 active:scale-95"
    >
      {downloading ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <Download size={13} />
      )}
      {downloading ? "..." : "ডাউনলোড"}
    </button>
  );
}

export default function PDFResourceTable({ data }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-500">

      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-emerald-500 to-green-500" />

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/30 ring-1 ring-teal-200 dark:ring-teal-800 shrink-0">
          <FileText size={18} className="text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
            রিসোর্স ফাইল (PDF)
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {data.length} টি ফাইল পাওয়া গেছে
          </p>
        </div>
        <span className="ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-[10px] font-black shrink-0">
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
                className="px-5 py-4 flex flex-col gap-3 hover:bg-teal-50/40 dark:hover:bg-teal-900/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 ring-1 ring-teal-100 dark:ring-teal-800 shrink-0">
                    <FileText size={14} className="text-teal-500 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug break-words">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                <DownloadButton pdfUrl={item.pdfUrl} fileName={item.text} />
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/70 dark:bg-gray-800/40 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  <th className="px-6 py-3.5">#</th>
                  <th className="px-4 py-3.5">ফাইল নাম</th>
                  <th className="px-4 py-3.5">তারিখ</th>
                  <th className="px-4 py-3.5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {data.map((item, i) => (
                  <tr
                    key={item.id}
                    className="hover:bg-teal-50/40 dark:hover:bg-teal-900/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 ring-1 ring-teal-100 dark:ring-teal-800">
                        <FileText size={14} className="text-teal-500 dark:text-teal-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xs break-words leading-relaxed">
                      {item.text}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-gray-300 dark:text-gray-600" />
                        {item.date}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DownloadButton pdfUrl={item.pdfUrl} fileName={item.text} />
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
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center ring-1 ring-teal-100 dark:ring-teal-800">
            <Inbox size={24} className="text-teal-300 dark:text-teal-700" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">কোনো PDF পাওয়া যায়নি</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">Admin নতুন ফাইল আপলোড করলে এখানে দেখা যাবে।</p>
          </div>
        </div>
      )}
    </div>
  );
}
