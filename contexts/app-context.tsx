"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppContextType {
  language: 'en' | 'ar';
  theme: 'dark' | 'light';
  setLanguage: (lang: 'en' | 'ar') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    liveMap: 'Live Map',
    vehicles: 'Vehicles',
    drivers: 'Drivers',
    operators: 'Operators',
    analytics: 'Analytics',
    services: 'Services',
    ordersHistory: 'Orders History',
    promotionCodes: 'Promotion Codes',
    reports: 'Reports',
    operationalArea: 'Operational Area',
    settings: 'Settings',
    
    // Common
    active: 'Active',
    inactive: 'Inactive',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    status: 'Status',
    total: 'Total',
    revenue: 'Revenue',
    
    // Dashboard
    totalRevenue: 'Total Revenue',
    activeDrivers: 'Active Drivers',
    onlineVehicles: 'Online Vehicles',
    completedTrips: 'Completed Trips',
    revenueGrowth: 'Revenue Growth',
    newDrivers: 'New Drivers',
    avgTripTime: 'Avg Trip Time',
    
    // Vehicle Status
    available: 'Available',
    onTrip: 'On Trip',
    maintenance: 'Maintenance',
    offline: 'Offline',
    
    // Theme & Language
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    english: 'English',
    arabic: 'العربية'
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    liveMap: 'الخريطة المباشرة',
    vehicles: 'المركبات',
    drivers: 'السائقين',
    operators: 'المشغلين',
    analytics: 'التحليلات',
    services: 'الخدمات',
    ordersHistory: 'تاريخ الطلبات',
    promotionCodes: 'رموز الخصم',
    reports: 'التقارير',
    operationalArea: 'المنطقة التشغيلية',
    settings: 'الإعدادات',
    
    // Common
    active: 'نشط',
    inactive: 'غير نشط',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    status: 'الحالة',
    total: 'المجموع',
    revenue: 'الإيرادات',
    
    // Dashboard
    totalRevenue: 'إجمالي الإيرادات',
    activeDrivers: 'السائقين النشطين',
    onlineVehicles: 'المركبات المتصلة',
    completedTrips: 'الرحلات المكتملة',
    revenueGrowth: 'نمو الإيرادات',
    newDrivers: 'سائقين جدد',
    avgTripTime: 'متوسط وقت الرحلة',
    
    // Vehicle Status
    available: 'متاح',
    onTrip: 'في رحلة',
    maintenance: 'صيانة',
    offline: 'غير متصل',
    
    // Theme & Language
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع المضيء',
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية'
  }
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Save preferences and update document
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    
    // Update document direction for RTL
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update theme class
    document.documentElement.className = theme === 'light' ? 'light' : 'dark';
  }, [language, theme]);

  const handleSetLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    console.log('Language changed to:', lang);
  };

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };

  return (
    <AppContext.Provider value={{
      language,
      theme,
      setLanguage: handleSetLanguage,
      setTheme: handleSetTheme,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}