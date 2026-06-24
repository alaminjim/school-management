"use client";

import { motion } from "framer-motion";
import { Eye, Target, Sparkles } from "lucide-react";

export default function VisionMission() {
  const cards = [
    {
      title: "Our Vision",
      icon: <Eye size={32} className="text-white group-hover:text-green-600 transition-colors duration-300" />,
      text: "To be a leading technical education provider recognized for empowering future-ready professionals.",
      bg: "from-green-600 to-emerald-700"
    },
    {
      title: "Our Mission",
      icon: <Target size={32} className="text-white group-hover:text-emerald-700 transition-colors duration-300" />,
      text: "Providing industry-aligned technical education powered by expert faculty and cutting-edge innovation.",
      bg: "from-emerald-700 to-green-800"
    },
    {
      title: "Our Core Values",
      icon: <Sparkles size={32} className="text-white group-hover:text-green-800 transition-colors duration-300" />,
      text: "Building professional integrity, fostering curiosity, and driving excellence in technical expertise.",
      bg: "from-green-800 to-emerald-900"
    },
  ];

  return (
    <section className="py-24 bg-gray-55 dark:bg-[#070707] transition-colors duration-500 relative overflow-hidden">
      
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/[0.02] dark:bg-green-500/[0.01] rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/5 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-600/5 transition-all duration-500 cursor-pointer"
            >
              {/* Gradient hover background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon wrapper with glow and scale effect */}
                <div className={`w-16 h-16 mb-8 rounded-[1.25rem] bg-gradient-to-br ${card.bg} group-hover:bg-white group-hover:from-white group-hover:to-white flex items-center justify-center shadow-lg transition-all duration-500 transform group-hover:scale-110`}>
                  {card.icon}
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-white transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-sans font-light group-hover:text-white/90 transition-colors duration-300">
                  {card.text}
                </p>

                {/* Subtle bottom arrow accent that fades in on hover */}
                <div className="mt-8 flex items-center gap-2 text-green-600 dark:text-emerald-400 group-hover:text-white text-xs font-black tracking-widest uppercase transition-colors duration-300">
                  Learn More
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

