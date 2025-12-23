"use client";

import { useState } from 'react';
import { 
  Users, 
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  Settings,
  Edit,
  Trash2,
  Plus,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const operators = [
  {
    id: 'OP001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@rideshare.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Operator',
    permissions: ['drivers', 'vehicles', 'analytics', 'reports'],
    status: 'active',
    location: 'Downtown Office',
    shift: 'Day Shift (6AM - 6PM)',
    lastActive: '2 minutes ago',
    assignedArea: 'Central District',
    totalCases: 1247,
    resolvedCases: 1180,
    joinDate: '2023-01-15',
    performance: 94.6
  },
  {
    id: 'OP002',
    name: 'Michael Chen',
    email: 'michael.chen@rideshare.com',
    phone: '+1 (555) 234-5678',
    role: 'Operations Manager',
    permissions: ['all'],
    status: 'active',
    location: 'Headquarters',
    shift: 'Day Shift (8AM - 8PM)',
    lastActive: '1 hour ago',
    assignedArea: 'All Areas',
    totalCases: 2456,
    resolvedCases: 2398,
    joinDate: '2022-08-10',
    performance: 97.6
  },
  {
    id: 'OP003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@rideshare.com',
    phone: '+1 (555) 345-6789',
    role: 'Night Operator',
    permissions: ['drivers', 'emergency'],
    status: 'offline',
    location: 'Remote',
    shift: 'Night Shift (10PM - 6AM)',
    lastActive: '8 hours ago',
    assignedArea: 'Airport Zone',
    totalCases: 892,
    resolvedCases: 856,
    joinDate: '2023-03-20',
    performance: 95.9
  },
  {
    id: 'OP004',
    name: 'David Thompson',
    email: 'david.thompson@rideshare.com',
    phone: '+1 (555) 456-7890',
    role: 'Customer Support',
    permissions: ['customers', 'complaints'],
    status: 'active',
    location: 'Customer Center',
    shift: 'Day Shift (9AM - 9PM)',
    lastActive: '5 minutes ago',
    assignedArea: 'Customer Relations',
    totalCases: 1678,
    resolvedCases: 1589,
    joinDate: '2022-11-05',
    performance: 94.7
  },
  {
    id: 'OP005',
    name: 'Lisa Wang',
    email: 'lisa.wang@rideshare.com',
    phone: '+1 (555) 567-8901',
    role: 'Fleet Coordinator',
    permissions: ['vehicles', 'maintenance'],
    status: 'active',
    location: 'Fleet Office',
    shift: 'Day Shift (7AM - 7PM)',
    lastActive: '30 minutes ago',
    assignedArea: 'Fleet Management',
    totalCases: 756,
    resolvedCases: 734,
    joinDate: '2023-05-12',
    performance: 97.1
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-electric-green text-white';
    case 'offline':
      return 'bg-gray-500 text-white';
    case 'busy':
      return 'bg-electric-orange text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-electric-green" />;
    case 'offline':
      return <XCircle className="w-4 h-4 text-gray-500" />;
    case 'busy':
      return <Clock className="w-4 h-4 text-electric-orange" />;
    default:
      return <Users className="w-4 h-4" />;
  }
}

function getRoleColor(role: string) {
  switch (role.toLowerCase()) {
    case 'operations manager':
      return 'bg-electric-purple text-white';
    case 'senior operator':
      return 'bg-electric-blue text-white';
    case 'night operator':
      return 'bg-electric-orange text-white';
    case 'customer support':
      return 'bg-electric-green text-white';
    case 'fleet coordinator':
      return 'bg-electric-pink text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

export default function OperatorsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log("OperatorsSection component rendered");

  const filteredOperators = operators.filter(operator => {
    const matchesSearch = operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operator.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || operator.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: operators.length,
    active: operators.filter(o => o.status === 'active').length,
    offline: operators.filter(o => o.status === 'offline').length,
    busy: operators.filter(o => o.status === 'busy').length,
  };

  const avgPerformance = operators.reduce((sum, op) => sum + op.performance, 0) / operators.length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Operators Management</h1>
          <p className="text-gray-400 mt-1">Manage system operators and their permissions</p>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Operator
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Operators</p>
                <p className="text-3xl font-bold text-white mt-2">{operators.length}</p>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Now</p>
                <p className="text-3xl font-bold text-white mt-2">{statusCounts.active}</p>
              </div>
              <div className="w-12 h-12 bg-electric-green/20 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-electric-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg Performance</p>
                <p className="text-3xl font-bold text-white mt-2">{avgPerformance.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-electric-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Cases</p>
                <p className="text-3xl font-bold text-white mt-2">{operators.reduce((sum, op) => sum + op.totalCases, 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search operators by name, email, or role..."
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
            variant={statusFilter === 'offline' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('offline')}
            className="border-dashboard-gray-600"
          >
            Offline ({statusCounts.offline})
          </Button>
        </div>
      </div>

      {/* Operators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOperators.map((operator) => (
          <Card key={operator.id} className="glass-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-electric-blue text-white font-semibold">
                      {operator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-lg">{operator.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(operator.role)}>
                        {operator.role}
                      </Badge>
                      <Badge className={getStatusColor(operator.status)}>
                        {operator.status.charAt(0).toUpperCase() + operator.status.slice(1)}
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
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{operator.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{operator.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{operator.location}</span>
                </div>
              </div>

              {/* Shift and Area */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{operator.shift}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Area: {operator.assignedArea}</span>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-dashboard-gray-600">
                <div>
                  <p className="text-gray-400 text-xs">Total Cases</p>
                  <p className="text-white font-semibold">{operator.totalCases}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Resolved</p>
                  <p className="text-electric-green font-semibold">{operator.resolvedCases}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Success Rate</p>
                  <p className="text-electric-blue font-semibold">{operator.performance}%</p>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <h4 className="text-white text-sm font-semibold">Permissions</h4>
                <div className="flex flex-wrap gap-1">
                  {operator.permissions.includes('all') ? (
                    <Badge variant="outline" className="border-electric-green text-electric-green text-xs">
                      All Access
                    </Badge>
                  ) : (
                    operator.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="border-dashboard-gray-600 text-gray-300 text-xs">
                        {permission}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              {/* Last Active */}
              <div className="flex items-center justify-between pt-2 border-t border-dashboard-gray-600">
                <span className="text-gray-400 text-xs">Last active: {operator.lastActive}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400 hover:text-red-300">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOperators.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No operators found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}