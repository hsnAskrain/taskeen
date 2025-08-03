import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}