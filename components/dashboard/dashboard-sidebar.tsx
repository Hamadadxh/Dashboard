"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/app-context';
import { 
  Car, 
  BarChart3, 
  Users, 
  MapPin, 
  Settings, 
  Bell,
  LogOut,
  Menu,
  X,
  Percent,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useApp();

  console.log("DashboardSidebar rendered with activeSection:", activeSection);

  const navigationItems = [
    { icon: BarChart3, label: t('dashboard'), id: 'dashboard' },
    { icon: MapPin, label: t('liveMap'), id: 'map' },
    { icon: Car, label: t('vehicles'), id: 'vehicles' },
    { icon: Users, label: t('drivers'), id: 'drivers' },
    { icon: Users, label: t('operators'), id: 'operators' },
    { icon: BarChart3, label: t('analytics'), id: 'analytics' },
    { icon: Settings, label: t('services'), id: 'services' },
    { icon: Bell, label: t('ordersHistory'), id: 'orders', badge: 12 },
    { icon: Percent, label: t('promotionCodes'), id: 'promotions' },
    { icon: FileText, label: t('reports'), id: 'reports' },
    { icon: MapPin, label: t('operationalArea'), id: 'operational' },
    { icon: Settings, label: t('settings'), id: 'settings' },
  ];

  return (
    <div className={cn(
      "bg-white/10 dark:bg-white/10 backdrop-blur-sm border-r border-white/10 dark:border-white/10 transition-all duration-300 flex flex-col h-full",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 dark:border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">Sama Taxi Test</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  console.log("Navigation clicked:", item.id);
                  onSectionChange(item.id);
                }}
                className={cn(
                  "w-full nav-item",
                  isActive && "active"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">Hamada</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Admin</p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <button className="w-full mt-3 flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        )}
      </div>
    </div>
  );
}