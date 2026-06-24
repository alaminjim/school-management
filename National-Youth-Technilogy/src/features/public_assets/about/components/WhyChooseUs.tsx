"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, Layers, HelpCircle, Zap, ArrowUpRight, MessageSquare, Check, Sparkles, Code, Play } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-[#070707] transition-colors duration-500 overflow-hidden relative border-t border-gray-150 dark:border-white/5">
      {/* Decorative glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/[0.02] rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Bento Grid Header */}
        <div className="mb-16 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-green-200/50 dark:border-green-800/30 bg-green-50/50 dark:bg-green-950/20 text-[10px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-emerald-400">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4 leading-tight">
            The Advantage of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">Premium Education</span>
          </h2>
          <div className="w-12 h-1 bg-green-600 rounded-full mt-4 mx-auto lg:mx-0" />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[auto] lg:auto-rows-[280px]">
          
          {/* Card 1: Trusted Learning (Spans 2 columns on lg) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-8 rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-600/[0.03] lg:col-span-2 flex flex-col md:flex-row gap-6 justify-between cursor-pointer"
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-green-600/10">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 dark:text-white mb-2 text-xl font-sans tracking-tight">Trusted Learning</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-light">
                  Our courses are strictly aligned with modern standards, ensuring you receive industry-validated technical training.
                </p>
              </div>
            </div>

            {/* Visual: Growth Chart Mockup */}
            <div className="w-full md:w-48 h-36 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-white/5 p-4 flex flex-col justify-between shrink-0 relative overflow-hidden self-center">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Success Rate</span>
                  <span className="text-xl font-black text-green-600 dark:text-emerald-400 font-sans">98.5%</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/30 text-[8px] font-bold text-green-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight size={8} /> +4.2%
                </div>
              </div>
              
              {/* Mini SVG Graph line */}
              <div className="h-12 w-full mt-2 relative">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5 L 100 40 L 0 40 Z"
                    fill="url(#chartGlow)"
                  />
                  <path
                    d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="5" r="2.5" fill="#34d399" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Flexible Paths */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-8 rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-600/[0.03] flex flex-col justify-between cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-600 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 text-white flex items-center justify-center shadow-lg shadow-green-600/10">
              <FileText size={20} />
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1.5 text-lg font-sans tracking-tight">Flexible Paths</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-light mb-4">
                Learn at your own pace with modular timing options.
              </p>
            </div>

            {/* Visual: Flexible Shift slots */}
            <div className="grid grid-cols-2 gap-2 mt-auto">
              {[
                { name: "Day Shift", color: "bg-emerald-500" },
                { name: "Night Shift", color: "bg-sky-500" },
                { name: "Weekend", color: "bg-amber-500" },
                { name: "Self-Paced", color: "bg-purple-500" }
              ].map((shift, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-gray-50 dark:bg-black/10 border border-gray-100 dark:border-white/5 flex items-center gap-1.5 transition-colors duration-300 group-hover:bg-white dark:group-hover:bg-[#181818]">
                  <span className={`w-1.5 h-1.5 rounded-full ${shift.color} animate-pulse`} />
                  <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 font-sans">{shift.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 6: Special CTA Highlight Card (Spans 1 col, 2 rows on lg) */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group lg:row-span-2 relative p-8 rounded-[2.5rem] bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#065f46] text-white flex flex-col justify-between shadow-xl shadow-green-950/20 overflow-hidden min-h-[300px] lg:min-h-0"
          >
            {/* Card glows */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-emerald-400/20 filter blur-xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-green-400/25 filter blur-xl pointer-events-none animate-pulse" />
            
            {/* Diagonal reflex card overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
                <Sparkles size={24} className="animate-spin-slow" style={{ animationDuration: '8s' }} />
              </div>
              <h4 className="text-2xl font-black tracking-tight leading-tight">Ready to <br/>Start?</h4>
              <p className="text-xs text-white/80 leading-relaxed font-sans font-light">
                Join our next batch of technical students today and reshape your career with globally accredited technical certification.
              </p>
            </div>

            {/* Visual: Glowing Credit Card / Badge */}
            <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-8 rounded bg-yellow-500/80" />
                <span className="text-[8px] tracking-[0.2em] font-sans text-white/50 uppercase">Student Badge</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans text-white/40 block">STUDENT ID</span>
                <span className="text-xs tracking-widest font-mono text-white/95">BNYTI - 98642017</span>
              </div>
            </div>

            <Link 
              href="/register" 
              className="w-full py-4 bg-white text-green-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-150 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-md text-center flex items-center justify-center gap-1.5 cursor-pointer relative z-10"
            >
              Apply Now
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* Card 3: Complex Solutions */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-8 rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-600/[0.03] flex flex-col justify-between cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-700 to-emerald-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-800 to-emerald-800 text-white flex items-center justify-center shadow-lg shadow-green-600/10">
              <Layers size={20} />
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1.5 text-lg font-sans tracking-tight">Complex Solutions</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-light mb-4">
                Master troubleshooting and engineering projects directly in real labs.
              </p>
            </div>

            {/* Visual: Checklist Mockup */}
            <div className="bg-gray-50 dark:bg-black/25 rounded-2xl border border-gray-100 dark:border-white/5 p-3 space-y-2 mt-auto font-mono text-[9px]">
              <div className="flex items-center gap-2 text-green-600 dark:text-emerald-400">
                <Check size={10} strokeWidth={3} />
                <span>Router Configuration</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-emerald-400">
                <Check size={10} strokeWidth={3} />
                <span>Database Migration</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center animate-spin border-t-green-600 dark:border-t-emerald-400 shrink-0" />
                <span className="animate-pulse">Deploying to cloud server...</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: 24/7 Support */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-8 rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-600/[0.03] flex flex-col justify-between cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-emerald-800 to-green-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-900 to-green-900 text-white flex items-center justify-center shadow-lg shadow-green-600/10">
              <HelpCircle size={20} />
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1.5 text-lg font-sans tracking-tight">24/7 Support</h4>
              <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-sans font-light mb-4">
                Our active mentors are always available to help solve programming bugs.
              </p>
            </div>

            {/* Visual: Live chat interface */}
            <div className="bg-gray-50 dark:bg-black/25 rounded-2xl border border-gray-100 dark:border-white/5 p-3 space-y-2 mt-auto font-sans text-[9px] flex flex-col">
              <div className="self-start px-2.5 py-1.5 rounded-xl bg-gray-250 dark:bg-white/5 text-gray-600 dark:text-gray-300 max-w-[85%] font-sans">
                My code is throwing an error.
              </div>
              <div className="self-end px-2.5 py-1.5 rounded-xl bg-green-600 text-white max-w-[85%] flex items-center gap-1 font-sans shadow-sm shadow-green-600/10">
                <Check size={10} /> Let me check it!
              </div>
            </div>
          </motion.div>

          {/* Card 5: Fast-Track Career */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative p-8 rounded-[2.5rem] border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] overflow-hidden transition-all duration-500 hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-600/[0.03] flex flex-col justify-between cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-green-600/10">
              <Zap size={20} />
            </div>

            <div>
              <h4 className="font-black text-gray-900 dark:text-white mb-1.5 text-lg font-sans tracking-tight">Fast-Track Path</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-light mb-4">
                Career paths optimized for faster employment placement.
              </p>
            </div>

            {/* Visual: Progress Roadmap */}
            <div className="flex justify-between items-center relative py-1 mt-auto">
              <div className="absolute h-0.5 left-2 right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-white/10 -z-10" />
              <div className="absolute h-0.5 left-2 w-1/2 top-1/2 -translate-y-1/2 bg-green-600 -z-10 transition-all duration-700" />
              
              {[
                { label: "Learn", active: true },
                { label: "Intern", active: true },
                { label: "Hired", active: false }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all duration-500 ${
                    step.active 
                      ? "bg-green-600 text-white shadow-md shadow-green-600/25 scale-105" 
                      : "bg-gray-100 dark:bg-[#1e1e1e] text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-white/5"
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-[8px] font-bold text-gray-400 dark:text-gray-500 uppercase font-sans tracking-wider">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}


