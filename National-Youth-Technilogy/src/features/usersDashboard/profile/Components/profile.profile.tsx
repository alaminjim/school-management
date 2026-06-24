/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import {
  User,
  MapPin,
  GraduationCap,
  Building2,
  Settings,
  ShieldCheck,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileUpdateForm } from "./ProfileUpdateForm";

const getImageUrl = (src?: string | null) =>
  src
    ? src.startsWith("http")
      ? src
      : `${process.env.BASE_URL}/uploads/${src}`
    : null;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06 },
  }),
};

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-9 w-9 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-emerald-400 border border-green-150/30 dark:border-green-900/20">
        <Icon size={18} />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-150 dark:bg-white/5" />
    </div>
  );
}

function InfoTile({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | null;
  full?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] px-5 py-4 ${
        full ? "col-span-2" : ""
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 font-sans">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {value || "—"}
      </p>
    </div>
  );
}

export const ProfileContent = ({ user }: { user: any }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const isAdmin = user?.role === "ADMIN";
  const photoUrl = getImageUrl(user?.directorPhoto);
  const initials = user?.name
    ?.split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#070707] transition-colors duration-500 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ── Hero card ── */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6 md:p-8 shadow-xl shadow-green-950/[0.01]"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={user?.name}
                  className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border border-gray-200 dark:border-white/10"
                />
              ) : (
                <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-800/20 flex items-center justify-center text-green-600 dark:text-emerald-400 text-2xl font-bold">
                  {initials}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 animate-pulse" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white truncate">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-400 font-mono mt-1">
                @{user?.username}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                    isAdmin
                      ? "text-rose-600 bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400"
                      : "text-green-700 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30 dark:text-emerald-400"
                  }`}
                >
                  {user?.role || "Student"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
            </div>

            {/* Settings */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUpdate(true)}
              className="shrink-0 rounded-xl gap-2 border-gray-150 dark:border-white/5 hover:bg-green-50/50 dark:hover:bg-green-950/20 text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-emerald-400 cursor-pointer"
            >
              <Settings size={15} />
              Update Profile
            </Button>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Personal */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6 md:p-8"
            >
              <SectionHeading icon={User} title="Personal Profile" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoTile label="Full name" value={user?.name} full />
                <InfoTile label="Gender" value={user?.gender} />
                <InfoTile label="Religion" value={user?.religion} />
                <InfoTile label="Nationality" value={user?.nationality} full />
                <InfoTile label="Father's name" value={user?.fatherName} />
                <InfoTile label="Mother's name" value={user?.motherName} />
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6 md:p-8"
            >
              <SectionHeading icon={MapPin} title="Location details" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoTile label="Full address" value={user?.fullAddress} full />
                <InfoTile label="Village" value={user?.village} />
                <InfoTile label="Post office" value={user?.postOffice} />
                <InfoTile label="Upazila / Thana" value={user?.thanaUpazila} />
                <InfoTile label="District" value={user?.district} />
              </div>
            </motion.div>

            {/* Academic */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6 md:p-8"
            >
              <SectionHeading icon={GraduationCap} title="Academic status" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoTile label="Course" value={user?.courseName} full />
                <InfoTile
                  label="Qualification"
                  value={user?.educationQualification}
                />
                <InfoTile label="Duration" value={user?.duration} />
                
                <div className="col-span-1 sm:col-span-2 rounded-2xl border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] px-5 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-emerald-400 shrink-0">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 font-sans">
                      Session period
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {user?.startMonth} {user?.startYear} — {user?.endMonth}{" "}
                      {user?.endYear}
                    </p>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 rounded-2xl border border-gray-150 dark:border-white/5 bg-white dark:bg-[#121212] px-5 py-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-emerald-400 shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 font-sans">
                      Institute
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {user?.institute || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Director photo */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="overflow-hidden rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-1.5 aspect-4/3 bg-white dark:bg-gray-900 shadow-sm"
            >
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Director"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-50 dark:bg-[#121212] flex flex-col items-center justify-center text-green-600/30 dark:text-emerald-500/20 gap-2">
                    <User size={36} />
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">No Photo</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Institute info */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-150 dark:border-white/5 p-6"
            >
              <SectionHeading icon={Building2} title="Institute Info" />
              <div className="space-y-4">
                {[
                  { label: "Name", value: user?.instituteName },
                  { label: "Director", value: user?.directorName },
                  {
                    label: "Established",
                    value: user?.instituteAge
                      ? `${user.instituteAge} years ago`
                      : null,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 dark:border-white/5 last:border-0 font-sans"
                  >
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider shrink-0">
                      {label}
                    </span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 text-right">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Account status */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="rounded-[2.5rem] border border-emerald-200 dark:border-emerald-500/10 bg-emerald-50/50 dark:bg-emerald-950/10 p-6 flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1 font-sans">
                  Account status
                </p>
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <ShieldCheck size={18} />
                  Active
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                <ShieldCheck size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <ProfileUpdateForm user={user} onClose={() => setShowUpdate(false)} />
      )}
    </div>
  );
};

