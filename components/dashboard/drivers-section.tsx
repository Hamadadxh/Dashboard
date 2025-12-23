"use client";

import { useState } from 'react';
import { 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp,
  Search,
  Phone,
  Car,
  DollarSign,
  MoreVertical,
  UserCheck,
  UserX
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const drivers = [
  {
    id: 'D001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    status: 'online',
    rating: 4.8,
    totalTrips: 1247,
    totalEarnings: '$12,450',
    currentLocation: 'Downtown District',
    vehicleAssigned: 'Tesla Model 3 (ABC-123)',
    joinDate: '2023-01-15',
    todayTrips: 8,
    todayEarnings: '$240',
    activeTime: '6h 32m'
  },
  {
    id: 'D002',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 (555) 234-5678',
    status: 'on-trip',
    rating: 4.9,
    totalTrips: 892,
    totalEarnings: '$8,920',
    currentLocation: 'Airport Zone',
    vehicleAssigned: 'Honda Civic (DEF-456)',
    joinDate: '2023-02-20',
    todayTrips: 6,
    todayEarnings: '$180',
    activeTime: '5h 45m'
  },
  {
    id: 'D003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 (555) 345-6789',
    status: 'online',
    rating: 4.7,
    totalTrips: 2156,
    totalEarnings: '$21,560',
    currentLocation: 'University Area',
    vehicleAssigned: 'Nissan Leaf (JKL-654)',
    joinDate: '2022-11-10',
    todayTrips: 12,
    todayEarnings: '$360',
    activeTime: '7h 15m'
  },
  {
    id: 'D004',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    status: 'offline',
    rating: 4.6,
    totalTrips: 567,
    totalEarnings: '$5,670',
    currentLocation: 'Last seen: Business District',
    vehicleAssigned: 'Ford Focus (MNO-987)',
    joinDate: '2023-03-05',
    todayTrips: 0,
    todayEarnings: '$0',
    activeTime: '0h 0m'
  },
  {
    id: 'D005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    status: 'on-trip',
    rating: 4.9,
    totalTrips: 1834,
    totalEarnings: '$18,340',
    currentLocation: 'En route to Mall',
    vehicleAssigned: 'BMW i3 (GHI-321)',
    joinDate: '2022-09-18',
    todayTrips: 9,
    todayEarnings: '$270',
    activeTime: '6h 20m'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'online':
      return 'bg-electric-green text-white';
    case 'on-trip':
      return 'bg-electric-blue text-white';
    case 'offline':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'online':
      return <UserCheck className="w-4 h-4 text-electric-green" />;
    case 'on-trip':
      return <Car className="w-4 h-4 text-electric-blue" />;
    case 'offline':
      return <UserX className="w-4 h-4 text-gray-500" />;
    default:
      return <Users className="w-4 h-4" />;
  }
}

export default function DriversSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log("DriversSection component rendered");

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.vehicleAssigned.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: drivers.length,
    online: drivers.filter(d => d.status === 'online').length,
    'on-trip': drivers.filter(d => d.status === 'on-trip').length,
    offline: drivers.filter(d => d.status === 'offline').length,
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Driver Management</h1>
          <p className="text-gray-400 mt-1">Monitor driver performance and manage your fleet team</p>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/80">
          <Users className="w-4 h-4 mr-2" />
          Add Driver
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Online Now</p>
                <p className="text-2xl font-bold text-white">{statusCounts.online}</p>
              </div>
              <UserCheck className="w-8 h-8 text-electric-green" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">On Trip</p>
                <p className="text-2xl font-bold text-white">{statusCounts['on-trip']}</p>
              </div>
              <Car className="w-8 h-8 text-electric-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Drivers</p>
                <p className="text-2xl font-bold text-white">{drivers.length}</p>
              </div>
              <Users className="w-8 h-8 text-electric-purple" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">4.8</p>
              </div>
              <Star className="w-8 h-8 text-electric-orange fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search drivers by name, email, or vehicle..."
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
            variant={statusFilter === 'online' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('online')}
            className="border-dashboard-gray-600"
          >
            Online ({statusCounts.online})
          </Button>
          <Button
            variant={statusFilter === 'on-trip' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('on-trip')}
            className="border-dashboard-gray-600"
          >
            On Trip ({statusCounts['on-trip']})
          </Button>
          <Button
            variant={statusFilter === 'offline' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('offline')}
            className="border-dashboard-gray-600"
          >
            Offline ({statusCounts.offline})
          </Button>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="glass-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-electric-blue text-white font-semibold">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-lg">{driver.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(driver.status)}>
                        {driver.status === 'on-trip' ? 'On Trip' : driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{driver.currentLocation}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-electric-orange fill-current" />
                <span className="text-white font-semibold">{driver.rating}</span>
                <span className="text-gray-400 text-sm">({driver.totalTrips} trips)</span>
              </div>

              {/* Vehicle */}
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{driver.vehicleAssigned}</span>
              </div>

              {/* Today's Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dashboard-gray-600">
                <div>
                  <p className="text-gray-400 text-xs">Today Trips</p>
                  <p className="text-white font-semibold">{driver.todayTrips}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Earnings</p>
                  <p className="text-electric-green font-semibold">{driver.todayEarnings}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Active Time</p>
                  <p className="text-white font-semibold">{driver.activeTime}</p>
                </div>
              </div>

              {/* Total Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashboard-gray-600">
                <div>
                  <p className="text-gray-400 text-xs">Total Trips</p>
                  <p className="text-white font-semibold">{driver.totalTrips}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Total Earnings</p>
                  <p className="text-electric-green font-semibold">{driver.totalEarnings}</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Joined {new Date(driver.joinDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No drivers found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}