 import Sidebar from "@/components/dashboard/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-rose-50/30">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}