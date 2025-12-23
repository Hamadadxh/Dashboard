"use client";

import { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Users, 
  Timer,
  Filter,
  Maximize2,
  RefreshCw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mapData = {
  vehicles: [
    { id: 'V001', lat: 40.7128, lng: -74.0060, status: 'active', driver: 'John Smith', model: 'Tesla Model 3' },
    { id: 'V002', lat: 40.7580, lng: -73.9855, status: 'on-trip', driver: 'Sarah Wilson', model: 'Honda Civic' },
    { id: 'V003', lat: 40.7505, lng: -73.9934, status: 'active', driver: 'Mike Johnson', model: 'Nissan Leaf' },
    { id: 'V004', lat: 40.7282, lng: -73.7949, status: 'inactive', driver: null, model: 'BMW i3' },
    { id: 'V005', lat: 40.6892, lng: -74.0445, status: 'active', driver: 'Emily Davis', model: 'Ford Focus' },
  ],
  tripRequests: [
    { id: 'T001', lat: 40.7614, lng: -73.9776, pickup: 'Central Park', destination: 'Times Square', waitTime: '2 min' },
    { id: 'T002', lat: 40.7505, lng: -73.9934, pickup: 'Empire State Building', destination: 'Brooklyn Bridge', waitTime: '5 min' },
    { id: 'T003', lat: 40.7282, lng: -73.7949, pickup: 'JFK Airport', destination: 'Manhattan', waitTime: '8 min' },
  ]
};

export default function LiveMapSection() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'vehicles' | 'requests' | 'both'>('both');

  console.log("LiveMapSection component rendered");

  const activeVehicles = mapData.vehicles.filter(v => v.status === 'active' || v.status === 'on-trip');
  const pendingRequests = mapData.tripRequests.length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Map</h1>
          <p className="text-gray-400 mt-1">Real-time tracking of vehicles and trip requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={mapView === 'vehicles' ? 'default' : 'outline'}
            onClick={() => setMapView('vehicles')}
            size="sm"
            className="border-dashboard-gray-600"
          >
            <Car className="w-4 h-4 mr-2" />
            Vehicles
          </Button>
          <Button
            variant={mapView === 'requests' ? 'default' : 'outline'}
            onClick={() => setMapView('requests')}
            size="sm"
            className="border-dashboard-gray-600"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Requests
          </Button>
          <Button
            variant={mapView === 'both' ? 'default' : 'outline'}
            onClick={() => setMapView('both')}
            size="sm"
            className="border-dashboard-gray-600"
          >
            Both
          </Button>
        </div>
      </div>

      {/* Map Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Vehicles</p>
                <p className="text-2xl font-bold text-white">{activeVehicles.length}</p>
              </div>
              <Car className="w-8 h-8 text-electric-green" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Requests</p>
                <p className="text-2xl font-bold text-white">{pendingRequests}</p>
              </div>
              <Users className="w-8 h-8 text-electric-orange" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-white">3.2min</p>
              </div>
              <Timer className="w-8 h-8 text-electric-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Coverage</p>
                <p className="text-2xl font-bold text-white">94%</p>
              </div>
              <Navigation className="w-8 h-8 text-electric-purple" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Display */}
        <Card className="lg:col-span-3 glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-white">Live Map View</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-dashboard-gray-600">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-dashboard-gray-600">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-dashboard-gray-600">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-dashboard-gray-600">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Simulated Map */}
            <div className="relative bg-dashboard-gray-800 rounded-lg h-96 overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-600"></div>
                  ))}
                </div>
              </div>

              {/* Map Elements */}
              <div className="absolute inset-0 p-4">
                {/* Vehicles */}
                {(mapView === 'vehicles' || mapView === 'both') && mapData.vehicles.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      selectedVehicle === vehicle.id ? 'scale-125 z-10' : 'hover:scale-110'
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${25 + (index * 12)}%`
                    }}
                    onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                      vehicle.status === 'active' ? 'bg-electric-green' :
                      vehicle.status === 'on-trip' ? 'bg-electric-blue' :
                      'bg-gray-500'
                    }`}>
                      <Car className="w-4 h-4 text-white" />
                    </div>
                    {selectedVehicle === vehicle.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-dashboard-gray-900 border border-dashboard-gray-600 rounded-lg p-3 min-w-48 z-20">
                        <h4 className="text-white font-semibold">{vehicle.model}</h4>
                        <p className="text-gray-400 text-sm">{vehicle.driver || 'No driver'}</p>
                        <Badge className={`mt-1 ${
                          vehicle.status === 'active' ? 'bg-electric-green' :
                          vehicle.status === 'on-trip' ? 'bg-electric-blue' :
                          'bg-gray-500'
                        } text-white`}>
                          {vehicle.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}

                {/* Trip Requests */}
                {(mapView === 'requests' || mapView === 'both') && mapData.tripRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      left: `${60 + (index * 10)}%`,
                      top: `${40 + (index * 15)}%`
                    }}
                  >
                    <div className="w-6 h-6 bg-electric-orange rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-dashboard-gray-900 border border-dashboard-gray-600 rounded-lg p-2 min-w-32 text-center">
                      <p className="text-white text-xs font-semibold">{request.pickup}</p>
                      <p className="text-gray-400 text-xs">{request.waitTime}</p>
                    </div>
                  </div>
                ))}

                {/* Areas/Zones */}
                <div className="absolute top-4 left-4 bg-electric-blue/20 border-2 border-electric-blue/40 rounded-lg w-24 h-16 flex items-center justify-center">
                  <span className="text-electric-blue text-xs font-semibold">Downtown</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-electric-green/20 border-2 border-electric-green/40 rounded-lg w-20 h-12 flex items-center justify-center">
                  <span className="text-electric-green text-xs font-semibold">Airport</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Panel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Live Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Recent Events */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-electric-green/10 border border-electric-green/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-green rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">Trip completed</p>
                  <p className="text-gray-400 text-xs">John Smith → Downtown</p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-electric-blue/10 border border-electric-blue/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">New trip request</p>
                  <p className="text-gray-400 text-xs">Central Park → Times Square</p>
                  <p className="text-gray-500 text-xs">3 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-electric-orange/10 border border-electric-orange/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-orange rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">Driver went online</p>
                  <p className="text-gray-400 text-xs">Mike Johnson</p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-electric-purple/10 border border-electric-purple/20 rounded-lg">
                <div className="w-2 h-2 bg-electric-purple rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-white text-sm font-medium">High demand area</p>
                  <p className="text-gray-400 text-xs">Airport zone active</p>
                  <p className="text-gray-500 text-xs">7 minutes ago</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-dashboard-gray-600 pt-4">
              <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-dashboard-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Requests
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-dashboard-gray-600">
                  <Car className="w-4 h-4 mr-2" />
                  Dispatch Vehicle
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-dashboard-gray-600">
                  <Navigation className="w-4 h-4 mr-2" />
                  Optimize Routes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}