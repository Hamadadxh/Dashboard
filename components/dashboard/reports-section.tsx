"use client";

import { 
  FileText, 
  TrendingUp,
  Calendar,
  Download,
  Filter,
  BarChart3,
  DollarSign,
  Users,
  Car,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 45000, trips: 1250, drivers: 89 },
  { month: 'Feb', revenue: 52000, trips: 1450, drivers: 95 },
  { month: 'Mar', revenue: 48000, trips: 1320, drivers: 92 },
  { month: 'Apr', revenue: 61000, trips: 1680, drivers: 105 },
  { month: 'May', revenue: 58000, trips: 1590, drivers: 98 },
  { month: 'Jun', revenue: 67000, trips: 1820, drivers: 112 },
];

const serviceTypes = [
  { name: 'Standard Rides', value: 45, color: '#2563eb' },
  { name: 'Luxury', value: 25, color: '#10b981' },
  { name: 'Delivery', value: 20, color: '#f59e0b' },
  { name: 'Girls Service', value: 10, color: '#8b5cf6' },
];

export default function ReportsSection() {
  console.log("ReportsSection component rendered");

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive business performance insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-dashboard-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter
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
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">$331K</p>
                <div className="flex items-center mt-2 text-electric-green text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+18.2% vs last period</span>
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
                <p className="text-gray-400 text-sm font-medium">Total Trips</p>
                <p className="text-3xl font-bold text-white mt-2">9,110</p>
                <div className="flex items-center mt-2 text-electric-blue text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12.8% this month</span>
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
                <p className="text-gray-400 text-sm font-medium">Active Drivers</p>
                <p className="text-3xl font-bold text-white mt-2">591</p>
                <div className="flex items-center mt-2 text-electric-purple text-sm">
                  <span>+15 new this month</span>
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
                <p className="text-3xl font-bold text-white mt-2">24min</p>
                <div className="flex items-center mt-2 text-electric-orange text-sm">
                  <span>-3min improved</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Monthly Revenue Trend</CardTitle>
            <p className="text-gray-400 text-sm">Revenue performance over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
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
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Service Type Distribution</CardTitle>
            <p className="text-gray-400 text-sm">Breakdown by service categories</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trip Volume Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Monthly Trip Volume & Driver Growth</CardTitle>
          <p className="text-gray-400 text-sm">Trip count and driver acquisition trends</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
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
              <Bar dataKey="drivers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Metrics Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dashboard-gray-600">
                  <th className="text-gray-400 font-medium p-3">Metric</th>
                  <th className="text-gray-400 font-medium p-3">Current Month</th>
                  <th className="text-gray-400 font-medium p-3">Previous Month</th>
                  <th className="text-gray-400 font-medium p-3">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dashboard-gray-700">
                  <td className="text-white p-3">Revenue per Trip</td>
                  <td className="text-white p-3">$36.80</td>
                  <td className="text-gray-400 p-3">$34.20</td>
                  <td className="text-electric-green p-3">+7.6%</td>
                </tr>
                <tr className="border-b border-dashboard-gray-700">
                  <td className="text-white p-3">Driver Utilization</td>
                  <td className="text-white p-3">78%</td>
                  <td className="text-gray-400 p-3">72%</td>
                  <td className="text-electric-green p-3">+6%</td>
                </tr>
                <tr className="border-b border-dashboard-gray-700">
                  <td className="text-white p-3">Customer Satisfaction</td>
                  <td className="text-white p-3">4.8/5</td>
                  <td className="text-gray-400 p-3">4.7/5</td>
                  <td className="text-electric-green p-3">+2.1%</td>
                </tr>
                <tr>
                  <td className="text-white p-3">Cancellation Rate</td>
                  <td className="text-white p-3">8.2%</td>
                  <td className="text-gray-400 p-3">9.1%</td>
                  <td className="text-electric-green p-3">-9.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}