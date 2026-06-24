/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, ArrowRight, BookOpen, Star } from "lucide-react";
import { getAboutSectionsAction } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.actions";
import { AboutSection } from "@/features/AdminDashboard/Our-Story/AboutSection/AboutSection.types";

const TEXT_LIMIT = 300; 

export default function About() {
  const [items, setItems] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState<AboutSection | null>(null);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      const result = await getAboutSectionsAction();
      if (!ignore) {
        setItems(result.data ?? []);
        setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 bg-gray-50 dark:bg-[#070707] transition-colors duration-500">
        <div className="relative flex flex-col items-center gap-4">
          <div className="absolute -inset-4 w-20 h-20 rounded-full border border-green-500/10 dark:border-green-500/5 animate-pulse" />
          <Loader2 className="animate-spin text-green-600 dark:text-emerald-500" size={40} />
          <span className="text-sm font-semibold tracking-widest uppercase text-green-600 dark:text-emerald-500 animate-pulse">Loading Story...</span>
        </div>
      </div>
    );
  }

  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-55 dark:from-[#070707] dark:to-[#0a0a0a] py-24 transition-colors duration-500">
      
      {/* Subtle Background Glow Nodes */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/5 to-green-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 space-y-32 relative z-10">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isLong = (item.text?.length ?? 0) > TEXT_LIMIT;
          const shortText = isLong
            ? item.text!.slice(0, TEXT_LIMIT).trimEnd() + "…"
            : item.text;

          return (
            <motion.div
              key={item.id ?? index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className={`flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20 group`}
            >
              {/* Image Container with Premium Decorative Frames */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] p-3 border border-gray-100 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-xl shadow-green-950/5 dark:shadow-none transition-all duration-500 group-hover:border-green-500/20">
                  
                  {/* Decorative outer glow ring */}
                  <div className="absolute -inset-1 rounded-[2.8rem] border border-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title ?? "Section Image"}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-[#0d1714] dark:to-[#0a1210] flex items-center justify-center">
                        <BookOpen size={48} className="text-green-600/30 dark:text-emerald-500/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 dark:opacity-40" />
                  </div>
                </div>
              </div>

              {/* Text Content Block */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-3">
                  {item.name && (
                    <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-green-200/50 dark:border-green-800/30 bg-green-50/50 dark:bg-green-950/20 text-[10px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-emerald-400">
                      <Star size={10} className="fill-green-600 text-green-600 dark:fill-emerald-400 dark:text-emerald-400" />
                      {item.name}
                    </span>
                  )}
                  {item.title && (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.15] tracking-tight">
                      {item.title}
                    </h2>
                  )}
                </div>
                
                {/* Custom premium separator line with dot */}
                <div className="flex items-center gap-2">
                  <div className="w-16 h-[3px] bg-gradient-to-r from-green-600 to-emerald-500 rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                {shortText && (
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans font-light">
                    {shortText}
                  </p>
                )}
                
                {isLong && (
                  <button
                    onClick={() => setModalItem(item)}
                    className="group inline-flex items-center gap-2 text-xs font-black text-green-600 dark:text-emerald-400 uppercase tracking-widest hover:text-green-700 dark:hover:text-emerald-300 transition-colors cursor-pointer pt-2"
                  >
                    Read Full Story
                    <span className="w-8 h-8 rounded-full border border-green-200/60 dark:border-white/10 group-hover:border-green-600/50 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glassmorphic Modal Dialog */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md px-4"
            onClick={() => setModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-gray-900/95 border border-gray-150 dark:border-white/10 rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col backdrop-blur-xl"
            >
              {/* Modal Accent Strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600" />
              
              <div className="flex items-start justify-between p-8 pb-6 border-b border-gray-100 dark:border-white/5">
                <div className="space-y-1">
                  {modalItem.name && (
                    <span className="text-[10px] font-black text-green-600 dark:text-emerald-400 uppercase tracking-[0.2em]">
                      {modalItem.name}
                    </span>
                  )}
                  {modalItem.title && (
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                      {modalItem.title}
                    </h3>
                  )}
                </div>
                <button
                  onClick={() => setModalItem(null)}
                  className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto font-sans">
                {modalItem.text && (
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line">
                    {modalItem.text}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}