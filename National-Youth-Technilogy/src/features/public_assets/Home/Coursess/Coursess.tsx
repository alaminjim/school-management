/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight, BookOpen, GraduationCap, Layers } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { useCourseData } from "../../Courses/useCourseData";

const GRID_LIMIT = 8;

export default function Coursess() {
  const { categories, courses, selectedCategory, setSelectedCategory } =
    useCourseData();

  if (courses.isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-12 h-12 border-4 border-green-600/20 border-t-green-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">Loading Courses...</p>
      </div>
    );

  const allCourses = courses.data ?? [];
  const useSlider = allCourses.length > GRID_LIMIT;

  const CourseCard = ({ course }: { course: any }) => (
    <div className="group flex flex-col rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 overflow-hidden h-full shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-green-600/10 hover:-translate-y-2 transition-all duration-500">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white/20">
            <Layers size={10} />
            Program
          </span>
        </div>

        {/* Title on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-black text-sm leading-snug line-clamp-2 drop-shadow-lg">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 px-5 pt-4 pb-6 flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <BookOpen size={12} className="text-green-600" />
            Flexible
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap size={12} className="text-green-600" />
            Cert
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-white/5" />

        {/* CTA */}
        <Link href={`/courses/${course.id}`} className="mt-auto pt-2">
          <button className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white font-black rounded-2xl transition-all duration-300 shadow-md hover:shadow-green-600/20 active:scale-95 text-[11px] uppercase tracking-widest group/btn">
            <span>View Details</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#070707] transition-colors duration-500 overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-green-600 dark:text-green-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Premium Education
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-5">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">Courses</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            অভিজ্ঞ শিক্ষকদের কাছ থেকে হাতে-কলমে শিখুন এবং আপনার ক্যারিয়ার গড়ুন।
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-600" />
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-600" />
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white border-transparent shadow-xl shadow-green-600/25 scale-105"
                : "bg-white dark:bg-gray-900 border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-green-600/50 hover:text-green-600"
            }`}
          >
            All Courses
          </button>
          {categories.data?.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white border-transparent shadow-xl shadow-green-600/25 scale-105"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-green-600/50 hover:text-green-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Courses Grid / Empty ── */}
        {allCourses.length === 0 ? (
          <div className="flex flex-col items-center py-24 px-8 rounded-[3rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-950/20 flex items-center justify-center text-4xl mb-6">
              📚
            </div>
            <h3 className="text-gray-900 dark:text-white font-black text-xl mb-3">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-sm mb-8">
              এই ক্যাটাগরিতে এখনো কোনো কোর্স যোগ হয়নি। অন্য একটি ক্যাটাগরি দেখুন বা পরে আবার আসুন।
            </p>
          </div>
        ) : (
          <>
            {/* Mobile: slider */}
            <div className="block sm:hidden">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="pb-16 courses-swiper"
              >
                {allCourses.map((course: any) => (
                  <SwiperSlide key={course.id} className="h-auto">
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block">
              {useSlider ? (
                <Swiper
                  modules={[Autoplay, Pagination, Grid]}
                  spaceBetween={24}
                  slidesPerView={4}
                  slidesPerGroup={4}
                  grid={{ rows: 2, fill: "row" }}
                  loop={false}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="pb-16 courses-swiper"
                >
                  {allCourses.map((course: any) => (
                    <SwiperSlide key={course.id} className="h-auto mb-4">
                      <CourseCard course={course} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {allCourses.map((course: any) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .courses-swiper .swiper-pagination-bullet {
          background: #e2e8f0;
          width: 10px;
          height: 10px;
          opacity: 1;
        }
        .courses-swiper .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 32px !important;
          border-radius: 20px;
          transition: all 0.4s;
        }
      `}</style>
    </section>
  );
}
