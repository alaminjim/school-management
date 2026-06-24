"use client";

import { useEffect, useState } from "react";
import { GraduationCap, PlayCircle, Trophy, Clock, Calendar, BookOpen, ArrowUpRight, HelpCircle, Loader2 } from "lucide-react";
import { getCookie } from "@/core/utils/cookieUtils";
import { jwtUtils } from "@/core/utils/jwtUtils";
import Link from "next/link";

export default function Dashboard() {
  const [studentName, setStudentName] = useState("Student");
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState({ en: "Welcome", bn: "স্বাগতম" });

  useEffect(() => {
    // Fetch student name from cookie
    const getStudentData = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const decoded = jwtUtils.decodedToken(token);
        if (decoded?.name) {
          setStudentName(decoded.name);
        } else if (decoded?.email) {
          setStudentName(decoded.email.split("@")[0]);
        }
      }
      setLoading(false);
    };

    // Calculate time of day greeting
    const getGreetingTime = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        return { en: "Good Morning", bn: "শুভ সকাল" };
      } else if (hour >= 12 && hour < 17) {
        return { en: "Good Afternoon", bn: "শুভ অপরাহ্ন" };
      } else if (hour >= 17 && hour < 21) {
        return { en: "Good Evening", bn: "শুভ সন্ধ্যা" };
      } else {
        return { en: "Good Night", bn: "শুভ রাত্রি" };
      }
    };

    getStudentData();
    setGreeting(getGreetingTime());
  }, []);

  const stats = [
    { label: "Enrolled Courses", value: "04", icon: GraduationCap, bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-100 dark:border-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
    { label: "Completed", value: "02", icon: Trophy, bg: "bg-sky-50 dark:bg-sky-950/20", border: "border-sky-100 dark:border-sky-900/30", text: "text-sky-600 dark:text-sky-400" },
    { label: "In Progress", value: "02", icon: PlayCircle, bg: "bg-teal-50 dark:bg-teal-950/20", border: "border-teal-100 dark:border-teal-900/30", text: "text-teal-600 dark:text-teal-400" },
    { label: "Study Hours", value: "84h", icon: Clock, bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-100 dark:border-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-green-600 dark:text-emerald-500" size={36} />
        <span className="text-xs uppercase font-bold tracking-widest text-gray-400 animate-pulse">Setting up Workspace...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-green-950/90 via-emerald-900/80 to-green-950 text-white shadow-xl shadow-green-950/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full filter blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 bg-emerald-500/15 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {greeting.en}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {greeting.bn}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-100">{studentName}</span>! 👋
            </h1>
            <p className="text-sm sm:text-base text-white/80 font-sans font-light max-w-xl">
              বাংলাদেশ ন্যাশনাল ইয়ুথ টেকনিক্যাল ইনস্টিটিউটে আপনার আজকের লার্নিং অগ্রগতি ট্র্যাক করুন ও নতুন লেসন শুরু করুন।
            </p>
          </div>
          
          <Link
            href="/dashboard/student-form"
            className="px-6 py-3.5 bg-white text-green-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 text-center cursor-pointer shadow-lg shadow-black/10"
          >
            Admission Registration
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="p-6 rounded-[2rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-gray-900 transition-all duration-500 hover:border-green-500/20 hover:shadow-xl hover:shadow-green-950/[0.01] cursor-pointer flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 font-sans">{stat.label}</span>
              <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</div>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.border} ${stat.text} flex items-center justify-center shadow-inner`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Roster & Dashboard Visual Area */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: Enrolled Courses Mock (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-white/5 pb-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Active Courses (আপনার কোর্সসমূহ)</h3>
            <span className="text-xs font-black text-green-600 dark:text-emerald-400 uppercase tracking-widest">In Progress</span>
          </div>

          <div className="space-y-4">
            {[
              { title: "Computer Office Application & IT", progress: 65, duration: "6 Months", code: "COA-101", rating: "Completed 24/36 Lectures" },
              { title: "Graphic Design & Creative Layouts", progress: 30, duration: "3 Months", code: "GD-202", rating: "Completed 8/24 Lectures" },
            ].map((course, idx) => (
              <div key={idx} className="p-6 rounded-[2rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-gray-900 flex flex-col gap-4 transition-all hover:border-green-500/20">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{course.code} • {course.duration}</span>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base tracking-tight">{course.title}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-emerald-400 shrink-0">
                    <BookOpen size={14} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-sans text-gray-500">
                    <span>{course.rating}</span>
                    <span className="font-bold text-green-600 dark:text-emerald-400">{course.progress}% Completed</span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Academic Calendar / notice summary (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-white/5 pb-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Academic Notices</h3>
            <Link href="/dashboard/UniversalAlertBoard" className="text-xs font-black text-green-600 dark:text-emerald-400 uppercase tracking-widest hover:text-green-700">View Board</Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6 space-y-6">
            {[
              { date: "June 12", title: "Semester Practical Lab Registration Start", type: "Exam" },
              { date: "June 18", title: "Special Skill-development Workshop on React & Web Apps", type: "Workshop" },
              { date: "June 25", title: "National Skills Competition Application Deadline", type: "Contest" },
            ].map((event, idx) => (
              <div key={idx} className="flex gap-4 items-start pb-4 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/20 flex flex-col justify-center items-center text-green-600 dark:text-emerald-400 shrink-0 font-sans">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{event.date.split(" ")[0]}</span>
                  <span className="text-base font-black leading-none">{event.date.split(" ")[1]}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">{event.type}</span>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-snug">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}