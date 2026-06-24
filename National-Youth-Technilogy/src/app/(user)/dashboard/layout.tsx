/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import { USER_NAV_LINKS } from "@/core/constants/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X, LayoutDashboard, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDashboardNavbar } from "@/components/shared/user/UserDashboardNavbar";
import { cn } from "@/core/utils/utils";
import { deleteCookie } from "@/core/utils/cookieUtils"; 
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoutAction = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    toast.success("Logged out successfully! 👋");
    router.push("/login");
    router.refresh();
  };

  const NavContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-150 dark:border-white/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-700/30 group-hover:scale-110 transition-transform duration-300" />
            <img
              src="https://i.ibb.co.com/QvN5MgHY/Whats-App-Image-2026-06-05-at-8-38-25-PM-removebg-preview.png"
              alt="BNYTC Logo"
              className="w-full h-full object-contain relative z-10 drop-shadow"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
              BNYTI
            </span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Student Portal
            </span>
          </div>
        </Link>
        <button 
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-colors" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2.5">
        {USER_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-300 rounded-xl relative group/item",
                isActive 
                  ? "bg-green-600/10 dark:bg-green-950/20 text-green-700 dark:text-emerald-400 font-bold border-l-[3.5px] border-green-600" 
                  : "text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-emerald-400 hover:bg-green-50/50 dark:hover:bg-green-950/10"
              )}
            >
              <link.icon className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-300 group-hover/item:scale-110",
                isActive ? "text-green-600 dark:text-emerald-400" : ""
              )} />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-150 dark:border-white/5 bg-gray-50/50 dark:bg-transparent">
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-all duration-300 cursor-pointer" 
          onClick={handleLogoutAction}
        >
          <LogOut className="h-4 w-4 shrink-0" /> 
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-[#070707] transition-colors duration-500">
      {/* Sidebar Panel */}
      <aside className="w-64 border-r border-gray-150 dark:border-white/5 bg-white dark:bg-gray-900/90 backdrop-blur-md hidden md:flex flex-col sticky top-0 h-screen z-20">
        <NavContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-xs md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <aside 
            className="w-72 h-full bg-white dark:bg-gray-900 border-r border-gray-150 dark:border-white/10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        <UserDashboardNavbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} /> 

        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children} 
          </div>
        </main>
      </div>
    </div>
  );
}