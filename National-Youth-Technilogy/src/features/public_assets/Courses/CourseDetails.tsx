/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Star, 
  User, 
  Share2, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  FileText,
  Award
} from "lucide-react";
import Link from "next/link";
import { showToast } from "@/core/utils/toast-messages";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/courses/${id}`);
      return data.data;
    },
  });

  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#070707] space-y-4">
      <div className="w-16 h-16 border-4 border-green-600/20 border-t-green-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-bold tracking-widest animate-pulse">LOADING EXPERIENCE...</p>
    </div>
  );

  if (error || !course) return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:text-white bg-gray-50 dark:bg-[#070707]">
       <div className="text-6xl mb-6">🔍</div>
       <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
       <button 
         onClick={() => router.push('/courses')}
         className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
       >
         Return to Catalog
       </button>
    </div>
  );

const handleShare = async () => {
  const shareData = {
    title: course?.title || "Check out this course!",
    text: `Hey! I found this amazing course: ${course?.title} by ${course?.instructor}. Check it out!`,
    url: typeof window !== "undefined" ? window.location.href : "", 
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showToast.success("Course shared successfully!");
    } else {
      await navigator.clipboard.writeText(shareData.url);
      showToast.copySuccess();
    }
  } catch (err) {
    console.error("Error sharing:", err);
    showToast.failed(); 
  }
};

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#070707] pb-32 transition-colors duration-500">
      {/* --- Aesthetic Backdrop --- */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-600/5 to-transparent pointer-events-none" />

      {/* --- Top Navigation --- */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-green-600 transition-all font-bold text-sm uppercase tracking-widest"
        >
          <div className="p-2 rounded-full bg-white dark:bg-[#121212] shadow-sm border border-gray-100 dark:border-white/5 group-hover:border-green-600/50">
            <ArrowLeft size={18} />
          </div>
          <span>Back to Catalog</span>
        </button>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* --- Left Side: Main Content --- */}
        <div className="lg:col-span-2 space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
               <span className="px-5 py-2 rounded-2xl bg-green-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-green-600/20">
                {course.category?.name || "Premium Program"}
              </span>
               <span className="px-5 py-2 rounded-2xl bg-white dark:bg-[#121212] text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border border-gray-100 dark:border-white/5 shadow-sm">
                {course.isPublished ? "✓ Verified Course" : "Coming Soon"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-[1px]">
                  <div className="w-full h-full rounded-[15px] bg-white dark:bg-[#070707] flex items-center justify-center">
                    <User size={20} className="text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Instructor</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{course.instructor || "Expert Mentor"}</p>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-gray-200 dark:bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                  <Star size={20} className="text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Rating</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100" suppressHydrationWarning>
                    {course.rating || "4.9"} <span className="text-gray-400 font-medium">({course.totalReviews || 120} Reviews)</span>
                  </p>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-gray-200 dark:bg-white/10 hidden md:block" />

              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Clock size={20} className="text-green-600" />
                <span className="font-bold" suppressHydrationWarning>
                  Updated {new Date(course.updatedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnail Preview */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-700 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white dark:border-white/5 shadow-2xl bg-black">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                  <PlayCircle size={40} className="text-white fill-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Description / About Section */}
          <div className="space-y-6">
             <h2 className="text-2xl font-black dark:text-white flex items-center gap-3">
               <div className="w-2 h-8 bg-green-600 rounded-full" />
               About This Program
             </h2>
             <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
               Experience a comprehensive learning journey designed to take you from fundamentals to advanced mastery. This course combines theoretical knowledge with practical, real-world applications to ensure you gain the skills demanded by today's industry leaders.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
               {[
                 "Industry-recognized certification",
                 "Hands-on project experience",
                 "Lifetime access to materials",
                 "Expert mentorship & support"
               ].map((item, index) => (
                 <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5">
                   <CheckCircle2 size={18} className="text-green-600" />
                   <span className="text-sm font-bold dark:text-gray-200">{item}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* --- Right Side: Sticky Checkout Card --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-12">
            <div className="bg-white dark:bg-[#121212] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
              <div className="p-10">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">Premium Access</p>
                    <h3 className="text-3xl font-black dark:text-white tracking-tight">Exclusive Enrollment</h3>
                  </div>

                  <div className="space-y-4">
                    <Link href="/login" className="block">
                      <button className="w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-white transition-all shadow-xl shadow-black/10 hover:shadow-green-600/25 active:scale-[0.98] flex items-center justify-center gap-3">
                        <span className="uppercase tracking-widest text-xs">Enroll Now</span>
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                    <button className="w-full py-5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all border border-gray-100 dark:border-white/5 active:scale-[0.98] uppercase tracking-widest text-xs">
                      Free Consultation
                    </button>
                  </div>

                  <div className="pt-8 border-t border-gray-100 dark:border-white/5 space-y-5">
                    <p className="text-[10px] font-black dark:text-gray-400 uppercase tracking-[0.2em]">What's Included</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                          <BookOpen size={18} className="text-green-600" />
                          <span className="text-sm font-bold">Total Lessons</span>
                        </div>
                        <span className="text-sm font-black dark:text-white">24 Units</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                          <FileText size={18} className="text-green-600" />
                          <span className="text-sm font-bold">Resources</span>
                        </div>
                        <span className="text-sm font-black dark:text-white">12 Files</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                          <Award size={18} className="text-green-600" />
                          <span className="text-sm font-bold">Certificate</span>
                        </div>
                        <span className="text-sm font-black dark:text-white">Included</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                          <ShieldCheck size={18} className="text-green-600" />
                          <span className="text-sm font-bold">Access</span>
                        </div>
                        <span className="text-sm font-black dark:text-white">Lifetime</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={handleShare}
                    className="flex items-center justify-between p-5 rounded-3xl bg-green-600/5 border border-green-600/10 cursor-pointer hover:bg-green-600/10 transition-all active:scale-95 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-sm border border-green-600/20">
                        <Share2 size={20} className="text-green-600 group-hover:rotate-12 transition-transform" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white">Share Course</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Invite Colleagues</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-green-600 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Secure Checkout & Data Protection
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}