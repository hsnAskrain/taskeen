"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/context/navigation-context";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import {
  Home,
  Building2,
  Users,
  UserCheck,
  FileText,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: Home,
    description: "الصفحة الرئيسية والإحصائيات",
  },
  {
    title: "الشقق السكنية",
    href: "/apartments",
    icon: Building2,
    description: "إدارة الشقق والوحدات السكنية",
  },
  {
    title: "المنتسبين",
    href: "/residents",
    icon: Users,
    description: "إدارة بيانات المنتسبين",
  },
  {
    title: "العوائل",
    href: "/families",
    icon: UserCheck,
    description: "إدارة العوائل والسكن",
  },
  {
    title: "التقارير",
    href: "/reports",
    icon: FileText,
    description: "التقارير والإحصائيات",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useNavigation();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-sidebar-foreground">
                العتبة العسكرية المقدسة
              </h2>
              <p className="text-xs text-sidebar-foreground/70 font-medium">
                نظام إدارة التسكين
              </p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-sm mx-auto">
            <Shield className="w-6 h-6 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "w-8 h-8 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors",
            sidebarCollapsed && "hidden"
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Expand Button for Collapsed Mode */}
      {sidebarCollapsed && (
        <div className="absolute top-4 -left-3 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarCollapsed(false)}
            className="w-6 h-6 bg-background border-border shadow-md hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive && "text-sidebar-primary-foreground"
                )} />
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm leading-tight">{item.title}</div>
                    <div className="text-xs opacity-75 truncate mt-0.5">
                      {item.description}
                    </div>
                  </div>
                )}
                
                {/* Enhanced Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute right-full mr-2 bg-card border border-border px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 shadow-lg z-50">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size={sidebarCollapsed ? "icon" : "default"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent rounded-xl transition-all duration-200",
            sidebarCollapsed ? "h-10" : "justify-start gap-3 py-2.5",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
          {!sidebarCollapsed && (
            <span className="font-medium">{theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}</span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size={sidebarCollapsed ? "icon" : "default"}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent rounded-xl transition-all duration-200",
            sidebarCollapsed ? "h-10" : "justify-start gap-3 py-2.5",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
          {!sidebarCollapsed && <span className="font-medium">الإعدادات</span>}
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size={sidebarCollapsed ? "icon" : "default"}
          onClick={handleLogout}
          className={cn(
            "w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200",
            sidebarCollapsed ? "h-10" : "justify-start gap-3 py-2.5",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!sidebarCollapsed && <span className="font-medium">تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  );
}