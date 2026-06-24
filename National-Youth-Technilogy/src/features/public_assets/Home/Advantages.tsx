/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, 
  ThumbsUp, 
  Clock, 
  Users, 
  Headphones 
} from "lucide-react";

const advantages = [
  { 
    icon: Lightbulb, 
    title: "Innovation", 
    description: "আধুনিক প্রযুক্তি ও উদ্ভাবনী পদ্ধতিতে শিক্ষার্থীদের ভবিষ্যতের জন্য প্রস্তুত করা হয়।",
    theme: {
      border: "border-purple-200/80 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-500/50",
      pill: "bg-purple-500 dark:bg-purple-400",
      iconBg: "bg-purple-50/80 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
      title: "text-purple-700 dark:text-purple-400",
      line: "bg-purple-500/30 dark:bg-purple-400/30"
    }
  },
  { 
    icon: ThumbsUp, 
    title: "Quality", 
    description: "অভিজ্ঞ শিক্ষক মণ্ডলী ও মানসম্মত পাঠ্যক্রমের মাধ্যমে সর্বোচ্চ মানের শিক্ষা নিশ্চিত করা হয়।",
    theme: {
      border: "border-blue-200/80 dark:border-blue-900/30 hover:border-blue-400 dark:hover:border-blue-500/50",
      pill: "bg-blue-500 dark:bg-blue-400",
      iconBg: "bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
      title: "text-blue-700 dark:text-blue-400",
      line: "bg-blue-500/30 dark:bg-blue-400/30"
    }
  },
  { 
    icon: Clock, 
    title: "Experience", 
    description: "দীর্ঘ অভিজ্ঞতাসম্পন্ন প্রশিক্ষকদের তত্ত্বাবধানে হাতে-কলমে পেশাদার প্রশিক্ষণ দেওয়া হয়।",
    theme: {
      border: "border-amber-200/80 dark:border-amber-900/30 hover:border-amber-400 dark:hover:border-amber-500/50",
      pill: "bg-amber-500 dark:bg-amber-400",
      iconBg: "bg-amber-50/80 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
      title: "text-amber-700 dark:text-amber-400",
      line: "bg-amber-500/30 dark:bg-amber-400/30"
    }
  },
  { 
    icon: Users, 
    title: "Happy Students", 
    description: "হাজারো সফল শিক্ষার্থী আজ দেশে-বিদেশে সম্মানজনক পেশায় নিয়োজিত — এটাই আমাদের অহংকার।",
    theme: {
      border: "border-emerald-200/80 dark:border-emerald-900/30 hover:border-emerald-400 dark:hover:border-emerald-500/50",
      pill: "bg-emerald-500 dark:bg-emerald-400",
      iconBg: "bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
      title: "text-emerald-700 dark:text-emerald-400",
      line: "bg-emerald-500/30 dark:bg-emerald-400/30"
    }
  },
  { 
    icon: Headphones, 
    title: "24/7 Support", 
    description: "শিক্ষার্থীদের যেকোনো সমস্যায় সার্বক্ষণিক গাইডেন্স ও সহায়তা সেবা প্রদান করা হয়।",
    theme: {
      border: "border-pink-200/80 dark:border-pink-900/30 hover:border-pink-400 dark:hover:border-pink-500/50",
      pill: "bg-pink-500 dark:bg-pink-400",
      iconBg: "bg-pink-50/80 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400",
      title: "text-pink-700 dark:text-pink-400",
      line: "bg-pink-500/30 dark:bg-pink-400/30"
    }
  },
];

export default function Advantages() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#070707] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-green-600 dark:text-green-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Core Philosophy
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Our <span className="text-green-600">Advantages</span>
          </h2>

          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            বাংলাদেশ ন্যাশনাল ইয়ুথ টেকনিক্যাল ইনস্টিটিউট শিক্ষার্থীদের সেরা
            প্রযুক্তিগত শিক্ষা ও দক্ষতা উন্নয়নে প্রতিশ্রুতিবদ্ধ।
          </p>

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-600" />
            <div className="w-2 h-2 rounded-full bg-green-600" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-600" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-[#0c0c0e] relative flex flex-col items-center text-center px-6 py-10 rounded-[24px] border ${adv.theme.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              {/* Top Accent Pill */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1 rounded-b-md ${adv.theme.pill}`} />

              {/* Circular Icon Wrapper */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xs border border-current/5 transition-transform duration-500 group-hover:scale-105 ${adv.theme.iconBg}`}>
                <adv.icon size={26} />
              </div>

              {/* Uppercase Bold Title */}
              <h3 className={`font-black text-xs md:text-sm tracking-wider uppercase mb-2 ${adv.theme.title}`}>
                {adv.title}
              </h3>

              {/* Horizontal Divider Line */}
              <div className={`h-[1.5px] w-8 mb-5 rounded-full ${adv.theme.line}`} />

              {/* Bengali Description */}
              <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
