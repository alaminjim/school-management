/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight, Star, User, BookOpen, Clock } from "lucide-react";
import { useCourseData } from "./useCourseData";
import Link from "next/link";

export default function CourseSection() {
  const { categories, courses, selectedCategory, setSelectedCategory } =
    useCourseData();

  if (courses.isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-12 h-12 border-4 border-green-600/20 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Loading Premium Courses...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 dark:bg-[#070707] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative text-center mb-16">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-green-600/10 blur-3xl rounded-full"></div>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-green-600 uppercase bg-green-600/10 rounded-full">
            Elite Learning
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Master New <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Skills</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600 dark:text-gray-400">
            Empower your future with industry-leading courses designed for professional excellence.
          </p>
        </div>

        {/* Premium Categories Filter */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border
                ${
                  selectedCategory === "All"
                    ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-600/25 scale-105"
                    : "bg-white dark:bg-[#121212] border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-green-600/50 hover:text-green-600"
                }`}
            >
              All Programs
            </button>

            {categories.data?.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border
                  ${
                    selectedCategory === cat.id
                      ? "bg-green-600 text-white border-green-600 shadow-xl shadow-green-600/25 scale-105"
                      : "bg-white dark:bg-[#121212] border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-green-600/50 hover:text-green-600"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.data?.length > 0 ? (
            courses.data.map((course: any) => (
              <div
                key={course.id}
                className="group flex flex-col bg-white dark:bg-[#121212] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/5 hover:shadow-green-600/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg">
                      {course.category?.name || "Premium"}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-black dark:text-white">{course.rating || "4.9"}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7 flex flex-col grow">
                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 rounded-full bg-green-600/10 border border-green-600/20">
                      <User size={12} className="text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      {course.instructor || "Expert Mentor"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 dark:text-white font-extrabold text-xl leading-snug line-clamp-2 mb-4 group-hover:text-green-600 transition-colors">
                    {course.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <BookOpen size={14} />
                      <span className="text-xs font-semibold">24 Lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Clock size={14} />
                      <span className="text-xs font-semibold">12.5 Hours</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 space-y-3">
                    <Link href={`/courses/${course.id}`} className="block">
                      <button className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-green-600/25 active:scale-95 flex items-center justify-center gap-2 group/btn">
                        <span className="text-[11px] uppercase tracking-[0.15em]">
                          View Course Details
                        </span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                    
                    {/* Secondary Link to Enrol */}
                    {/* <Link href="/login" className="block text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-green-600 transition-colors cursor-pointer">
                        Quick Enrollment
                      </span>
                    </Link> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center py-32 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10">
              <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <BookOpen size={40} className="text-gray-300 dark:text-gray-700" />
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                No Programs Found
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Try selecting a different category or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
