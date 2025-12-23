"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import DashboardSidebar from './dashboard-sidebar';
import DashboardHeader from './dashboard-header';
import OverviewSection from './overview-section';
import VehiclesSection from './vehicles-section';
import DriversSection from './drivers-section';
import LiveMapSection from './live-map-section';
import AnalyticsSection from './analytics-section';
import ServicesSection from './services-section';
import OrdersHistorySection from './orders-history-section';
import PromotionCodesSection from './promotion-codes-section';
import ReportsSection from './reports-section';
import OperatorsSection from './operators-section';
import OperationalAreaSection from './operational-area-section';

const sections = {
  dashboard: OverviewSection,
  map: LiveMapSection,
  vehicles: VehiclesSection,
  drivers: DriversSection,
  operators: OperatorsSection,
  analytics: AnalyticsSection,
  services: ServicesSection,
  orders: OrdersHistorySection,
  promotions: PromotionCodesSection,
  reports: ReportsSection,
  operational: OperationalAreaSection,
  settings: () => {
    const { t } = useApp();
    return (
      <div className="p-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('settings')}</h1>
        <div className="glass-card p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Settings section coming soon...</p>
        </div>
      </div>
    );
  }
};

export default function DashboardContainer() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { theme } = useApp();

  console.log("DashboardContainer rendered with activeSection:", activeSection, "theme:", theme);

  const ActiveComponent = sections[activeSection as keyof typeof sections];

  return (
    <div className={`flex h-screen ${theme === 'light' ? 'bg-dashboard-gradient-light' : 'bg-dashboard-gradient'}`}>
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}