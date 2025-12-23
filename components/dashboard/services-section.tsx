"use client";

import { useState } from 'react';
import { 
  Heart, 
  Package,
  Car,
  Crown,
  Plus,
  Settings,
  Users,
  DollarSign,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const services = [
  {
    id: 'standard',
    name: 'Standard Rides',
    icon: Car,
    color: 'electric-blue',
    description: 'Regular transportation service',
    activeDrivers: 89,
    totalRides: 1420,
    revenue: '$42,600',
    rating: 4.7,
    demandLevel: 'high',
    priceRange: '$8-25',
    features: ['GPS Tracking', '24/7 Support', 'In-app Payment']
  },
  {
    id: 'luxury',
    name: 'Luxury Service',
    icon: Crown,
    color: 'electric-purple',
    description: 'Premium vehicles and VIP treatment',
    activeDrivers: 23,
    totalRides: 340,
    revenue: '$34,200',
    rating: 4.9,
    demandLevel: 'medium',
    priceRange: '$25-80',
    features: ['Premium Vehicles', 'Professional Drivers', 'Complimentary Services']
  },
  {
    id: 'girls',
    name: 'Girls Service',
    icon: Heart,
    color: 'electric-pink',
    description: 'Female drivers for female passengers',
    activeDrivers: 34,
    totalRides: 890,
    revenue: '$26,700',
    rating: 4.8,
    demandLevel: 'high',
    priceRange: '$10-30',
    features: ['Female Drivers Only', 'Safety First', 'Special Routes']
  },
  {
    id: 'delivery',
    name: 'Delivery Service',
    icon: Package,
    color: 'electric-orange',
    description: 'Package and food delivery',
    activeDrivers: 67,
    totalRides: 2340,
    revenue: '$23,400',
    rating: 4.6,
    demandLevel: 'very-high',
    priceRange: '$3-15',
    features: ['Fast Delivery', 'Real-time Tracking', 'Secure Handling']
  }
];

function getDemandColor(level: string) {
  switch (level) {
    case 'very-high':
      return 'text-red-400';
    case 'high':
      return 'text-electric-orange';
    case 'medium':
      return 'text-electric-blue';
    case 'low':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
}

function getDemandBadge(level: string) {
  switch (level) {
    case 'very-high':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-electric-orange text-white';
    case 'medium':
      return 'bg-electric-blue text-white';
    case 'low':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  console.log("ServicesSection component rendered");

  const totalRevenue = services.reduce((sum, service) => {
    return sum + parseFloat(service.revenue.replace('$', '').replace(',', ''));
  }, 0);

  const totalDrivers = services.reduce((sum, service) => sum + service.activeDrivers, 0);
  const totalRides = services.reduce((sum, service) => sum + service.totalRides, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Service Management</h1>
          <p className="text-gray-400 mt-1">Manage different service types and their performance</p>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-electric-green/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-electric-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Services</p>
                <p className="text-3xl font-bold text-white mt-2">{services.length}</p>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Drivers</p>
                <p className="text-3xl font-bold text-white mt-2">{totalDrivers}</p>
              </div>
              <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-electric-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Rides</p>
                <p className="text-3xl font-bold text-white mt-2">{totalRides.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;
          
          return (
            <Card 
              key={service.id} 
              className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer ${
                isSelected ? 'ring-2 ring-electric-blue' : ''
              }`}
              onClick={() => setSelectedService(isSelected ? null : service.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${service.color}/20 rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${service.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <Badge className={getDemandBadge(service.demandLevel)}>
                    {service.demandLevel.replace('-', ' ')} demand
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Active Drivers</p>
                      <p className="text-white font-semibold">{service.activeDrivers}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400 text-xs">Total Rides</p>
                      <p className="text-white font-semibold">{service.totalRides.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Revenue and Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-electric-green" />
                    <div>
                      <p className="text-gray-400 text-xs">Revenue</p>
                      <p className="text-electric-green font-semibold">{service.revenue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-electric-orange fill-current" />
                    <div>
                      <p className="text-gray-400 text-xs">Rating</p>
                      <p className="text-white font-semibold">{service.rating}/5</p>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Price Range</span>
                  <span className="text-white font-semibold">{service.priceRange}</span>
                </div>

                {/* Features */}
                {isSelected && (
                  <div className="border-t border-dashboard-gray-600 pt-4 space-y-3 animate-fade-in">
                    <h4 className="text-white font-semibold">Features</h4>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-electric-green rounded-full"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="border-dashboard-gray-600">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-dashboard-gray-600">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Service Performance Comparison */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Service Performance Overview</CardTitle>
          <p className="text-gray-400 text-sm">Compare performance across all service types</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {services.map((service) => {
              const Icon = service.icon;
              const revenuePercentage = (parseFloat(service.revenue.replace('$', '').replace(',', '')) / totalRevenue) * 100;
              
              return (
                <div key={service.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 text-${service.color}`} />
                      <span className="text-white font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">{service.activeDrivers} drivers</span>
                      <span className="text-white">{service.revenue}</span>
                      <span className="text-gray-400">{revenuePercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <Progress value={revenuePercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}