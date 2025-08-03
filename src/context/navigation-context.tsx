"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface NavigationContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Auto-generate breadcrumbs based on current path
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const autoBreadcrumbs: BreadcrumbItem[] = [];

    // Route mappings for Arabic labels
    const routeLabels: Record<string, string> = {
      "dashboard": "لوحة التحكم",
      "apartments": "الشقق السكنية",
      "residents": "المنتسبين",
      "families": "العوائل",
      "reports": "التقارير",
      "login": "تسجيل الدخول",
    };

    // Add home breadcrumb
    if (pathSegments.length > 0 && !pathname.includes("login")) {
      autoBreadcrumbs.push({
        label: "الرئيسية",
        href: "/dashboard",
      });
    }

    // Add path segments
    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = routeLabels[segment] || segment;
      
      autoBreadcrumbs.push({
        label,
        href: index === pathSegments.length - 1 ? undefined : href,
      });
    });

    setBreadcrumbs(autoBreadcrumbs);

    // Set page title
    if (pathSegments.length > 0) {
      const currentSegment = pathSegments[pathSegments.length - 1];
      setPageTitle(routeLabels[currentSegment] || currentSegment);
    } else {
      setPageTitle("لوحة التحكم");
    }
  }, [pathname]);

  const value = {
    breadcrumbs,
    setBreadcrumbs,
    pageTitle,
    setPageTitle,
    isLoading,
    setIsLoading,
    sidebarCollapsed,
    setSidebarCollapsed,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}