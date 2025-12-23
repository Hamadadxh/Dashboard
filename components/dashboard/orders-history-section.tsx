"use client";

import { useState } from 'react';
import { 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Search,
  Download,
  User,
  Car,
  MapPin,
  DollarSign,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const customerOrders = [
  {
    id: 'ORD001',
    customerId: 'C12345',
    customerName: 'John Smith',
    driverId: 'D001',
    driverName: 'Sarah Wilson',
    service: 'Standard Ride',
    status: 'completed',
    pickup: 'Downtown Plaza',
    destination: 'Airport Terminal 1',
    orderTime: '2024-06-09 14:30',
    startTime: '2024-06-09 14:42',
    endTime: '2024-06-09 15:18',
    fare: 28.50,
    distance: '12.3 km',
    duration: '36 min',
    rating: 4.8,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD002',
    customerId: 'C67890',
    customerName: 'Emily Davis',
    driverId: 'D003',
    driverName: 'Mike Johnson',
    service: 'Luxury Service',
    status: 'completed',
    pickup: 'Business District',
    destination: 'Hotel Grand',
    orderTime: '2024-06-09 13:15',
    startTime: '2024-06-09 13:25',
    endTime: '2024-06-09 13:45',
    fare: 45.00,
    distance: '8.7 km',
    duration: '20 min',
    rating: 5.0,
    paymentMethod: 'Corporate Account'
  },
  {
    id: 'ORD003',
    customerId: 'C54321',
    customerName: 'David Brown',
    driverId: 'D002',
    driverName: 'Lisa Wang',
    service: 'Delivery',
    status: 'cancelled',
    pickup: 'Restaurant Plaza',
    destination: 'Office Complex',
    orderTime: '2024-06-09 12:45',
    startTime: null,
    endTime: null,
    fare: 0,
    distance: '5.2 km',
    duration: null,
    rating: null,
    paymentMethod: 'Cash',
    cancellationReason: 'Customer cancelled'
  },
  {
    id: 'ORD004',
    customerId: 'C98765',
    customerName: 'Maria Garcia',
    driverId: 'D004',
    driverName: 'Alex Thompson',
    service: 'Girls Service',
    status: 'in-progress',
    pickup: 'University Campus',
    destination: 'Shopping Mall',
    orderTime: '2024-06-09 15:20',
    startTime: '2024-06-09 15:28',
    endTime: null,
    fare: 18.00,
    distance: '6.8 km',
    duration: null,
    rating: null,
    paymentMethod: 'Digital Wallet'
  }
];

const driverOrders = [
  {
    id: 'D001',
    driverName: 'Sarah Wilson',
    totalOrders: 12,
    completedOrders: 10,
    cancelledOrders: 1,
    inProgressOrders: 1,
    totalEarnings: 340.50,
    avgRating: 4.8,
    onlineTime: '8h 30m',
    lastOrder: '2024-06-09 14:30'
  },
  {
    id: 'D003',
    driverName: 'Mike Johnson',
    totalOrders: 8,
    completedOrders: 7,
    cancelledOrders: 0,
    inProgressOrders: 1,
    totalEarnings: 420.00,
    avgRating: 4.9,
    onlineTime: '7h 15m',
    lastOrder: '2024-06-09 13:15'
  },
  {
    id: 'D002',
    driverName: 'Lisa Wang',
    totalOrders: 15,
    completedOrders: 12,
    cancelledOrders: 2,
    inProgressOrders: 1,
    totalEarnings: 290.75,
    avgRating: 4.7,
    onlineTime: '9h 45m',
    lastOrder: '2024-06-09 12:45'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-electric-green text-white';
    case 'in-progress':
      return 'bg-electric-blue text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    case 'pending':
      return 'bg-electric-orange text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-electric-green" />;
    case 'in-progress':
      return <Clock className="w-4 h-4 text-electric-blue" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'pending':
      return <AlertTriangle className="w-4 h-4 text-electric-orange" />;
    default:
      return null;
  }
}

export default function OrdersHistorySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('customers');

  console.log("OrdersHistorySection component rendered");

  const filteredCustomerOrders = customerOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: customerOrders.length,
    completed: customerOrders.filter(o => o.status === 'completed').length,
    'in-progress': customerOrders.filter(o => o.status === 'in-progress').length,
    cancelled: customerOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders History</h1>
          <p className="text-gray-400 mt-1">Track all customer and driver order activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-dashboard-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button className="bg-electric-blue hover:bg-electric-blue/80">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-white mt-2">{customerOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white mt-2">{statusCounts.completed}</p>
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
                <p className="text-gray-400 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white mt-2">{statusCounts['in-progress']}</p>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-white mt-2">{statusCounts.cancelled}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-dashboard-gray-700 border-dashboard-gray-600">
          <TabsTrigger value="customers" className="data-[state=active]:bg-electric-blue">Customer Orders</TabsTrigger>
          <TabsTrigger value="drivers" className="data-[state=active]:bg-electric-blue">Driver Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer, driver, or order ID..."
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
                variant={statusFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('completed')}
                className="border-dashboard-gray-600"
              >
                Completed ({statusCounts.completed})
              </Button>
              <Button
                variant={statusFilter === 'in-progress' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('in-progress')}
                className="border-dashboard-gray-600"
              >
                In Progress ({statusCounts['in-progress']})
              </Button>
              <Button
                variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('cancelled')}
                className="border-dashboard-gray-600"
              >
                Cancelled ({statusCounts.cancelled})
              </Button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredCustomerOrders.map((order) => (
              <Card key={order.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <span className="text-white font-semibold text-lg">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className="border-dashboard-gray-600 text-gray-300">
                          {order.service}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{order.driverName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{order.pickup} → {order.destination}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{new Date(order.orderTime).toLocaleString()}</span>
                        </div>
                      </div>

                      {order.status === 'completed' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm pt-2 border-t border-dashboard-gray-600">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-electric-green" />
                            <span className="text-electric-green font-semibold">${order.fare}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{order.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{order.duration}</span>
                          </div>
                          {order.rating && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-electric-orange fill-current" />
                              <span className="text-white">{order.rating}/5</span>
                            </div>
                          )}
                        </div>
                      )}

                      {order.status === 'cancelled' && order.cancellationReason && (
                        <div className="text-red-400 text-sm">
                          Reason: {order.cancellationReason}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {driverOrders.map((driver) => (
              <Card key={driver.id} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">{driver.driverName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Orders</p>
                      <p className="text-white font-semibold text-xl">{driver.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Completed</p>
                      <p className="text-electric-green font-semibold text-xl">{driver.completedOrders}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Earnings</p>
                      <p className="text-electric-green font-semibold">${driver.totalEarnings}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Rating</p>
                      <p className="text-electric-orange font-semibold">{driver.avgRating}/5</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Online Time</p>
                      <p className="text-white font-semibold">{driver.onlineTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Order</p>
                      <p className="text-gray-300 text-sm">{new Date(driver.lastOrder).toLocaleString()}</p>
                    </div>
                  </div>

                  {driver.cancelledOrders > 0 && (
                    <div className="pt-2 border-t border-dashboard-gray-600">
                      <p className="text-red-400 text-sm">Cancelled: {driver.cancelledOrders}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}