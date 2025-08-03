# Taskeen - نظام إدارة التسكين

A modern, professional housing management system built for the Holy Military Threshold (العتبة العسكرية المقدسة) to efficiently manage residential units, families, and residents.

## 🏠 Features

### 📊 Dashboard
- Real-time statistics and analytics
- Quick overview of housing occupancy
- System health monitoring
- Beautiful data visualizations

### 👨‍👩‍👧‍👦 Family Management
- Register and manage families
- Track family members and relationships
- Housing assignment and waitlist management
- Comprehensive family profiles

### 👥 Resident Management
- Complete resident database
- Personal information and contact details
- Employment and department tracking
- Housing status monitoring

### 🏢 Apartment Management
- Property inventory and status tracking
- Occupancy management
- Maintenance scheduling
- Rental and financial tracking

### 📈 Reports & Analytics
- Generate comprehensive reports
- Export data in multiple formats (PDF, Excel, CSV)
- Statistical analysis and insights
- Scheduled report generation

## 🚀 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components library
- **Icons**: Lucide React icons
- **State Management**: React Context API
- **Theme**: Dark/Light mode support
- **Internationalization**: Arabic RTL language support

## 🎨 Design Features

- **Modern UI**: Clean, professional interface design
- **Responsive**: Mobile-first responsive design
- **Theme Support**: Dark and light mode with automatic system detection
- **RTL Support**: Full Arabic language support with proper RTL layout
- **Accessibility**: WCAG compliant design patterns
- **Professional Cards**: Clean data presentation with consistent styling

## 📱 Pages Overview

### Dashboard (`/dashboard`)
- System overview and key metrics
- Quick access to main functions
- Real-time statistics

### Families (`/families`)
- Family registration and management
- Housing assignment workflow
- Family member tracking

### Residents (`/residents`)
- Complete resident database
- Table and card view modes
- Advanced filtering and search

### Apartments (`/apartments`)
- Property management interface
- Occupancy status tracking
- Maintenance management

### Reports (`/reports`)
- Report generation interface
- Multiple export formats
- Historical data analysis

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hsnAskrain/taskeen.git
   cd taskeen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Protected application pages
│   ├── globals.css        # Global styles and theme variables
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── layouts/          # Layout components
│   └── ui/               # UI component library
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data
└── services/             # API and external services
```

## 🎯 Key Features Implementation

### Theme System
- CSS variables for consistent theming
- Automatic dark/light mode detection
- Smooth transitions between themes
- RTL language support

### Component Architecture
- Modular component design
- Reusable UI components
- Consistent styling patterns
- TypeScript for type safety

### Data Management
- Mock data for development
- Structured data models
- Efficient filtering and search
- Export functionality

## 🤝 Contributing

This project is developed for the Holy Military Threshold. For contributions or modifications:

1. Fork the repository
2. Create your feature branch
3. Commit your changes with descriptive messages
4. Push to your branch
5. Create a Pull Request

## 📞 Contact & Support

For questions, support, or feature requests regarding the Taskeen housing management system, please contact the development team.

## 📄 License

This project is proprietary software developed for the Holy Military Threshold (العتبة العسكرية المقدسة).

---

**Built with ❤️ for the Holy Military Threshold**

*نظام إدارة التسكين - تم تطويره لخدمة العتبة العسكرية المقدسة*