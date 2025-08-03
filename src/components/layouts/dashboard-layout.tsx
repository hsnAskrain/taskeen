"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useNavigation } from "@/context/navigation-context";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed, isLoading } = useNavigation();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Content Area - With proper margin to account for fixed sidebar */}
        <div
          className={cn(
            "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "mr-16" : "mr-64"
          )}
        >
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center space-x-reverse space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="text-lg font-medium text-muted-foreground">
                    جاري التحميل...
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 lg:p-8">
                {children}
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-card border-t border-border px-6 py-4 mt-auto">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-reverse space-x-4">
                <span>© 2025 العتبة العسكرية المقدسة</span>
                <span>•</span>
                <span>نظام إدارة التسكين</span>
              </div>
            </div>
          </footer>
        </div>

        {/* Sidebar - Fixed Position on the right */}
        <div className="fixed inset-y-0 right-0 z-50">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}