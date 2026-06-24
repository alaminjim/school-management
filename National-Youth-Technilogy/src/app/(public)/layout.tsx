import { Footer } from "@/components/shared/footer";
import { ClientNavbar } from "@/components/shared/client-navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientNavbar />

      {/* pt-[56px] accounts for the fixed navbar height */}
      <main className="flex-1 flex flex-col relative overflow-x-hidden pt-[56px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}