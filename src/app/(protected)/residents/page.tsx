"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockResidents, mockApartments, type Resident } from "@/lib/mock-data";
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Building2,
  Calendar,
  User,
  Heart,
  Baby,
  DollarSign,
  Eye,
  UserPlus,
  Download,
} from "lucide-react";

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>(mockResidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Filter residents
  const filteredResidents = residents.filter((resident) => {
    const matchesSearch = 
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.rank.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "with-housing" && resident.apartmentId) ||
      (statusFilter === "without-housing" && !resident.apartmentId) ||
      (statusFilter === "married" && resident.maritalStatus === "married");
    
    const matchesDepartment = departmentFilter === "all" || resident.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get unique departments
  const departments = Array.from(new Set(residents.map(r => r.department)));

  // Get apartment info
  const getApartmentInfo = (apartmentId?: string) => {
    if (!apartmentId) return null;
    return mockApartments.find(apt => apt.id === apartmentId);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString() + " د.ع";
  };

  // Get marital status badge
  const getMaritalStatusBadge = (status: Resident["maritalStatus"]) => {
    switch (status) {
      case "married":
        return <Badge variant="success">متزوج</Badge>;
      case "single":
        return <Badge variant="secondary">أعزب</Badge>;
      case "divorced":
        return <Badge variant="warning">مطلق</Badge>;
      case "widowed":
        return <Badge variant="outline">أرمل</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            إدارة المنتسبين
          </h1>
          <p className="text-muted-foreground mt-2">
            عرض وإدارة بيانات جميع المنتسبين في العتبة
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة منتسب جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{residents.length}</p>
                <p className="text-sm text-muted-foreground">إجمالي المنتسبين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-600" />
              <div>
                <p className="text-2xl font-bold">
                  {residents.filter(r => r.maritalStatus === "married").length}
                </p>
                <p className="text-sm text-muted-foreground">متزوجين</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {residents.filter(r => r.apartmentId).length}
                </p>
                <p className="text-sm text-muted-foreground">لديهم سكن</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Baby className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {residents.reduce((sum, r) => sum + r.numberOfChildren, 0)}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الأطفال</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(residents.reduce((sum, r) => sum + r.salary, 0) / residents.length / 1000)}K
                </p>
                <p className="text-sm text-muted-foreground">متوسط الراتب</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث بالاسم، رقم الموظف، أو الرتبة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">جميع الحالات</option>
              <option value="married">متزوجين فقط</option>
              <option value="with-housing">لديهم سكن</option>
              <option value="without-housing">بدون سكن</option>
            </select>
            
            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">جميع الأقسام</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            {/* View Mode Toggle */}
            <div className="flex border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  viewMode === "table" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                جدول
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-r border-border ${
                  viewMode === "cards" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                كروت
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === "table" ? (
        /* Table View */
        <Card>
          <CardHeader>
            <CardTitle>قائمة المنتسبين</CardTitle>
            <CardDescription>
              عرض جدولي لجميع المنتسبين مع التفاصيل الأساسية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3 font-medium">الاسم والرتبة</th>
                    <th className="text-right p-3 font-medium">القسم</th>
                    <th className="text-right p-3 font-medium">الحالة الاجتماعية</th>
                    <th className="text-right p-3 font-medium">السكن</th>
                    <th className="text-right p-3 font-medium">معلومات الاتصال</th>
                    <th className="text-right p-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResidents.map((resident) => {
                    const apartment = getApartmentInfo(resident.apartmentId);
                    return (
                      <tr key={resident.id} className="border-b hover:bg-muted">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{resident.name}</p>
                            <p className="text-sm text-muted-foreground">{resident.rank} - {resident.employeeId}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{resident.department}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {getMaritalStatusBadge(resident.maritalStatus)}
                            {resident.numberOfChildren > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {resident.numberOfChildren} أطفال
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          {apartment ? (
                            <div>
                              <p className="font-medium">{apartment.number}</p>
                              <p className="text-sm text-muted-foreground">{apartment.building}</p>
                            </div>
                          ) : (
                            <Badge variant="warning">بدون سكن</Badge>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{resident.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span className="text-xs text-muted-foreground">{resident.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            {!resident.apartmentId && (
                              <Button variant="outline" size="sm" className="text-green-600">
                                <Building2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResidents.map((resident) => {
            const apartment = getApartmentInfo(resident.apartmentId);
            return (
              <Card key={resident.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resident.name}</CardTitle>
                      <CardDescription>{resident.rank} - {resident.employeeId}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getMaritalStatusBadge(resident.maritalStatus)}
                      <Badge variant="outline" className="text-xs">{resident.department}</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{resident.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">{resident.email}</span>
                    </div>
                  </div>
                  
                  {/* Family Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-muted-foreground" />
                      <span>{resident.numberOfChildren} أطفال</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{formatCurrency(resident.salary)}</span>
                    </div>
                  </div>
                  
                  {/* Housing Info */}
                  <div className="p-3 bg-muted rounded-lg">
                    {apartment ? (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800 dark:text-green-200">
                            {apartment.number}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{apartment.building}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-800 dark:text-orange-200">
                          في قائمة انتظار السكن
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Emergency Contact */}
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium">الاتصال الطارئ:</p>
                    <p>{resident.emergencyContact.name} ({resident.emergencyContact.relationship})</p>
                    <p>{resident.emergencyContact.phone}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 ml-1" />
                      تعديل
                    </Button>
                    {!resident.apartmentId && resident.maritalStatus === "married" && (
                      <Button variant="outline" size="sm" className="text-green-600">
                        <Building2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {filteredResidents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              لا يوجد منتسبين يطابقون البحث
            </h3>
            <p className="text-muted-foreground">
              حاول تغيير معايير البحث أو الفلاتر
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}