
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden ">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#F5FAFF]" />
      <div className="pointer-events-none fixed -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-[#1E3A8A]/15 blur-3xl" />

      <DashboardSidebar />

      <div className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  );
}