"use client";

import { 
  TrendingUp, 
  DollarSign,
  Users,
  MapPin,
  Clock,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const gmvData = [
  { month: 'Jan', gmv: 125000, revenue: 25000, orders: 3200 },
  { month: 'Feb', gmv: 145000, revenue: 29000, orders: 3800 },
  { month: 'Mar', gmv: 132000, revenue: 26400, orders: 3450 },
  { month: 'Apr', gmv: 168000, revenue: 33600, orders: 4200 },
  { month: 'May', gmv: 185000, revenue: 37000, orders: 4650 },
  { month: 'Jun', gmv: 210000, revenue: 42000, orders: 5200 },
];

const orderStatusData = [
  { name: 'Completed', value: 78, color: '#10b981' },
  { name: 'Cancelled', value: 12, color: '#ef4444' },
  { name: 'In Progress', value: 8, color: '#2563eb' },
  { name: 'Pending', value: 2, color: '#f59e0b' },
];

const responseTimeData = [
  { hour: '6AM', response: 2.1, waiting: 3.2 },
  { hour: '9AM', response: 3.8, waiting: 5.1 },
  { hour: '12PM', response: 4.2, waiting: 6.8 },
  { hour: '3PM', response: 3.9, waiting: 5.5 },
  { hour: '6PM', response: 5.1, waiting: 8.2 },
  { hour: '9PM', response: 3.2, waiting: 4.7 },
  { hour: '12AM', response: 1.8, waiting: 2.9 },
];

const bookingSourcesData = [
  { name: 'Mobile App', value: 65, color: '#2563eb' },
  { name: 'Website', value: 20, color: '#10b981' },
  { name: 'Phone Call', value: 10, color: '#f59e0b' },
  { name: 'Partner APIs', value: 5, color: '#8b5cf6' },
];

const referralData = [
  { month: 'Jan', referrals: 245, savings: 4900 },
  { month: 'Feb', referrals: 312, savings: 6240 },
  { month: 'Mar', referrals: 289, savings: 5780 },
  { month: 'Apr', referrals: 398, savings: 7960 },
  { month: 'May', referrals: 456, savings: 9120 },
  { month: 'Jun', referrals: 523, savings: 10460 },
];

const pickupHeatmapData = [
  { area: 'Downtown', pickups: 1250, lat: 40.7128, lng: -74.0060 },
  { area: 'Airport', pickups: 890, lat: 40.6413, lng: -73.7781 },
  { area: 'University', pickups: 756, lat: 40.7282, lng: -73.7949 },
  { area: 'Business District', pickups: 642, lat: 40.7589, lng: -73.9851 },
  { area: 'Mall Zone', pickups: 534, lat: 40.7505, lng: -73.9934 },
];

export default function AnalyticsSection() {
  console.log("AnalyticsSection component rendered");

  const totalGMV = gmvData.reduce((sum, item) => sum + item.gmv, 0);
  const totalRevenue = gmvData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = gmvData.reduce((sum, item) => sum + item.orders, 0);
  const avgResponseTime = responseTimeData.reduce((sum, item) => sum + item.response, 0) / responseTimeData.length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Comprehensive business intelligence and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-dashboard-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-electric-blue hover:bg-electric-blue/80">
            <BarChart3 className="w-4 h-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total GMV</p>
                <p className="text-3xl font-bold text-white mt-2">${(totalGMV / 1000).toFixed(0)}K</p>
                <div className="flex items-center mt-2 text-electric-green text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+23.5% vs last period</span>
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
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">${(totalRevenue / 1000).toFixed(0)}K</p>
                <div className="flex items-center mt-2 text-electric-blue text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+18.2% revenue growth</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-white mt-2">{(totalOrders / 1000).toFixed(1)}K</p>
                <div className="flex items-center mt-2 text-electric-purple text-sm">
                  <span>+15.3% order volume</span>
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
                <p className="text-gray-400 text-sm font-medium">Avg Response</p>
                <p className="text-3xl font-bold text-white mt-2">{avgResponseTime.toFixed(1)}min</p>
                <div className="flex items-center mt-2 text-electric-orange text-sm">
                  <span>-12% improvement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-electric-orange/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-electric-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GMV and Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">GMV & Revenue Trends</CardTitle>
            <p className="text-gray-400 text-sm">Gross Merchandise Value and revenue progression</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={gmvData}>
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
                <Area type="monotone" dataKey="gmv" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="revenue" stackId="2" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Order Status Distribution</CardTitle>
            <p className="text-gray-400 text-sm">Breakdown of order completion rates</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {orderStatusData.map((entry, index) => (
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

      {/* Response Time Analysis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Response Time vs Waiting Time Analysis</CardTitle>
          <p className="text-gray-400 text-sm">Daily patterns of response and customer waiting times</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
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
                dataKey="response" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                name="Response Time (min)"
              />
              <Line 
                type="monotone" 
                dataKey="waiting" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                name="Waiting Time (min)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Booking Sources and Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Booking Sources</CardTitle>
            <p className="text-gray-400 text-sm">Distribution of order sources</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingSourcesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {bookingSourcesData.map((entry, index) => (
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

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Referral Program Performance</CardTitle>
            <p className="text-gray-400 text-sm">Referral usage and customer savings</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referralData}>
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
                <Bar dataKey="referrals" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pickup Insights Map */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Pickup Insights Heatmap</CardTitle>
          <p className="text-gray-400 text-sm">Popular pickup locations and demand patterns</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Top Pickup Areas</h4>
              {pickupHeatmapData.map((area, index) => (
                <div key={area.area} className="flex items-center justify-between p-3 bg-dashboard-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                      index === 0 ? 'bg-electric-green' :
                      index === 1 ? 'bg-electric-blue' :
                      index === 2 ? 'bg-electric-purple' :
                      'bg-electric-orange'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{area.area}</p>
                      <p className="text-gray-400 text-sm">{area.pickups} pickups</p>
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-dashboard-gray-600 rounded-full">
                    <div 
                      className="h-2 bg-electric-blue rounded-full"
                      style={{ width: `${(area.pickups / 1250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-dashboard-gray-800 rounded-lg h-80 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-600"></div>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 p-4">
                {pickupHeatmapData.map((area, index) => (
                  <div
                    key={area.area}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${25 + (index * 12)}%`
                    }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      {area.pickups}
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-dashboard-gray-900 border border-dashboard-gray-600 rounded-lg p-2 min-w-20 text-center">
                      <p className="text-white text-xs font-semibold">{area.area}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Assigned vs Missed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Successfully Assigned</span>
                <span className="text-electric-green font-semibold">87%</span>
              </div>
              <div className="w-full bg-dashboard-gray-600 rounded-full h-3">
                <div className="bg-electric-green h-3 rounded-full" style={{ width: '87%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Missed Assignments</span>
                <span className="text-red-400 font-semibold">13%</span>
              </div>
              <div className="w-full bg-dashboard-gray-600 rounded-full h-3">
                <div className="bg-red-500 h-3 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Median Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-electric-blue">3.2</div>
              <div className="text-gray-400">minutes</div>
              <div className="text-electric-green text-sm">-15% from last month</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Peak Hours Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Morning Peak</span>
                <span className="text-white">8-10 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Evening Peak</span>
                <span className="text-white">5-7 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Weekend Peak</span>
                <span className="text-white">11 AM-2 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}