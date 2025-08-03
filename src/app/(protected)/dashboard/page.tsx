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
  PieChart,
  BarChart3,
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
      title: "تحديث ملف منتسب",
      description: "تم تحديث ملف منتسب: علي حسن جواد الكاظمي",
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
      type: "family",
      title: "عائلة جديدة مسجلة",
      description: "تم تسجيل عائلة جديدة في النظام - 4 أفراد",
      time: "منذ 3 ساعات",
      icon: Users,
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
    pendingApplications: 12,
    maintenanceRequests: 7,
    occupancyTrend: 5.2,
    revenueGrowth: 8.5,
  };

  // Chart data
  const apartmentData = [
    { name: ' مشغولة', value: enhancedStats.occupiedApartments, color: '#22c55e' },
    { name: ' فارغة', value: enhancedStats.vacantApartments, color: '#f59e0b' },
    { name: ' صيانة', value: enhancedStats.maintenanceApartments, color: '#ef4444' },
  ];

  const familyStatsData = [
    { name: 'العائلات', value: enhancedStats.totalFamilies, fill: '#3b82f6' },
    { name: 'المنتسبين', value: enhancedStats.totalResidents, fill: '#22c55e' },
    { name: 'أفراد العائلات', value: enhancedStats.totalFamilyMembers, fill: '#f59e0b' },
    { name: 'المهام المعلقة', value: pendingTasks.length, fill: '#06b6d4' },
  ];

  return (
    <div className="space-y-8">

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Apartments */}
        <Card className="stats-card hover:shadow-xl transition-all duration-300 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">{enhancedStats.totalApartments}</div>
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400">إجمالي الشقق</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground/80">
                  {enhancedStats.occupancyRate}% نسبة الإشغال
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Residents */}
        <Card className="success-card hover:shadow-xl transition-all duration-300 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">{enhancedStats.totalResidents}</div>
                    <p className="text-base font-semibold text-green-600 dark:text-green-400">إجمالي المنتسبين</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground/80">
                  {enhancedStats.marriedResidents} متزوج
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Management */}
        <Card className="warning-card hover:shadow-xl transition-all duration-300 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">{enhancedStats.totalFamilies}</div>
                    <p className="text-base font-semibold text-amber-600 dark:text-amber-400">إجمالي العائلات</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground/80">
                  {enhancedStats.totalFamilyMembers} عضو
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="info-card hover:shadow-xl transition-all duration-300 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">{pendingTasks.length}</div>
                    <p className="text-base font-semibold text-cyan-600 dark:text-cyan-400">المهام المعلقة</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-foreground/80">
                  {pendingTasks.filter(t => t.priority === 'high').length} عاجلة
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Apartment Occupancy Chart */}
        <Card className="enhanced-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <PieChart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">توزيع الشقق السكنية</CardTitle>
                <CardDescription>نسب الإشغال والحالات</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={apartmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {apartmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {apartmentData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Family & Residents Stats Chart */}
        <Card className="enhanced-card border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">إحصائيات النظام</CardTitle>
                <CardDescription>المنتسبين والعائلات والمهام</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={familyStatsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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