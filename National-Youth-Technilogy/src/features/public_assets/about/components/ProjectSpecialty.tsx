"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Cpu, FolderGit } from "lucide-react";

export default function ProjectSpecialty() {
  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
  ];

  const specialties = [
    {
      icon: <Cpu className="text-green-600 dark:text-emerald-400 shrink-0" size={20} />,
      title: "Hands-on Practical Training",
      desc: "We focus heavily on visual learning and practical lab sessions instead of just theory lessons."
    },
    {
      icon: <FolderGit className="text-emerald-500 shrink-0" size={20} />,
      title: "Real-world Portfolio Building",
      desc: "Students build functional projects to showcase their skills directly in their professional resumes."
    },
    {
      icon: <ShieldCheck className="text-green-700 dark:text-emerald-300 shrink-0" size={20} />,
      title: "Career & Placement Support",
      desc: "Our active support team connects certified students with leading national companies and industries."
    }
  ];

  return (
    <section className="py-24 bg-gray-55 dark:bg-[#0c0c0c] transition-colors duration-500 relative overflow-hidden">
      
      {/* Decorative vector shape */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/[0.02] dark:bg-green-500/[0.01] rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Images Grid (5 columns wide) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 order-2 lg:order-1">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative aspect-square rounded-[2rem] overflow-hidden shadow-lg border border-gray-200/40 dark:border-white/5 bg-white/5 p-1.5 ${
                i % 2 !== 0 ? "mt-8 sm:mt-12" : ""
              }`}
            >
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <img 
                  src={src} 
                  alt="Project work" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-108" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Text & Features List (7 columns wide) */}
        <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-green-200/50 dark:border-green-800/30 bg-green-50/50 dark:bg-green-950/20 text-[10px] font-black uppercase tracking-[0.25em] text-green-700 dark:text-emerald-400">
              Why We Stand Out
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.15] tracking-tight">
              Our Unique <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
                Project Specialty
              </span>
            </h2>
            <div className="w-12 h-1 bg-green-600 rounded-full mt-3 mx-auto lg:mx-0" />
          </div>

          <div className="bg-white dark:bg-[#121212] p-8 sm:p-10 rounded-[2.5rem] border border-gray-150 dark:border-white/5 shadow-xl shadow-green-950/[0.01] dark:shadow-none space-y-8 relative overflow-hidden transition-all duration-500 hover:border-green-500/10">
            {/* Top color bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-600 via-emerald-500 to-green-600" />
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-sans font-light text-base sm:text-lg">
              We strongly believe that true technical mastery is achieved only through hands-on practice. Bangladesh National Youth Technical Institute designs courses around real industry assignments so you can start coding or working with systems on day one.
            </p>

            <div className="h-px bg-gray-100 dark:bg-white/5" />

            {/* Specialties bullet points list */}
            <div className="space-y-6">
              {specialties.map((spec, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center shrink-0 border border-green-100/50 dark:border-green-900/30">
                    {spec.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-base font-sans tracking-tight">
                      {spec.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans font-light">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

