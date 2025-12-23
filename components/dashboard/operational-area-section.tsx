"use client";

import { useState } from 'react';
import { 
  MapPin, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Users,
  Car,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Navigation
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const operationalAreas = [
  {
    id: 'area-001',
    name: 'Downtown District',
    status: 'active',
    boundary: [
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7580, lng: -73.9855 },
      { lat: 40.7505, lng: -73.9934 },
      { lat: 40.7282, lng: -73.7949 }
    ],
    activeDrivers: 34,
    totalVehicles: 45,
    utilization: 85,
    demandLevel: 'high',
    avgResponseTime: 3.2,
    completedTrips: 245,
    revenue: 7350,
    coverage: 92,
    priorityLevel: 1,
    operatingHours: '24/7',
    restrictions: [],
    lastUpdated: '2024-06-09 15:30'
  },
  {
    id: 'area-002',
    name: 'Airport Zone',
    status: 'active',
    boundary: [
      { lat: 40.6413, lng: -73.7781 },
      { lat: 40.6892, lng: -74.0445 },
      { lat: 40.7282, lng: -73.7949 },
      { lat: 40.6413, lng: -73.7781 }
    ],
    activeDrivers: 28,
    totalVehicles: 35,
    utilization: 78,
    demandLevel: 'very-high',
    avgResponseTime: 2.8,
    completedTrips: 189,
    revenue: 9450,
    coverage: 88,
    priorityLevel: 1,
    operatingHours: '24/7',
    restrictions: ['No delivery services'],
    lastUpdated: '2024-06-09 15:25'
  },
  {
    id: 'area-003',
    name: 'University Campus',
    status: 'active',
    boundary: [
      { lat: 40.7505, lng: -73.9934 },
      { lat: 40.7614, lng: -73.9776 },
      { lat: 40.7580, lng: -73.9855 },
      { lat: 40.7505, lng: -73.9934 }
    ],
    activeDrivers: 18,
    totalVehicles: 25,
    utilization: 72,
    demandLevel: 'medium',
    avgResponseTime: 4.1,
    completedTrips: 156,
    revenue: 3120,
    coverage: 76,
    priorityLevel: 2,
    operatingHours: '6AM - 12AM',
    restrictions: ['Girls service only after 9PM'],
    lastUpdated: '2024-06-09 15:20'
  },
  {
    id: 'area-004',
    name: 'Business District',
    status: 'active',
    boundary: [
      { lat: 40.7589, lng: -73.9851 },
      { lat: 40.7614, lng: -73.9776 },
      { lat: 40.7505, lng: -73.9934 },
      { lat: 40.7589, lng: -73.9851 }
    ],
    activeDrivers: 22,
    totalVehicles: 30,
    utilization: 90,
    demandLevel: 'high',
    avgResponseTime: 2.9,
    completedTrips: 198,
    revenue: 5940,
    coverage: 95,
    priorityLevel: 1,
    operatingHours: '5AM - 11PM',
    restrictions: [],
    lastUpdated: '2024-06-09 15:35'
  },
  {
    id: 'area-005',
    name: 'Residential Suburbs',
    status: 'limited',
    boundary: [
      { lat: 40.6892, lng: -74.0445 },
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.7282, lng: -73.7949 },
      { lat: 40.6892, lng: -74.0445 }
    ],
    activeDrivers: 12,
    totalVehicles: 20,
    utilization: 45,
    demandLevel: 'low',
    avgResponseTime: 6.5,
    completedTrips: 78,
    revenue: 1560,
    coverage: 60,
    priorityLevel: 3,
    operatingHours: '7AM - 10PM',
    restrictions: ['Limited luxury services'],
    lastUpdated: '2024-06-09 15:15'
  },
  {
    id: 'area-006',
    name: 'Industrial Zone',
    status: 'inactive',
    boundary: [
      { lat: 40.6413, lng: -73.7781 },
      { lat: 40.6892, lng: -74.0445 },
      { lat: 40.7128, lng: -74.0060 },
      { lat: 40.6413, lng: -73.7781 }
    ],
    activeDrivers: 0,
    totalVehicles: 5,
    utilization: 0,
    demandLevel: 'none',
    avgResponseTime: 0,
    completedTrips: 0,
    revenue: 0,
    coverage: 0,
    priorityLevel: 4,
    operatingHours: 'Suspended',
    restrictions: ['All services suspended'],
    lastUpdated: '2024-06-09 10:00'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-electric-green text-white';
    case 'limited':
      return 'bg-electric-orange text-white';
    case 'inactive':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getDemandColor(level: string) {
  switch (level) {
    case 'very-high':
      return 'text-red-400';
    case 'high':
      return 'text-electric-orange';
    case 'medium':
      return 'text-electric-blue';
    case 'low':
      return 'text-electric-green';
    case 'none':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
}

function getPriorityColor(level: number) {
  switch (level) {
    case 1:
      return 'bg-red-500 text-white';
    case 2:
      return 'bg-electric-orange text-white';
    case 3:
      return 'bg-electric-blue text-white';
    case 4:
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export default function OperationalAreaSection() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  console.log("OperationalAreaSection component rendered");

  const filteredAreas = operationalAreas.filter(area => {
    return filterStatus === 'all' || area.status === filterStatus;
  });

  const totalActiveDrivers = operationalAreas.reduce((sum, area) => sum + area.activeDrivers, 0);
  const totalVehicles = operationalAreas.reduce((sum, area) => sum + area.totalVehicles, 0);
  const totalRevenue = operationalAreas.reduce((sum, area) => sum + area.revenue, 0);
  const avgUtilization = operationalAreas.reduce((sum, area) => sum + area.utilization, 0) / operationalAreas.length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Operational Areas</h1>
          <p className="text-gray-400 mt-1">Manage service coverage zones and area-specific operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-dashboard-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            Bulk Settings
          </Button>
          <Button className="bg-electric-blue hover:bg-electric-blue/80">
            <Plus className="w-4 h-4 mr-2" />
            Add Area
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Areas</p>
                <p className="text-3xl font-bold text-white mt-2">{operationalAreas.length}</p>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Drivers</p>
                <p className="text-3xl font-bold text-white mt-2">{totalActiveDrivers}</p>
              </div>
              <div className="w-12 h-12 bg-electric-green/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-electric-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Vehicles</p>
                <p className="text-3xl font-bold text-white mt-2">{totalVehicles}</p>
              </div>
              <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-electric-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg Utilization</p>
                <p className="text-3xl font-bold text-white mt-2">{avgUtilization.toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
          className="border-dashboard-gray-600"
        >
          All Areas ({operationalAreas.length})
        </Button>
        <Button
          variant={filterStatus === 'active' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('active')}
          className="border-dashboard-gray-600"
        >
          Active ({operationalAreas.filter(a => a.status === 'active').length})
        </Button>
        <Button
          variant={filterStatus === 'limited' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('limited')}
          className="border-dashboard-gray-600"
        >
          Limited ({operationalAreas.filter(a => a.status === 'limited').length})
        </Button>
        <Button
          variant={filterStatus === 'inactive' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('inactive')}
          className="border-dashboard-gray-600"
        >
          Inactive ({operationalAreas.filter(a => a.status === 'inactive').length})
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Areas List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAreas.map((area) => (
            <Card 
              key={area.id} 
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedArea === area.id ? 'ring-2 ring-electric-blue' : ''
              }`}
              onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-electric-blue" />
                    <div>
                      <CardTitle className="text-white text-lg">{area.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(area.status)}>
                          {area.status.charAt(0).toUpperCase() + area.status.slice(1)}
                        </Badge>
                        <Badge className={getPriorityColor(area.priorityLevel)}>
                          Priority {area.priorityLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Active Drivers</p>
                    <p className="text-white font-semibold text-lg">{area.activeDrivers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Utilization</p>
                    <p className="text-white font-semibold text-lg">{area.utilization}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-xs">Revenue</p>
                    <p className="text-electric-green font-semibold text-lg">${area.revenue}</p>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Driver Utilization</span>
                    <span className="text-white">{area.utilization}%</span>
                  </div>
                  <Progress value={area.utilization} className="h-2" />
                </div>

                {/* Coverage Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Area Coverage</span>
                    <span className="text-white">{area.coverage}%</span>
                  </div>
                  <Progress value={area.coverage} className="h-2" />
                </div>

                {/* Demand and Response */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400">Demand</p>
                      <p className={`font-semibold ${getDemandColor(area.demandLevel)}`}>
                        {area.demandLevel.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-400">Avg Response</p>
                      <p className="text-white font-semibold">{area.avgResponseTime}min</p>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{area.operatingHours}</span>
                </div>

                {/* Restrictions */}
                {area.restrictions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-electric-orange" />
                      <span className="text-electric-orange text-sm font-semibold">Restrictions</span>
                    </div>
                    <div className="space-y-1">
                      {area.restrictions.map((restriction, index) => (
                        <p key={index} className="text-gray-400 text-xs ml-6">• {restriction}</p>
                      ))}
                    </div>
                  </div>
                )}

                {selectedArea === area.id && (
                  <div className="border-t border-dashboard-gray-600 pt-4 space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Total Vehicles</p>
                        <p className="text-white font-semibold">{area.totalVehicles}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Completed Trips</p>
                        <p className="text-white font-semibold">{area.completedTrips}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/80">
                        <Navigation className="w-4 h-4 mr-2" />
                        View on Map
                      </Button>
                      <Button size="sm" variant="outline" className="border-dashboard-gray-600">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Last updated: {new Date(area.lastUpdated).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View */}
        <div className="lg:col-span-1">
          <Card className="glass-card h-fit">
            <CardHeader>
              <CardTitle className="text-white">Areas Overview Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-dashboard-gray-800 rounded-lg h-96 relative overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-600"></div>
                    ))}
                  </div>
                </div>

                {/* Area Markers */}
                <div className="absolute inset-0 p-4">
                  {operationalAreas.map((area, index) => (
                    <div
                      key={area.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        selectedArea === area.id ? 'scale-125 z-10' : 'hover:scale-110'
                      }`}
                      style={{
                        left: `${15 + (index * 14)}%`,
                        top: `${20 + (index * 12)}%`
                      }}
                      onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                        area.status === 'active' ? 'bg-electric-green' :
                        area.status === 'limited' ? 'bg-electric-orange' :
                        'bg-gray-500'
                      }`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-dashboard-gray-900 border border-dashboard-gray-600 rounded-lg p-2 min-w-32 text-center">
                        <h4 className="text-white text-xs font-semibold">{area.name}</h4>
                        <p className="text-gray-400 text-xs">{area.activeDrivers} drivers</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                <h4 className="text-white font-semibold text-sm">Status Legend</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-electric-green rounded"></div>
                    <span className="text-gray-300 text-xs">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-electric-orange rounded"></div>
                    <span className="text-gray-300 text-xs">Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded"></div>
                    <span className="text-gray-300 text-xs">Inactive</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}