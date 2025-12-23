"use client";

import { useState } from 'react';
import { 
  Percent, 
  Plus,
  Calendar,
  Users,
  Car,
  DollarSign,
  Copy,
  Edit,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const promotionCodes = [
  {
    id: 'PROMO001',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    description: 'Welcome discount for new users',
    status: 'active',
    usageCount: 1247,
    usageLimit: 5000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    categories: ['Standard Rides', 'Delivery'],
    totalSavings: '$24,850'
  },
  {
    id: 'PROMO002',
    code: 'LUXURY50',
    type: 'fixed',
    value: 50,
    description: 'Fixed discount for luxury services',
    status: 'active',
    usageCount: 342,
    usageLimit: 1000,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    categories: ['Luxury'],
    totalSavings: '$17,100'
  },
  {
    id: 'PROMO003',
    code: 'DELIVERY15',
    type: 'percentage',
    value: 15,
    description: 'Delivery service promotion',
    status: 'paused',
    usageCount: 856,
    usageLimit: 2000,
    startDate: '2024-02-15',
    endDate: '2024-08-15',
    categories: ['Delivery'],
    totalSavings: '$12,840'
  },
  {
    id: 'PROMO004',
    code: 'WEEKEND25',
    type: 'percentage',
    value: 25,
    description: 'Weekend special offer',
    status: 'expired',
    usageCount: 2134,
    usageLimit: 2000,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    categories: ['Standard Rides', 'Luxury'],
    totalSavings: '$53,350'
  },
  {
    id: 'PROMO005',
    code: 'FIRSTRIDE',
    type: 'fixed',
    value: 25,
    description: 'First ride free up to $25',
    status: 'active',
    usageCount: 3421,
    usageLimit: 10000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    categories: ['Standard Rides'],
    totalSavings: '$85,525'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-electric-green text-white';
    case 'paused':
      return 'bg-electric-orange text-white';
    case 'expired':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-electric-green" />;
    case 'paused':
    case 'expired':
      return <XCircle className="w-4 h-4 text-gray-500" />;
    default:
      return null;
  }
}

export default function PromotionCodesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  console.log("PromotionCodesSection component rendered");

  const filteredCodes = promotionCodes.filter(promo => {
    const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: promotionCodes.length,
    active: promotionCodes.filter(p => p.status === 'active').length,
    paused: promotionCodes.filter(p => p.status === 'paused').length,
    expired: promotionCodes.filter(p => p.status === 'expired').length,
  };

  const totalSavings = promotionCodes.reduce((sum, promo) => {
    return sum + parseFloat(promo.totalSavings.replace('$', '').replace(',', ''));
  }, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Promotion Codes</h1>
          <p className="text-gray-400 mt-1">Manage discount codes and promotional campaigns</p>
        </div>
        <Button className="bg-electric-blue hover:bg-electric-blue/80">
          <Plus className="w-4 h-4 mr-2" />
          Create Promotion
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Codes</p>
                <p className="text-3xl font-bold text-white mt-2">{promotionCodes.length}</p>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Percent className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Codes</p>
                <p className="text-3xl font-bold text-white mt-2">{statusCounts.active}</p>
              </div>
              <div className="w-12 h-12 bg-electric-green/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-electric-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Savings</p>
                <p className="text-3xl font-bold text-white mt-2">${totalSavings.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-electric-purple/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-electric-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Usage</p>
                <p className="text-3xl font-bold text-white mt-2">{promotionCodes.reduce((sum, p) => sum + p.usageCount, 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-electric-orange" />
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
            placeholder="Search by code or description..."
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
            variant={statusFilter === 'paused' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('paused')}
            className="border-dashboard-gray-600"
          >
            Paused ({statusCounts.paused})
          </Button>
          <Button
            variant={statusFilter === 'expired' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('expired')}
            className="border-dashboard-gray-600"
          >
            Expired ({statusCounts.expired})
          </Button>
        </div>
      </div>

      {/* Promotion Codes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCodes.map((promo) => (
          <Card key={promo.id} className="glass-card hover:scale-105 transition-transform duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(promo.status)}
                  <div>
                    <CardTitle className="text-white text-lg font-mono">{promo.code}</CardTitle>
                    <Badge className={getStatusColor(promo.status)}>
                      {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="w-4 h-4" />
                  </Button>
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
              {/* Description */}
              <p className="text-gray-300 text-sm">{promo.description}</p>

              {/* Discount Value */}
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-electric-blue" />
                <span className="text-white font-semibold">
                  {promo.type === 'percentage' ? `${promo.value}% off` : `$${promo.value} off`}
                </span>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 flex-wrap">
                <Car className="w-4 h-4 text-gray-400" />
                {promo.categories.map((category) => (
                  <Badge key={category} variant="outline" className="border-dashboard-gray-600 text-gray-300">
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Usage Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Usage</span>
                  <span className="text-white">{promo.usageCount} / {promo.usageLimit}</span>
                </div>
                <div className="w-full bg-dashboard-gray-600 rounded-full h-2">
                  <div 
                    className="bg-electric-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(promo.usageCount / promo.usageLimit) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashboard-gray-600">
                <div>
                  <p className="text-gray-400 text-xs">Start Date</p>
                  <p className="text-white text-sm">{new Date(promo.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">End Date</p>
                  <p className="text-white text-sm">{new Date(promo.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Total Savings */}
              <div className="flex items-center justify-between pt-2 border-t border-dashboard-gray-600">
                <span className="text-gray-400 text-sm">Total Savings</span>
                <span className="text-electric-green font-semibold">{promo.totalSavings}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <Percent className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No promotion codes found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}