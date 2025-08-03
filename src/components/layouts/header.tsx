"use client";

import React from "react";
import Link from "next/link";
import { useNavigation } from "@/context/navigation-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  User,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { breadcrumbs, pageTitle } = useNavigation();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    if (!mounted) return "";
    return date.toLocaleTimeString("ar-IQ", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    if (!mounted) return "";
    return date.toLocaleDateString("ar-IQ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header
      className={cn(
        "bg-card border-b border-border px-6 py-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumbs and Title */}
        <div className="flex-1">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-reverse space-x-1 text-sm text-muted-foreground mb-1">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
          
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
        </div>

        {/* Right side - Time, Notifications, Profile */}
        <div className="flex items-center space-x-reverse space-x-6">
          {/* Date and Time */}


          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-destructive-foreground rounded-full"></span>
            </span>
          </Button>

          {/* Profile Menu */}
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="hidden md:flex flex-col items-end text-sm">
              <span className="font-medium text-foreground">
                أحمد محمد العلوي
              </span>
              <span className="text-muted-foreground">مدير النظام</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}