"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStats, mockApartments, mockResidents, mockFamilies } from "@/lib/mock-data";
import { exportToCSV, exportToPDF } from "@/lib/utils";
import {
  FileText,
  Download,
  Building2,
  Users,
  PieChart,
  TrendingUp,
  Eye,
  FileSpreadsheet,
  CheckCircle,
  BarChart3,
  Calendar,
} from "lucide-react";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-12-31",
  });
  const [reportFormat, setReportFormat] = useState<"pdf" | "excel" | "csv">("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const stats = getStats();

  const reportTypes = [
    {
      id: "apartments-summary",
      title: "تقرير الشقق السكنية",
      description: "إحصائيات شاملة عن الوحدات السكنية وحالة الإشغال",
      icon: Building2,
      color: "blue",
      data: {
        total: stats.totalApartments,
        occupied: stats.occupiedApartments,
        vacant: stats.vacantApartments,
        rate: `${stats.occupancyRate}%`,
      },
    },
    {
      id: "residents-summary",
      title: "تقرير المنتسبين",
      description: "بيانات تفصيلية عن المنتسبين وأوضاعهم السكنية",
      icon: Users,
      color: "green",
      data: {
        total: stats.totalResidents,
        married: stats.marriedResidents,
        withHousing: mockResidents.filter(r => r.apartmentId).length,
      },
    },
    {
      id: "occupancy-analysis",
      title: "تحليل الإشغال",
      description: "معدلات الإشغال والاستخدام الأمثل للوحدات",
      icon: PieChart,
      color: "orange",
      data: {
        rate: `${stats.occupancyRate}%`,
        efficiency: `${Math.round((stats.occupiedApartments / stats.totalApartments) * 100)}%`,
        utilization: "عالية",
      },
    },
  ];

  const recentReports = [
    {
      id: 1,
      name: "تقرير شهري - فبراير 2024",
      type: "apartments-summary",
      generatedAt: "2024-03-01T10:30:00",
      generatedBy: "أحمد محمد العلوي",
      format: "PDF",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "قائمة المنتسبين المحدثة",
      type: "residents-summary",
      generatedAt: "2024-02-28T14:15:00",
      generatedBy: "فاطمة حسن الكاظمي",
      format: "Excel",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "تحليل الإشغال Q1 2024",
      type: "occupancy-analysis",
      generatedAt: "2024-02-25T09:00:00",
      generatedBy: "علي حسن الموسوي",
      format: "PDF",
      size: "3.1 MB",
    },
  ];

  const handleGenerateReport = async () => {
    if (!selectedReport) {
      alert("يرجى اختيار نوع التقرير");
      return;
    }

    setIsGenerating(true);

    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock export based on format
    if (reportFormat === "csv") {
      const report = reportTypes.find(r => r.id === selectedReport);
      const data = [{
        التقرير: report?.title || "",
        التاريخ: new Date().toLocaleDateString("ar-IQ"),
        البيانات: JSON.stringify(report?.data || {}),
      }];
      exportToCSV(data, `housing-report-${selectedReport}-${new Date().getTime()}`);
    } else if (reportFormat === "pdf") {
      window.print();
    } else {
      alert(`تم إنشاء التقرير بصيغة ${reportFormat.toUpperCase()}`);
    }

    setIsGenerating(false);
  };


  const formatNumber = (num: number) => {
    if (!mounted) return "---";
    return num.toLocaleString();
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            التقارير والإحصائيات
          </h1>
          <p className="text-muted-foreground mt-1">
            إنشاء وتصدير التقارير الإدارية
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          تقارير مجدولة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Generation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <Card className="enhanced-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                إنشاء تقرير جديد
              </CardTitle>
              <CardDescription>
                اختر نوع التقرير المطلوب
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  const isSelected = selectedReport === report.id;
                  
                  return (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        isSelected 
                          ? "border-primary bg-accent shadow-md" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(report.color)}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {Object.entries(report.data).slice(0, 2).map(([key, value]) => (
                              <Badge key={key} variant="secondary" className="text-xs">
                                {typeof value === "number" ? formatNumber(value) : value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Report Configuration */}
          {selectedReport && (
            <Card className="enhanced-card border-0 shadow-xl">
              <CardHeader>
                <CardTitle>إعدادات التقرير</CardTitle>
                <CardDescription>
                  حدد النطاق الزمني وصيغة التصدير
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">النطاق الزمني</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">من تاريخ</label>
                      <Input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">إلى تاريخ</label>
                      <Input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">صيغة التصدير</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "pdf", label: "PDF", icon: FileText, description: "ملف PDF" },
                      { value: "excel", label: "Excel", icon: FileSpreadsheet, description: "جدول بيانات" },
                      { value: "csv", label: "CSV", icon: Download, description: "ملف نصي" },
                    ].map(({ value, label, icon: Icon, description }) => (
                      <button
                        key={value}
                        onClick={() => setReportFormat(value as any)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                          reportFormat === value
                            ? "border-primary bg-accent text-primary"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <div className="text-center">
                          <span className="font-medium block">{label}</span>
                          <span className="text-xs text-muted-foreground">{description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating || !selectedReport}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري إنشاء التقرير...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>إنشاء وتنزيل التقرير</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Reports Sidebar */}
        <div>
          <Card className="enhanced-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                التقارير الأخيرة
              </CardTitle>
              <CardDescription>
                التقارير المنشأة مؤخراً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground leading-tight">{report.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(report.generatedAt).toLocaleDateString("ar-IQ")}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{report.size}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                عرض جميع التقارير
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}