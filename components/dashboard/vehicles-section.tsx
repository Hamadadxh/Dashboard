"use client";

import { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Clock, 
  Battery, 
  Fuel, 
  Settings,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const vehicles = [
  {
    id: 'V001',
    model: 'Tesla Model 3',
    plate: 'ABC-123',
    status: 'active',
    location: 'Downtown District',
    battery: 85,
    driver: 'John Smith',
    lastUpdate: '2 min ago',
    dailyTrips: 12,
    revenue: '$340'
  },
  {
    id: 'V002',
    model: 'Toyota Prius',
    plate: 'XYZ-789',
    status: 'maintenance',
    location: 'Service Center',
    fuel: 45,
    driver: null,
    lastUpdate: '1 hour ago',
    dailyTrips: 0,
    revenue: '$0'
  },
  {
    id: 'V003',
    model: 'Honda Civic',
    plate: 'DEF-456',
    status: 'active',
    location: 'Airport Zone',
    fuel: 78,
    driver: 'Sarah Wilson',
    lastUpdate: '5 min ago',
    dailyTrips: 8,
    revenue: '$210'
  },
  {
    id: 'V004',
    model: 'BMW i3',
    plate: 'GHI-321',
    status: 'inactive',
    location: 'Parking Lot A',
    battery: 92,
    driver: null,
    lastUpdate: '45 min ago',
    dailyTrips: 0,
    revenue: '$0'
  },
  {
    id: 'V005',
    model: 'Nissan Leaf',
    plate: 'JKL-654',
    status: 'active',
    location: 'University Area',
    battery: 67,
    driver: 'Mike Johnson',
    lastUpdate: '1 min ago',
    dailyTrips: 15,
    revenue: '$420'
  },
  {
    id: 'V006',
    model: 'Ford Focus',
    plate: 'MNO-987',
    status: 'active',
    location: 'Business District',
    fuel: 89,
    driver: 'Emily Davis',
    lastUpdate: '3 min ago',
    dailyTrips: 10,
    revenue: '$290'
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-electric-green" />;
    case 'maintenance':
      return <AlertTriangle className="w-4 h-4 text-electric-orange" />;
    case 'inactive':
      return <XCircle className="w-4 h-4 text-gray-500" />;
    default:
      return <Car className="w-4 h-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-electric-green text-white';
    case 'maintenance':
      return 'bg-electric-orange text-white';
    case 'inactive':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export default function VehiclesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log("VehiclesSection component rendered");

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Vehicle Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage your fleet of vehicles</p>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/80">
          <Car className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search vehicles by model, plate, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-dashboard-gray-700 border-dashboard-gray-600 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className="border-dashboard-gray-600"
          >
            All ({statusCounts.all})
          </Button>
          <Button
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('active')}
            className="border-dashboard-gray-600"
          >
            Active ({statusCounts.active})
          </Button>
          <Button
            variant={statusFilter === 'maintenance' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('maintenance')}
            className="border-dashboard-gray-600"
          >
            Maintenance ({statusCounts.maintenance})
          </Button>
          <Button
            variant={statusFilter === 'inactive' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('inactive')}
            className="border-dashboard-gray-600"
          >
            Inactive ({statusCounts.inactive})
          </Button>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="glass-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(vehicle.status)}
                  <CardTitle className="text-white text-lg">{vehicle.model}</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(vehicle.status)}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </Badge>
                <span className="text-gray-400 text-sm">{vehicle.plate}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{vehicle.location}</span>
              </div>

              {/* Driver */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {vehicle.driver ? vehicle.driver.split(' ').map(n => n[0]).join('') : 'N/A'}
                  </span>
                </div>
                <span className="text-gray-300 text-sm">
                  {vehicle.driver || 'No driver assigned'}
                </span>
              </div>

              {/* Battery/Fuel */}
              <div className="flex items-center gap-2">
                {vehicle.battery !== undefined ? (
                  <>
                    <Battery className="w-4 h-4 text-electric-green" />
                    <div className="flex-1 bg-dashboard-gray-600 rounded-full h-2">
                      <div 
                        className="bg-electric-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${vehicle.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300 text-sm">{vehicle.battery}%</span>
                  </>
                ) : (
                  <>
                    <Fuel className="w-4 h-4 text-electric-blue" />
                    <div className="flex-1 bg-dashboard-gray-600 rounded-full h-2">
                      <div 
                        className="bg-electric-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${vehicle.fuel}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-300 text-sm">{vehicle.fuel}%</span>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashboard-gray-600">
                <div>
                  <p className="text-gray-400 text-xs">Daily Trips</p>
                  <p className="text-white font-semibold">{vehicle.dailyTrips}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Revenue</p>
                  <p className="text-electric-green font-semibold">{vehicle.revenue}</p>
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Updated {vehicle.lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No vehicles found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}