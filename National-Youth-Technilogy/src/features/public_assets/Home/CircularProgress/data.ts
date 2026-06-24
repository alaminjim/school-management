import { ImpactStat, NewsItem } from "./types";


export const newsData: NewsItem[] = [
  {
    id: 1,
    date: "26",
    monthYear: "JAN 2023",
    title: "Applications now open for ACTIMS Women in Trades Awards/Bursaries Program",
    description: "The ACTIMS Women in Trades Awards/Bursaries Program was created to recognize women who are members of the Canadian Building Trades...",
  },
  {
    id: 2,
    date: "18",
    monthYear: "JAN 2023",
    title: "LU2103 meeting on Jan. 20 is cancelled",
    description: "The regularly scheduled meeting this Thursday January 20 for members of LU2103 hosted in Calgary and Red Deer has been cancelled...",
  },
  {
    id: 3,
    date: "15",
    monthYear: "JAN 2023",
    title: "LU1325 member meeting for January cancelled",
    description: "Members, The LU1325 monthly member meeting scheduled for Wednesday, January 5 has been cancelled...",
  },
];

export const impactData: ImpactStat[] = [
  { value: 45, label: "CODING", color: "#00bcd4", subtitle: "ওয়েব ও অ্যাপ ডেভেলপমেন্টে দক্ষ শিক্ষার্থী", icon: "💻" },
  { value: 60, label: "SEO & ADS", color: "#4caf50", subtitle: "ডিজিটাল মার্কেটিং ও SEO বিশেষজ্ঞ", icon: "📈" },
  { value: 75, label: "BRANDING", color: "#00acc1", subtitle: "ব্র্যান্ড ডিজাইন ও ক্রিয়েটিভ আর্ট প্রফেশনাল", icon: "🎨" },
  { value: 80, label: "WEB DESIGN", color: "#43a047", subtitle: "UI/UX ডিজাইনে সফল গ্র্যাজুয়েট", icon: "🖥️" },
];