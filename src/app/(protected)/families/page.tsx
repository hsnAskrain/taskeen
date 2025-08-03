"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockFamilies, mockResidents, mockApartments, type Family } from "@/lib/mock-data";
import {
  Users,
  Search,
  Plus,
  Edit,
  Building2,
  User,
  Heart,
  Eye,
  UserPlus,
  Home,
  Calendar,
  Phone,
  MapPin,
} from "lucide-react";

export default function FamiliesPage() {
  const [families, setFamilies] = useState<Family[]>(mockFamilies);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter families
  const filteredFamilies = families.filter((family) => {
    const resident = mockResidents.find(r => r.id === family.residentId);
    const apartment = mockApartments.find(a => a.id === family.apartmentId);
    
    const matchesSearch = 
      resident?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment?.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.members.some(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "housed" && family.apartmentId) ||
      (statusFilter === "waiting" && !family.apartmentId);
    
    return matchesSearch && matchesStatus;
  });

  // Get resident info
  const getResidentInfo = (residentId: string) => {
    return mockResidents.find(r => r.id === residentId);
  };

  // Get apartment info
  const getApartmentInfo = (apartmentId: string) => {
    return mockApartments.find(a => a.id === apartmentId);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString() + " د.ع";
  };

  // Calculate statistics
  const stats = {
    totalFamilies: families.length,
    housedFamilies: families.filter(f => f.apartmentId).length,
    waitingFamilies: families.filter(f => !f.apartmentId).length,
    totalMembers: families.reduce((sum, f) => sum + f.totalMembers, 0),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            إدارة العوائل
          </h1>
          <p className="text-muted-foreground mt-1">
            عرض وإدارة العوائل وترتيبات السكن
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          تسجيل عائلة جديدة
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalFamilies}</p>
              <p className="text-sm text-muted-foreground">إجمالي العوائل</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.housedFamilies}</p>
              <p className="text-sm text-muted-foreground">لديهم سكن</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.waitingFamilies}</p>
              <p className="text-sm text-muted-foreground">في الانتظار</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalMembers}</p>
              <p className="text-sm text-muted-foreground">إجمالي الأفراد</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث باسم رب الأسرة أو رقم الشقة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground min-w-[150px]"
            >
              <option value="all">جميع العوائل</option>
              <option value="housed">لديهم سكن</option>
              <option value="waiting">في قائمة الانتظار</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Families Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFamilies.map((family) => {
          const resident = getResidentInfo(family.residentId);
          const apartment = family.apartmentId ? getApartmentInfo(family.apartmentId) : null;
          
          return (
            <Card key={family.id} className="hover:shadow-lg transition-all duration-200 border border-border">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">
                      عائلة {resident?.name || "غير محدد"}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{family.totalMembers} أفراد</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{resident?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {apartment ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                        لديهم سكن
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
                        في الانتظار
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Head of Family */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">رب الأسرة</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">{resident?.name}</p>
                      <p className="text-muted-foreground">{resident?.rank}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{resident?.department}</p>
                      <p className="text-muted-foreground">{resident?.numberOfChildren} أطفال</p>
                    </div>
                  </div>
                </div>

                {/* Housing Status */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">حالة السكن</span>
                  </div>
                  {apartment ? (
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {apartment.number} - {apartment.building}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {apartment.rooms} غرف • {apartment.area} م² • {formatCurrency(apartment.monthlyRent)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm">
                      <p className="text-orange-600 dark:text-orange-400">
                        في قائمة انتظار السكن
                      </p>
                      {family.specialNeeds && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {family.specialNeeds}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Family Members Count */}
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="font-medium text-foreground">أفراد العائلة</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{family.members.length}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 ml-1" />
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  {!apartment && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Building2 className="w-4 h-4 ml-1" />
                      تخصيص سكن
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredFamilies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              لا توجد عوائل تطابق البحث
            </h3>
            <p className="text-muted-foreground">
              حاول تغيير معايير البحث للعثور على العوائل المطلوبة
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}