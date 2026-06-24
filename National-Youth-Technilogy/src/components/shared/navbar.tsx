/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { PUBLIC_NAV_LINKS } from "@/core/constants/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/core/utils/utils";
import { getCookie, deleteCookie } from "@/core/utils/cookieUtils";
import { jwtUtils } from "@/core/utils/jwtUtils";
import { getDefaultDashboardRoute } from "@/core/utils/authUtils";
import { toast } from "sonner";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("/dashboard");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        setIsLoggedIn(true);
        const decoded = jwtUtils.decodedToken(token);
        const role = decoded?.role;
        setDashboardUrl(getDefaultDashboardRoute(role));
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    setIsLoggedIn(false);
    setOpen(false);
    toast.success("সফলভাবে লগআউট করা হয়েছে!");
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/60 dark:border-white/10"
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md border-b border-transparent",
      )}
    >
      {/* Top accent line — Green gradient theme */}
      <div className="h-[3px] w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600" />

      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-700/30 group-hover:scale-110 transition-transform duration-300" />
            <img
              src="https://i.ibb.co.com/QvN5MgHY/Whats-App-Image-2026-06-05-at-8-38-25-PM-removebg-preview.png"
              alt="BNYTC Logo"
              className="w-full h-full object-contain relative z-10 drop-shadow"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-[13px] lg:text-[15px] tracking-wide whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
                BANGLADESH
              </span>{" "}
              <span className="text-red-700 dark:text-red-500">NATIONAL</span>
            </span>
            <span className="text-[8.5px] lg:text-[9.5px] font-bold uppercase tracking-[0.15em] text-sky-800 dark:text-sky-300 whitespace-nowrap">
              Youth Technical Institute
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 text-[12.5px] font-semibold rounded-xl transition-all duration-200 group/link whitespace-nowrap",
                  isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-white/5",
                )}
              >
                <Icon
                  size={13}
                  className={cn(
                    "shrink-0 transition-transform duration-200 group-hover/link:scale-110",
                    isActive ? "text-green-600" : "",
                  )}
                />
                <span className="whitespace-nowrap">{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4/5 h-[2.5px] rounded-full bg-gradient-to-r from-green-600 to-emerald-700" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2 shrink-0">
          <ModeToggle />

          {/* Desktop Auth */}
          <div className="hidden xl:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href={dashboardUrl}
                  className="flex items-center gap-2 px-3.5 py-2 text-[12.5px] font-semibold rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3.5 py-2 text-[12.5px] font-semibold rounded-xl bg-red-50 text-red-600 border border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
                >
                  <LogIn size={13} />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 hover:from-emerald-700 hover:to-green-800 text-white shadow-md shadow-green-600/25 hover:shadow-green-600/40 transition-all duration-200 whitespace-nowrap"
                >
                  <UserPlus size={13} />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "xl:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300",
              open
                ? "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-900/50 text-red-600"
                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10",
            )}
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                "absolute transition-all duration-300",
                open ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
              )}
            >
              <X size={18} />
            </span>
            <span
              className={cn(
                "absolute transition-all duration-300",
                open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0",
              )}
            >
              <Menu size={18} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={cn(
          "xl:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/10 shadow-2xl">
          <div className="p-4 flex flex-col gap-1.5">
            {/* Nav Links */}
            {PUBLIC_NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group/mlink",
                    isActive
                      ? "bg-gradient-to-r from-green-50 to-green-50/50 text-green-700 border border-green-200 dark:from-green-950/40 dark:to-transparent dark:text-green-400 dark:border-green-900/50"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-green-600 text-white shadow-sm shadow-green-600/30"
                          : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover/mlink:bg-gray-200 dark:group-hover/mlink:bg-white/10",
                      )}
                    >
                      <Icon size={15} />
                    </span>
                    {link.label}
                  </span>
                  <ChevronRight
                    size={14}
                    className={cn(
                      "transition-transform duration-200 group-hover/mlink:translate-x-0.5",
                      isActive ? "text-green-600" : "text-gray-400",
                    )}
                  />
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            {/* Auth Buttons */}
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href={dashboardUrl}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-700 dark:text-gray-300"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard Panel
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold bg-red-50 text-red-600 border border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50 rounded-xl hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-700 dark:text-gray-300"
                  >
                    <LogIn size={16} />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md shadow-green-600/20"
                  >
                    <UserPlus size={16} />
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
