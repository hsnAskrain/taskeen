export interface Apartment {
  id: string;
  number: string;
  building: string;
  floor: number;
  rooms: number;
  area: number; // in square meters
  status: "occupied" | "vacant" | "maintenance";
  monthlyRent: number;
  amenities: string[];
  lastMaintenanceDate: string;
  occupiedSince?: string;
  residentId?: string;
}

export interface Resident {
  id: string;
  employeeId: string;
  name: string;
  rank: string;
  department: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  dateOfBirth: string;
  maritalStatus: "married" | "single" | "divorced" | "widowed";
  numberOfChildren: number;
  apartmentId?: string;
  joinDate: string;
  salary: number;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Family {
  id: string;
  residentId: string;
  apartmentId: string;
  members: FamilyMember[];
  totalMembers: number;
  monthlyIncome: number;
  specialNeeds?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: "spouse" | "child" | "parent" | "other";
  age: number;
  occupation?: string;
  education?: string;
  healthConditions?: string[];
}

// Mock Apartments Data
export const mockApartments: Apartment[] = [
  {
    id: "apt-001",
    number: "A-101",
    building: "المبنى الأول",
    floor: 1,
    rooms: 3,
    area: 120,
    status: "occupied",
    monthlyRent: 250000,
    amenities: ["مكيف", "سخان مياه", "مطبخ مجهز", "انترنت"],
    lastMaintenanceDate: "2024-01-15",
    occupiedSince: "2023-03-10",
    residentId: "res-001",
  },
  {
    id: "apt-002",
    number: "A-102",
    building: "المبنى الأول",
    floor: 1,
    rooms: 2,
    area: 90,
    status: "vacant",
    monthlyRent: 200000,
    amenities: ["مكيف", "سخان مياه", "انترنت"],
    lastMaintenanceDate: "2024-02-01",
  },
  {
    id: "apt-003",
    number: "A-201",
    building: "المبنى الأول",
    floor: 2,
    rooms: 4,
    area: 150,
    status: "occupied",
    monthlyRent: 350000,
    amenities: ["مكيف", "سخان مياه", "مطبخ مجهز", "انترنت", "شرفة"],
    lastMaintenanceDate: "2023-12-20",
    occupiedSince: "2023-08-15",
    residentId: "res-002",
  },
  {
    id: "apt-004",
    number: "B-101",
    building: "المبنى الثاني",
    floor: 1,
    rooms: 3,
    area: 130,
    status: "maintenance",
    monthlyRent: 280000,
    amenities: ["مكيف", "سخان مياه", "مطبخ مجهز", "انترنت"],
    lastMaintenanceDate: "2024-02-20",
  },
  {
    id: "apt-005",
    number: "B-102",
    building: "المبنى الثاني",
    floor: 1,
    rooms: 2,
    area: 85,
    status: "occupied",
    monthlyRent: 190000,
    amenities: ["مكيف", "سخان مياه"],
    lastMaintenanceDate: "2024-01-10",
    occupiedSince: "2023-11-01",
    residentId: "res-003",
  },
  {
    id: "apt-006",
    number: "B-201",
    building: "المبنى الثاني",
    floor: 2,
    rooms: 3,
    area: 125,
    status: "vacant",
    monthlyRent: 270000,
    amenities: ["مكيف", "سخان مياه", "مطبخ مجهز", "انترنت", "شرفة"],
    lastMaintenanceDate: "2024-02-05",
  },
];

// Mock Residents Data
export const mockResidents: Resident[] = [
  {
    id: "res-001",
    employeeId: "EMP-2021-001",
    name: "أحمد محمد علي الحسيني",
    rank: "رائد",
    department: "الأمن والحماية",
    phoneNumber: "+964-770-123-4567",
    email: "ahmed.hussaini@shrine.gov.iq",
    nationalId: "19850312-123456",
    dateOfBirth: "1985-03-12",
    maritalStatus: "married",
    numberOfChildren: 2,
    apartmentId: "apt-001",
    joinDate: "2021-05-15",
    salary: 1200000,
    emergencyContact: {
      name: "فاطمة حسن الحسيني",
      relationship: "زوجة",
      phone: "+964-771-234-5678",
    },
  },
  {
    id: "res-002",
    employeeId: "EMP-2020-045",
    name: "علي حسن جواد الكاظمي",
    rank: "مقدم",
    department: "الإدارة والتنظيم",
    phoneNumber: "+964-772-345-6789",
    email: "ali.kadhimi@shrine.gov.iq",
    nationalId: "19800718-789123",
    dateOfBirth: "1980-07-18",
    maritalStatus: "married",
    numberOfChildren: 3,
    apartmentId: "apt-003",
    joinDate: "2020-09-10",
    salary: 1350000,
    emergencyContact: {
      name: "زينب محمد الكاظمي",
      relationship: "زوجة",
      phone: "+964-773-456-7890",
    },
  },
  {
    id: "res-003",
    employeeId: "EMP-2022-067",
    name: "حسين علي محمد الصدر",
    rank: "نقيب",
    department: "الخدمات اللوجستية",
    phoneNumber: "+964-774-567-8901",
    email: "hussain.sadr@shrine.gov.iq",
    nationalId: "19901205-456789",
    dateOfBirth: "1990-12-05",
    maritalStatus: "married",
    numberOfChildren: 1,
    apartmentId: "apt-005",
    joinDate: "2022-03-20",
    salary: 950000,
    emergencyContact: {
      name: "مريم أحمد الصدر",
      relationship: "زوجة",
      phone: "+964-775-678-9012",
    },
  },
  {
    id: "res-004",
    employeeId: "EMP-2023-089",
    name: "محمد جعفر عبد الحسين",
    rank: "ملازم أول",
    department: "الأمن والحماية",
    phoneNumber: "+964-776-789-0123",
    email: "mohammed.jaafar@shrine.gov.iq",
    nationalId: "19920815-321654",
    dateOfBirth: "1992-08-15",
    maritalStatus: "single",
    numberOfChildren: 0,
    joinDate: "2023-01-12",
    salary: 800000,
    emergencyContact: {
      name: "جعفر عبد الحسين",
      relationship: "والد",
      phone: "+964-777-890-1234",
    },
  },
  {
    id: "res-005",
    employeeId: "EMP-2021-034",
    name: "عباس كريم حسين العلوي",
    rank: "نقيب",
    department: "الشؤون الدينية",
    phoneNumber: "+964-778-901-2345",
    email: "abbas.alawi@shrine.gov.iq",
    nationalId: "19880422-987654",
    dateOfBirth: "1988-04-22",
    maritalStatus: "married",
    numberOfChildren: 2,
    joinDate: "2021-11-08",
    salary: 1100000,
    emergencyContact: {
      name: "نور الهدى العلوي",
      relationship: "زوجة",
      phone: "+964-779-012-3456",
    },
  },
];

// Mock Families Data
export const mockFamilies: Family[] = [
  {
    id: "fam-001",
    residentId: "res-001",
    apartmentId: "apt-001",
    totalMembers: 4,
    monthlyIncome: 1200000,
    members: [
      {
        id: "mem-001",
        name: "فاطمة حسن الحسيني",
        relationship: "spouse",
        age: 32,
        occupation: "معلمة",
        education: "بكالوريوس تربية",
      },
      {
        id: "mem-002",
        name: "محمد أحمد الحسيني",
        relationship: "child",
        age: 8,
        education: "الصف الثالث الابتدائي",
      },
      {
        id: "mem-003",
        name: "زينب أحمد الحسيني",
        relationship: "child",
        age: 5,
        education: "رياض الأطفال",
      },
    ],
  },
  {
    id: "fam-002",
    residentId: "res-002",
    apartmentId: "apt-003",
    totalMembers: 5,
    monthlyIncome: 1350000,
    members: [
      {
        id: "mem-004",
        name: "زينب محمد الكاظمي",
        relationship: "spouse",
        age: 35,
        occupation: "ممرضة",
        education: "دبلوم تمريض",
      },
      {
        id: "mem-005",
        name: "حسن علي الكاظمي",
        relationship: "child",
        age: 12,
        education: "الصف السادس الابتدائي",
      },
      {
        id: "mem-006",
        name: "علي علي الكاظمي",
        relationship: "child",
        age: 9,
        education: "الصف الرابع الابتدائي",
      },
      {
        id: "mem-007",
        name: "فاطمة علي الكاظمي",
        relationship: "child",
        age: 6,
        education: "الصف الأول الابتدائي",
      },
    ],
  },
  {
    id: "fam-003",
    residentId: "res-003",
    apartmentId: "apt-005",
    totalMembers: 3,
    monthlyIncome: 950000,
    members: [
      {
        id: "mem-008",
        name: "مريم أحمد الصدر",
        relationship: "spouse",
        age: 26,
        occupation: "ربة منزل",
        education: "بكالوريوس آداب",
      },
      {
        id: "mem-009",
        name: "أحمد حسين الصدر",
        relationship: "child",
        age: 2,
        education: "حضانة",
      },
    ],
  },
  {
    id: "fam-004",
    residentId: "res-005",
    apartmentId: "",
    totalMembers: 4,
    monthlyIncome: 1100000,
    specialNeeds: "في قائمة الانتظار للحصول على سكن",
    members: [
      {
        id: "mem-010",
        name: "نور الهدى العلوي",
        relationship: "spouse",
        age: 29,
        occupation: "موظفة حكومية",
        education: "بكالوريوس إدارة أعمال",
      },
      {
        id: "mem-011",
        name: "حسين عباس العلوي",
        relationship: "child",
        age: 7,
        education: "الصف الثاني الابتدائي",
      },
      {
        id: "mem-012",
        name: "علي عباس العلوي",
        relationship: "child",
        age: 4,
        education: "رياض الأطفال",
      },
    ],
  },
];

// Statistics calculation functions
export function getStats() {
  const totalApartments = mockApartments.length;
  const occupiedApartments = mockApartments.filter(apt => apt.status === "occupied").length;
  const vacantApartments = mockApartments.filter(apt => apt.status === "vacant").length;
  const maintenanceApartments = mockApartments.filter(apt => apt.status === "maintenance").length;
  
  const totalResidents = mockResidents.length;
  const marriedResidents = mockResidents.filter(res => res.maritalStatus === "married").length;
  const totalFamilies = mockFamilies.length;
  const totalFamilyMembers = mockFamilies.reduce((sum, family) => sum + family.totalMembers, 0);
  
  const occupancyRate = Math.round((occupiedApartments / totalApartments) * 100);
  const averageRent = Math.round(
    mockApartments.reduce((sum, apt) => sum + apt.monthlyRent, 0) / totalApartments
  );

  return {
    totalApartments,
    occupiedApartments,
    vacantApartments,
    maintenanceApartments,
    totalResidents,
    marriedResidents,
    totalFamilies,
    totalFamilyMembers,
    occupancyRate,
    averageRent,
  };
}