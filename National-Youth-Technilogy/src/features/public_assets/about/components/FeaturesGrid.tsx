/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Award, BookOpen, Layers, Unlock, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Expert Instructors",
      desc: "Mentored by industry veterans who have years of hands-on professional experiences.",
      icon: <BookOpen />,
    },
    {
      title: "Lifetime Access",
      desc: "Gain unlimited access to study guides, curriculum files, and direct community resources.",
      icon: <Unlock />,
    },
    {
      title: "Project-Based",
      desc: "Master key concepts by designing, debugging, and building real-world software & apps.",
      icon: <Layers />,
    },
    { 
      title: "Certification", 
      desc: "Get verified credentials and certificates that validate your technical skills globally.", 
      icon: <Award /> 
    },
    { 
      title: "Fast-Track Path", 
      desc: "Accelerated career-optimized tracks designed to get you job-ready in minimum time.", 
      icon: <Zap /> 
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-green-500/[0.02] dark:bg-green-500/[0.01] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-green-200/50 dark:border-green-800/30 bg-green-50/50 dark:bg-green-950/20 text-[10px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-emerald-400">
            Core Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
              Your Success
            </span>
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto rounded-full mt-3" />
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative p-10 rounded-[2.5rem] border border-gray-150 dark:border-white/5 transition-all duration-500 bg-white dark:bg-[#121212] shadow-sm hover:shadow-xl hover:shadow-green-600/[0.03] hover:border-green-500/20 cursor-pointer overflow-hidden"
            >
              {/* Top Accent Line Animation */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Icon Container */}
              <div className="w-16 h-16 mb-8 rounded-[1.25rem] bg-gradient-to-br from-green-600 to-emerald-700 text-white flex items-center justify-center shadow-lg shadow-green-600/10 group-hover:shadow-green-600/20 transform group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
                {React.cloneElement(
                  f.icon as React.ReactElement,
                  { size: 26 } as any,
                )}
              </div>

              {/* Content */}
              <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-green-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {f.title}
              </h4>
              <p className="text-sm text-gray-550 dark:text-gray-400 leading-relaxed font-sans font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

