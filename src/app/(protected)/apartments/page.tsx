"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockApartments, mockResidents, type Apartment } from "@/lib/mock-data";
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Home,
  Users,
  Calendar,
  MapPin,
  Settings,
  Eye,
  AlertTriangle,
} from "lucide-react";

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>(mockApartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [buildingFilter, setBuildingFilter] = useState<string>("all");
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // CRUD Operations
  const handleViewApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    // Here you would typically open a modal or navigate to a detail page
    alert(`عرض تفاصيل الشقة: ${apartment.number}\nالمبنى: ${apartment.building}\nالحالة: ${apartment.status}`);
  };

  const handleEditApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    // Here you would typically open an edit modal or navigate to an edit page
    alert(`تعديل الشقة: ${apartment.number}\nهذه الوظيفة ستفتح نموذج التعديل قريباً`);
  };

  const handleDeleteApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedApartment) {
      setApartments(prev => prev.filter(apt => apt.id !== selectedApartment.id));
      setShowDeleteDialog(false);
      setSelectedApartment(null);
      // Show success message
      alert(`تم حذف الشقة ${selectedApartment.number} بنجاح`);
    }
  };

  const handleAddApartment = () => {
    // Here you would typically open an add modal or navigate to an add page
    alert("إضافة شقة جديدة\nهذه الوظيفة ستفتح نموذج الإضافة قريباً");
  };

  const handleExportData = () => {
    // Simple export functionality
    const dataStr = JSON.stringify(apartments, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'apartments-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter apartments based on search and filters
  const filteredApartments = apartments.filter((apartment) => {
    const matchesSearch = 
      apartment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apartment.building.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || apartment.status === statusFilter;
    const matchesBuilding = buildingFilter === "all" || apartment.building === buildingFilter;
    
    return matchesSearch && matchesStatus && matchesBuilding;
  });

  // Get unique buildings for filter
  const buildings = Array.from(new Set(apartments.map(apt => apt.building)));

  // Get resident name by ID
  const getResidentName = (residentId?: string) => {
    if (!residentId) return null;
    const resident = mockResidents.find(r => r.id === residentId);
    return resident?.name;
  };

  // Status styling
  const getStatusBadge = (status: Apartment["status"]) => {
    switch (status) {
      case "occupied":
        return <Badge variant="success">مشغولة</Badge>;
      case "vacant":
        return <Badge variant="secondary">فارغة</Badge>;
      case "maintenance":
        return <Badge variant="warning">صيانة</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };


  return (
    <div className="space-y-8">
     

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="stats-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">{apartments.length}</p>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الشقق</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">جميع الوحدات</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="success-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {apartments.filter(apt => apt.status === "occupied").length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">شقق مشغولة</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">
                    %{Math.round((apartments.filter(apt => apt.status === "occupied").length / apartments.length) * 100)}
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="warning-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {apartments.filter(apt => apt.status === "vacant").length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">شقق فارغة</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-xs text-amber-600">متاحة للسكن</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center">
                <Home className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="info-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {apartments.filter(apt => apt.status === "maintenance").length}
                </p>
                <p className="text-sm font-medium text-muted-foreground">قيد الصيانة</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-red-600">تحت الإصلاح</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center">
                <Settings className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="glass-effect">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">البحث والفلترة</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Enhanced Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث برقم الشقة أو المبنى..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 h-11"
                />
              </div>
              
              {/* Enhanced Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="occupied">مشغولة</option>
                <option value="vacant">فارغة</option>
                <option value="maintenance">صيانة</option>
              </select>
              
              {/* Enhanced Building Filter */}
              <select
                value={buildingFilter}
                onChange={(e) => setBuildingFilter(e.target.value)}
                className="px-4 py-3 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">جميع المباني</option>
                {buildings.map(building => (
                  <option key={building} value={building}>{building}</option>
                ))}
              </select>
              
              <Button variant="outline" className="gap-2 h-11">
                <Filter className="w-4 h-4" />
                فلاتر متقدمة
              </Button>
            </div>
            
            {/* Filter Summary */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>عرض {filteredApartments.length} من {apartments.length} شقة</span>
              {(searchTerm || statusFilter !== 'all' || buildingFilter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setBuildingFilter('all');
                  }}
                  className="h-auto p-0 text-primary hover:text-primary/80"
                >
                  مسح الفلاتر
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApartments.map((apartment) => {
          const getStatusStyle = (status: string) => {
            switch (status) {
              case 'occupied': return 'border-green-300 bg-gradient-to-br from-green-50 via-green-50 to-green-100 dark:border-green-700 dark:bg-gradient-to-br dark:from-green-900/30 dark:to-green-800/20 text-green-900 dark:text-green-100';
              case 'vacant': return 'border-amber-300 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 dark:border-amber-700 dark:bg-gradient-to-br dark:from-amber-900/30 dark:to-amber-800/20 text-amber-900 dark:text-amber-100';
              case 'maintenance': return 'border-red-300 bg-gradient-to-br from-red-50 via-red-50 to-red-100 dark:border-red-700 dark:bg-gradient-to-br dark:from-red-900/30 dark:to-red-800/20 text-red-900 dark:text-red-100';
              default: return 'border-slate-300 bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800/30 dark:to-slate-700/20 text-slate-900 dark:text-slate-100';
            }
          };

          return (
            <Card key={apartment.id} className={`glass-effect hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 ${getStatusStyle(apartment.status)}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                      {apartment.number}
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base text-foreground/80 font-medium">
                      <MapPin className="w-4 h-4" />
                      {apartment.building} - الطابق {apartment.floor}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(apartment.status)}
                    <p className="text-xs text-foreground/70 font-medium mt-1">
                      {apartment.status === 'occupied' ? 'مشغولة' : 
                       apartment.status === 'vacant' ? 'متاحة' : 'تحت الصيانة'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Enhanced Apartment Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/70 dark:bg-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800/60 rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{apartment.rooms}</p>
                      <p className="text-xs text-foreground/70 font-medium">غرف</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50/70 dark:bg-green-900/30 rounded-lg border border-green-200/50 dark:border-green-700/50">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800/60 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{apartment.area}</p>
                      <p className="text-xs text-foreground/70 font-medium">م²</p>
                    </div>
                  </div>
                </div>

                {/* Maintenance Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-700/40 rounded-lg border border-slate-200/50 dark:border-slate-600/50">
                    <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>آخر صيانة: {new Date(apartment.lastMaintenanceDate).toLocaleDateString("ar-IQ")}</span>
                  </div>
                </div>
                
                {/* Enhanced Resident Info */}
                {apartment.status === "occupied" && apartment.residentId && (
                  <div className="p-4 bg-gradient-to-r from-green-50 via-green-50 to-emerald-50 dark:from-green-900/30 dark:via-green-800/30 dark:to-emerald-900/30 rounded-xl border-2 border-green-300/60 dark:border-green-600/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-800/60 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <p className="font-bold text-green-900 dark:text-green-100">
                          {getResidentName(apartment.residentId)}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-200 font-medium">
                          ساكن منذ: {apartment.occupiedSince ? new Date(apartment.occupiedSince).toLocaleDateString("ar-IQ") : "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Enhanced Amenities */}
                <div className="space-y-2">
                  <p className="text-sm font-bold flex items-center gap-2 text-foreground">
                    <Settings className="w-4 h-4 text-primary" />
                    المرافق والخدمات:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {apartment.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20 font-medium">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handleViewApartment(apartment)}
                  >
                    <Eye className="w-4 h-4" />
                    عرض التفاصيل
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => handleEditApartment(apartment)}
                  >
                    <Edit className="w-4 h-4" />
                    تعديل
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteApartment(apartment)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced No Results */}
      {filteredApartments.length === 0 && (
        <Card className="glass-effect">
          <CardContent className="text-center py-16">
            <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              لا توجد شقق تطابق البحث
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              حاول تغيير معايير البحث أو الفلاتر للعثور على الشقق التي تبحث عنها
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setBuildingFilter('all');
                }}
                className="gap-2"
              >
                مسح جميع الفلاتر
              </Button>
              <Button className="gap-2 gradient-bg" onClick={handleAddApartment}>
                <Plus className="w-4 h-4" />
                إضافة شقة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedApartment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">تأكيد الحذف</h3>
                  <p className="text-sm text-muted-foreground">هذا الإجراء لا يمكن التراجع عنه</p>
                </div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm">
                  هل أنت متأكد من حذف الشقة <strong>{selectedApartment.number}</strong> 
                  في {selectedApartment.building}؟
                </p>
                {selectedApartment.status === 'occupied' && (
                  <p className="text-xs text-red-600 mt-2">
                    تحذير: هذه الشقة مشغولة حالياً
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setSelectedApartment(null);
                  }}
                >
                  إلغاء
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={confirmDelete}
                >
                  حذف
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}