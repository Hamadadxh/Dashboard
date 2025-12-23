"use client";

import { 
  Car, 
  Users, 
  DollarSign, 
  MapPin,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 2400 },
  { name: 'Tue', revenue: 1398 },
  { name: 'Wed', revenue: 9800 },
  { name: 'Thu', revenue: 3908 },
  { name: 'Fri', revenue: 4800 },
  { name: 'Sat', revenue: 3800 },
  { name: 'Sun', revenue: 4300 },
];

const tripsData = [
  { name: '6 AM', trips: 24 },
  { name: '9 AM', trips: 45 },
  { name: '12 PM', trips: 78 },
  { name: '3 PM', trips: 56 },
  { name: '6 PM', trips: 89 },
  { name: '9 PM', trips: 67 },
  { name: '12 AM', trips: 23 },
];

export default function OverviewSection() {
  console.log("OverviewSection component rendered");

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your car-sharing platform.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Rides</p>
                <p className="text-3xl font-bold text-white mt-2">142</p>
                <div className="flex items-center mt-2 text-electric-green text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12% from yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">$24,580</p>
                <div className="flex items-center mt-2 text-electric-green text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8.2% this week</span>
                </div>
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
                <p className="text-gray-400 text-sm font-medium">Online Drivers</p>
                <p className="text-3xl font-bold text-white mt-2">89</p>
                <div className="flex items-center mt-2 text-electric-orange text-sm">
                  <span>68% availability</span>
                </div>
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
                <p className="text-gray-400 text-sm font-medium">Avg Trip Time</p>
                <p className="text-3xl font-bold text-white mt-2">18min</p>
                <div className="flex items-center mt-2 text-electric-green text-sm">
                  <span>-2min from avg</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Weekly Revenue</CardTitle>
            <p className="text-gray-400 text-sm">Revenue performance over the last 7 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trips Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Daily Trip Distribution</CardTitle>
            <p className="text-gray-400 text-sm">Number of trips throughout the day</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tripsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="trips" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Driver Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Online</span>
              <div className="flex items-center gap-2">
                <div className="status-indicator bg-electric-green"></div>
                <span className="text-white font-semibold">89</span>
              </div>
            </div>
            <Progress value={68} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">On Trip</span>
              <div className="flex items-center gap-2">
                <div className="status-indicator bg-electric-blue"></div>
                <span className="text-white font-semibold">34</span>
              </div>
            </div>
            <Progress value={26} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Offline</span>
              <div className="flex items-center gap-2">
                <div className="status-indicator bg-gray-500"></div>
                <span className="text-white font-semibold">42</span>
              </div>
            </div>
            <Progress value={32} className="h-2" />
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-electric-orange" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-electric-orange/10 border border-electric-orange/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-orange rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Vehicle maintenance required</p>
                  <p className="text-gray-400 text-sm">Car #1247 needs immediate attention - 3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-electric-blue/10 border border-electric-blue/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">High demand area detected</p>
                  <p className="text-gray-400 text-sm">Downtown area showing 150% increase in requests - 1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-electric-green/10 border border-electric-green/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white font-medium">Daily revenue target achieved</p>
                  <p className="text-gray-400 text-sm">Today's target of $20,000 reached 2 hours ahead of schedule</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}