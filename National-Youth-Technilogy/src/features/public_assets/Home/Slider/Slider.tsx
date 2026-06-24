"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { NoticeData, SliderData } from "./types";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function Slider() {
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/get-slider`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setSliders(Array.isArray(data?.data) ? data.data : []);
        setLoading(false);
      })
      .catch(() => {
        setSliders([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices/get-notices`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setNotices(Array.isArray(data?.data) ? data.data : []))
      .catch(() => setNotices([]));
  }, []);

  if (loading)
    return (
      <div className="w-full h-[60vh] md:h-[75vh] lg:h-[88vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );

  if (!sliders.length)
    return (
      <div className="w-full h-[60vh] md:h-[75vh] lg:h-[88vh] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <p className="text-gray-400 text-sm">কোনো slider নেই</p>
      </div>
    );

  return (
    <section className="w-full relative group">
      {/* ── Main Slider ── */}
      <div className="w-full h-[60vh] md:h-[75vh] lg:h-[88vh] relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {sliders.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-full overflow-hidden">
                {/* Background Image with Ken Burns zoom */}
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: activeIndex === index ? 1 : 1.15 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  src={item.image}
                  alt="Slider Image"
                  className="w-full h-full object-cover"
                />

                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
 
                {/* Accent bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <div className="max-w-2xl xl:max-w-3xl">
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6"
                          >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">
                              Bangladesh National Youth Technical Institute
                            </span>
                          </motion.div>

                          {/* Headline */}
                          <motion.h1
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4 drop-shadow-lg"
                          >
                            {item.caption}
                          </motion.h1>

                          {/* Decorative line */}
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="origin-left w-24 h-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-6"
                          />

                          {/* CTA Buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.7 }}
                            className="flex flex-wrap items-center gap-4"
                          >
                            <Link
                              href="/login"
                              className="group flex items-center gap-2.5 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 hover:-translate-y-0.5"
                            >
                              Get Started
                              <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </Link>
                            <Link
                              href="/contact"
                              className="group flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 border border-white/25 hover:border-white/50 hover:-translate-y-0.5"
                            >
                              <Phone size={15} />
                              Contact Us
                            </Link>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Nav Arrows */}
          <div className="swiper-button-prev !text-white/60 hover:!text-white !hidden md:!flex after:!text-xl !transition-all !duration-300 !w-12 !h-12 !bg-white/10 !backdrop-blur-md !rounded-full !border !border-white/20 hover:!bg-white/20 !left-6" />
          <div className="swiper-button-next !text-white/60 hover:!text-white !hidden md:!flex after:!text-xl !transition-all !duration-300 !w-12 !h-12 !bg-white/10 !backdrop-blur-md !rounded-full !border !border-white/20 hover:!bg-white/20 !right-6" />
        </Swiper>

        {/* Slide counter */}
        <div className="absolute bottom-14 right-6 md:right-10 z-10 bg-black/30 backdrop-blur-md border border-white/15 rounded-full px-4 py-1.5 hidden md:flex items-center gap-1.5">
          <span className="text-green-400 font-black text-sm">{activeIndex + 1}</span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-white/60 text-xs">{sliders.length}</span>
        </div>
      </div>

      {/* ── Notice Ticker ── */}
      {notices.length > 0 && (
        <div className="relative overflow-hidden h-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
        >
          <div className="relative flex items-center h-full">

            {/* ── NOTICE Label ── */}
            <div className="relative flex items-center h-full shrink-0 px-5 gap-2.5"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #047857 100%)",
                borderRight: "3px solid #065f46",
              }}
            >
              {/* Live pulse */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span className="text-white text-[10.5px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
                🔔 Notice
              </span>
            </div>
 
            {/* Chevron arrow */}
            <div className="w-0 h-0 shrink-0"
              style={{
                borderTop: "24px solid transparent",
                borderBottom: "24px solid transparent",
                borderLeft: "12px solid #047857",
              }}
            />

            {/* ── Scrolling Ticker ── */}
            <div className="relative flex-1 overflow-hidden flex items-center h-full">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, white, transparent)" }}
              />
              <div className="animate-marquee flex items-center gap-14 whitespace-nowrap px-4">
                {[...notices, ...notices].map((notice, i) => (
                  <span key={i} className="flex items-center gap-2.5 text-[12.5px] font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                    {notice.text}
                  </span>
                ))}
              </div>
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, white, transparent)" }}
              />
            </div>

            {/* ── Right Date Badge ── */}
            <div className="hidden md:flex items-center shrink-0 h-full px-5 gap-3 border-l border-gray-200 dark:border-white/10">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Today</span>
                <span className="text-[12px] font-black text-gray-700 dark:text-gray-200 tracking-wider">
                  {new Date().toLocaleDateString("en-BD", { day: "2-digit", month: "short" })}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 30px !important;
          border-radius: 20px !important;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 14px !important;
          font-weight: 900 !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
