"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStats, mockApartments, mockResidents } from "@/lib/mock-data";
import {
  Building2,
  Users,
  UserCheck,
  Home,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = getStats();

  const recentActivity = [
    {
      id: 1,
      type: "apartment_assignment",
      title: "تم تخصيص شقة جديدة",
      description: "الشقة A-102 تم تخصيصها للمنتسب علي حسن جواد",
      time: "منذ ساعتين",
      icon: Building2,
      status: "success",
    },
    {
      id: 2,
      type: "maintenance",
      title: "طلب صيانة جديد",
      description: "طلب صيانة للشقة B-101 - مشكلة في السباكة",
      time: "منذ 4 ساعات",
      icon: AlertTriangle,
      status: "warning",
    },
    {
      id: 3,
      type: "new_resident",
      title: "منتسب جديد",
      description: "تم إضافة منتسب جديد: محمد جعفر عبد الحسين",
      time: "أمس",
      icon: Users,
      status: "info",
    },
    {
      id: 4,
      type: "report",
      title: "تقرير شهري",
      description: "تم إنشاء التقرير الشهري لشهر فبراير 2024",
      time: "منذ يومين",
      icon: FileText,
      status: "info",
    },
    {
      id: 5,
      type: "payment",
      title: "دفعة إيجار جديدة",
      description: "تم استلام دفعة إيجار من الشقة A-201",
      time: "منذ 3 ساعات",
      icon: DollarSign,
      status: "success",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: "مراجعة طلبات السكن الجديدة",
      count: 5,
      priority: "high",
      dueDate: "اليوم",
      category: "housing",
    },
    {
      id: 2,
      title: "متابعة أعمال الصيانة",
      count: 3,
      priority: "medium",
      dueDate: "غداً",
      category: "maintenance",
    },
    {
      id: 3,
      title: "تحديث بيانات المنتسبين",
      count: 8,
      priority: "low",
      dueDate: "هذا الأسبوع",
      category: "residents",
    },
    {
      id: 4,
      title: "إعداد التقارير الأسبوعية",
      count: 2,
      priority: "medium",
      dueDate: "غداً",
      category: "reports",
    },
    {
      id: 5,
      title: "فحص أنظمة الأمان",
      count: 1,
      priority: "high",
      dueDate: "اليوم",
      category: "security",
    },
  ];

  // Enhanced statistics
  const enhancedStats = {
    ...stats,
    monthlyRevenue: 12500000,
    pendingApplications: 12,
    maintenanceRequests: 7,
    occupancyTrend: 5.2,
    revenueGrowth: 8.5,
  };

  return (
    <div className="space-y-8">

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Apartments */}
        <Card className="stats-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">إجمالي الشقق</CardTitle>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">{enhancedStats.totalApartments}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                نسبة الإشغال: %{enhancedStats.occupancyRate}
              </span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                مشغولة: {enhancedStats.occupiedApartments}
              </Badge>
              <Badge variant="secondary">
                فارغة: {enhancedStats.vacantApartments}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Residents */}
        <Card className="success-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">إجمالي المنتسبين</CardTitle>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">{enhancedStats.totalResidents}</div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+{enhancedStats.occupancyTrend}% هذا الشهر</span>
            </div>
            <div className="text-sm text-muted-foreground">
              متزوجين: {enhancedStats.marriedResidents} | عازبين: {enhancedStats.totalResidents - enhancedStats.marriedResidents}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="warning-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">الإيرادات الشهرية</CardTitle>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">
              {enhancedStats.monthlyRevenue.toLocaleString('en-US')} د.ع
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+{enhancedStats.revenueGrowth}% من الشهر الماضي</span>
            </div>
            <div className="text-sm text-muted-foreground">
              متوسط الإيجار: {enhancedStats.averageRent.toLocaleString('en-US')} د.ع
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="info-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">المهام المعلقة</CardTitle>
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">{pendingTasks.length}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-600">
                {pendingTasks.filter(t => t.priority === 'high').length} مهمة عاجلة
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              طلبات السكن: {enhancedStats.pendingApplications} | صيانة: {enhancedStats.maintenanceRequests}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activity */}
        <Card className="lg:col-span-2 glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">النشاطات الأخيرة</CardTitle>
                  <CardDescription>آخر التحديثات والعمليات في النظام</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                عرض الكل
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'success': return 'bg-green-100 dark:bg-green-900/20 text-green-600';
                    case 'warning': return 'bg-amber-100 dark:bg-amber-900/20 text-amber-600';
                    case 'info': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600';
                    default: return 'bg-muted/50 text-muted-foreground';
                  }
                };
                
                return (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(activity.status)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" className="w-full gap-2">
                عرض جميع النشاطات
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Pending Tasks */}
        <Card className="glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-xl">المهام المعلقة</CardTitle>
                <CardDescription>المهام التي تحتاج إلى متابعة</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => {
                const getPriorityColor = (priority: string) => {
                  switch (priority) {
                    case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
                    case 'medium': return 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20';
                    case 'low': return 'border-border bg-muted/30';
                    default: return 'border-border bg-muted/30';
                  }
                };

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border-l-4 ${getPriorityColor(task.priority)} transition-all hover:shadow-sm`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="font-semibold text-sm leading-tight">{task.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {task.count}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority === "high"
                            ? "عالية"
                            : task.priority === "medium"
                            ? "متوسطة"
                            : "منخفضة"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          موعد الإنجاز: {task.dueDate}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        التصنيف: {task.category}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full gap-2">
                إدارة جميع المهام
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}