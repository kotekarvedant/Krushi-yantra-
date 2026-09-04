import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, Search, Verified, Calendar, Clock, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const RenterPortal = () => {
  const { equipment, addRequest, t } = useAppContext();
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [radius, setRadius] = useState(10);
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [acres, setAcres] = useState(1);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingModal) {
      const eq = equipment.find(e => e.id === bookingModal);
      if (eq) {
        addRequest({
          id: Math.random().toString(36).substr(2, 9),
          equipmentId: eq.id,
          farmerName: 'Ramesh Patil',
          farmerVillage: 'Nashik',
          operation: 'General Farm Work',
          acres: acres,
          estimatedRevenue: eq.rateHr * acres * 2, // Dummy logic
          status: 'pending',
          driverIncluded: true,
          dieselIncluded: false,
          date: 'Tomorrow'
        });
        setBookingModal(null);
        alert('Booking request sent successfully!');
      }
    }
  };

  return (
    <main className="w-full pt-28 bg-[#f1fcf2] min-h-screen px-4 lg:px-10 pb-12">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        
        {/* Top Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4 border border-[#dae5dc]">
          <div className="flex-1 w-full flex items-center bg-[#ebf7ed] rounded-full px-4 py-2 gap-2">
            <Search className="text-[#707974] w-5 h-5" />
            <input type="text" placeholder="Search equipment..." className="w-full bg-transparent outline-none" />
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-[#ebf7ed] px-4 py-2 rounded-full flex-1 lg:flex-none">
              <span className="text-[12px] font-bold text-[#404945]">Radius:</span>
              <input type="range" min="5" max="30" step="5" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="accent-[#003629]" />
              <span className="text-[14px] font-bold text-[#003629]">{radius} km</span>
            </div>
            
            <div className="flex bg-[#ebf7ed] p-1 rounded-full">
              <button 
                onClick={() => setView('grid')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${view === 'grid' ? 'bg-[#003629] text-white' : 'text-[#404945]'}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setView('map')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${view === 'map' ? 'bg-[#003629] text-white' : 'text-[#404945]'}`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left/Center Area: Equipment Grid/Map */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {equipment.map(eq => (
                  <div key={eq.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-[#dae5dc]">
                    <div className="relative h-48 overflow-hidden">
                      <img src={eq.image} alt={eq.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-[#003629] text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <Verified className="w-3 h-3 text-[#a3f69c]" /> Verified Owner
                      </div>
                      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#003629]" /> {eq.distance} km away
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                      <div>
                        <h3 className="text-[18px] font-bold text-[#141e18] leading-tight">{eq.title}</h3>
                        <p className="text-[12px] text-[#7e5700] font-semibold mt-1">{eq.titleMr}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-col">
                            <span className="text-[20px] font-bold text-[#003629]">₹{eq.rateHr}</span>
                            <span className="text-[12px] text-[#404945]">per hour</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[14px] font-bold text-[#141e18]">{eq.ownerName}</span>
                            <span className="text-[12px] text-[#404945]">★ {eq.ownerRating}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setBookingModal(eq.id)}
                        className="w-full py-3 bg-[#fdbe50] hover:bg-[#7e5700] text-[#281900] hover:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" /> Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dae5dc] h-[600px]">
                <MapContainer center={[20.0059, 73.7898]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {equipment.map(eq => (
                    <Marker key={eq.id} position={[eq.lat, eq.lng]}>
                      <Popup>
                        <div className="flex flex-col gap-2 p-1 min-w-[200px]">
                          <h4 className="font-bold text-[#003629] text-sm leading-tight">{eq.title}</h4>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold">₹{eq.rateHr}/hr</span>
                            <span className="text-[#404945]">{eq.distance} km</span>
                          </div>
                          <button 
                            onClick={() => setBookingModal(eq.id)}
                            className="w-full py-1.5 mt-1 bg-[#003629] text-white text-xs font-bold rounded"
                          >
                            Book Now
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}
          </div>

          {/* Right Sidebar: Active Booking Tracker */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#dae5dc] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ba1a1a]"></span>
                  </span>
                  <span className="text-[16px] font-bold text-[#141e18]">Active Rental</span>
                </div>
                <span className="text-[12px] font-bold bg-[#ffdead] text-[#281900] px-2 py-1 rounded">
                  #KY-8291
                </span>
              </div>
              
              <div className="bg-[#ebf7ed] p-4 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#003629] text-[14px]">Swaraj 744 FE + Rotavator</h4>
                    <p className="text-[12px] text-[#404945]">Arriving at: Khed Farm</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-[#003629]">2:30 PM</span>
                    <span className="text-[12px] font-bold text-[#ba1a1a]">ETA: 22 Mins</span>
                  </div>
                </div>
                
                <div className="w-full bg-[#dae5dc] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#003629] h-full w-3/4 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#dae5dc]">
                <div className="flex items-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Woman_at_work%2C_Gujarat.jpg" alt="Driver" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#141e18]">Suresh Shinde</span>
                    <span className="text-[12px] text-[#404945]">MH-15-EG-4402</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-[#ffdad6] text-[#ba1a1a] font-bold rounded-lg hover:bg-[#ffb4ab] transition-colors mt-2">
                SOS Emergency Assistance
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {bookingModal && (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-bold text-[#003629] mb-4">Complete Booking</h3>
              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#141e18] mb-1">Land Size (Acres)</label>
                  <input type="number" min="1" value={acres} onChange={(e) => setAcres(Number(e.target.value))} className="w-full h-12 px-3 border border-[#c0c9c3] rounded-lg" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="driver" className="w-4 h-4 accent-[#003629]" defaultChecked />
                  <label htmlFor="driver" className="text-sm font-medium">Need Driver Included</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="diesel" className="w-4 h-4 accent-[#003629]" defaultChecked />
                  <label htmlFor="diesel" className="text-sm font-medium">Diesel Included</label>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setBookingModal(null)} className="flex-1 py-3 bg-[#e5f1e7] text-[#141e18] font-bold rounded-lg hover:bg-[#dae5dc]">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-[#003629] text-white font-bold rounded-lg hover:bg-[#1b4d3e]">Confirm Booking</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};
