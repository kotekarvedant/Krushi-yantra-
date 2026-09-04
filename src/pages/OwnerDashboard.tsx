import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Activity, Bell, TrendingUp, CheckCircle, XCircle, PhoneCall, Plus } from 'lucide-react';

export const OwnerDashboard = () => {
  const { requests, updateRequestStatus, equipment, updateEquipmentStatus } = useAppContext();
  const [fleetOnline, setFleetOnline] = useState(true);

  const activeBookings = equipment.filter(e => e.status === 'in_field').length;
  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <main className="w-full pt-28 bg-[#f1fcf2] min-h-screen px-4 lg:px-10 pb-12">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        
        {/* Header Dashboard */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border border-[#dae5dc]">
          <div>
            <span className="inline-block px-3 py-1 bg-[#1b4d3e] text-white text-xs font-bold rounded-full mb-2">CHC Hub Nashik-04</span>
            <h1 className="text-2xl font-bold text-[#003629]">Shri Gajanan Agro Machinery Services</h1>
          </div>
          <div className="flex items-center gap-3 bg-[#ebf7ed] p-3 rounded-xl border border-[#c0c9c3]">
            <div className="text-right">
              <span className={`block font-bold ${fleetOnline ? 'text-[#003629]' : 'text-[#ba1a1a]'}`}>{fleetOnline ? 'Fleet Online' : 'Fleet Paused'}</span>
              <span className="text-xs text-[#404945]">Toggle Availability</span>
            </div>
            <button 
              onClick={() => setFleetOnline(!fleetOnline)}
              className={`w-14 h-8 rounded-full relative transition-colors ${fleetOnline ? 'bg-[#1b4d3e]' : 'bg-[#c0c9c3]'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${fleetOnline ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dae5dc]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#404945]">Active Bookings</span>
              <Activity className="text-[#003629] w-5 h-5" />
            </div>
            <span className="text-3xl font-bold text-[#003629]">{activeBookings.toString().padStart(2, '0')}</span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dae5dc]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#404945]">Pending Requests</span>
              <Bell className="text-[#fdbe50] w-5 h-5" />
            </div>
            <span className="text-3xl font-bold text-[#7e5700]">{pendingRequests.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dae5dc]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#404945]">Monthly Earnings</span>
              <TrendingUp className="text-[#003629] w-5 h-5" />
            </div>
            <span className="text-3xl font-bold text-[#003629]">₹68,450</span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-[#dae5dc]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-[#404945]">Fleet Utilization</span>
              <CheckCircle className="text-[#a3f69c] w-5 h-5" />
            </div>
            <span className="text-3xl font-bold text-[#003629]">82%</span>
            <div className="w-full bg-[#e5f1e7] h-2 rounded-full mt-2">
              <div className="bg-[#003629] h-2 rounded-full w-[82%]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Requests Queue */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#003629]">Pending Rental Requests</h2>
            {pendingRequests.length === 0 && (
              <div className="p-8 text-center text-[#404945] bg-white rounded-xl shadow-sm">No pending requests right now.</div>
            )}
            {pendingRequests.map(req => {
              const eq = equipment.find(e => e.id === req.equipmentId);
              return (
                <div key={req.id} className="bg-white rounded-xl p-5 shadow-sm border border-[#dae5dc] flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-[#141e18]">{req.farmerName}</h3>
                      <p className="text-sm text-[#404945]">{req.farmerVillage} • {req.operation}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-[#404945]">Est. Revenue</span>
                      <span className="text-xl font-bold text-[#003629]">₹{req.estimatedRevenue}</span>
                    </div>
                  </div>
                  <div className="bg-[#ebf7ed] p-3 rounded-lg text-sm">
                    <strong>Requested:</strong> {eq?.title} ({req.date})
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateRequestStatus(req.id, 'accepted')}
                      className="flex-1 py-2.5 bg-[#003629] text-white font-bold rounded-lg hover:bg-[#1b4d3e]"
                    >
                      Accept
                    </button>
                    <button className="px-4 py-2.5 bg-[#e5f1e7] text-[#003629] rounded-lg hover:bg-[#dae5dc]">
                      <PhoneCall className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => updateRequestStatus(req.id, 'rejected')}
                      className="px-4 py-2.5 bg-[#ffdad6] text-[#ba1a1a] rounded-lg hover:bg-[#ffb4ab]"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Diesel & Profit Log */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-[#dae5dc]">
              <h3 className="text-lg font-bold text-[#003629] mb-4">Daily Diesel & Profit Log</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-[#141e18]">
                  <span>Today's Revenue:</span>
                  <span className="font-bold">₹11,400</span>
                </div>
                <div className="flex justify-between text-[#ba1a1a]">
                  <span>Diesel Dispensed (42L):</span>
                  <span>-₹3,990</span>
                </div>
                <div className="flex justify-between text-[#ba1a1a]">
                  <span>Operator Wages:</span>
                  <span>-₹1,400</span>
                </div>
                <div className="border-t border-[#dae5dc] my-2" />
                <div className="flex justify-between text-[#003629] text-lg font-bold">
                  <span>Net Profit:</span>
                  <span>₹6,010</span>
                </div>
              </div>
            </div>

            <button className="w-full py-4 border-2 border-dashed border-[#003629] text-[#003629] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ebf7ed]">
              <Plus className="w-5 h-5" /> Add New Machinery
            </button>
          </div>
        </div>

        {/* Inventory Table/Grid */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-[#003629] mb-4">Machinery Inventory Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {equipment.filter(e => e.ownerId === 'o1').map(eq => (
              <div key={eq.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#dae5dc]">
                <h4 className="font-bold text-[#141e18] truncate">{eq.title}</h4>
                <div className="flex gap-1 mt-3 bg-[#e5f1e7] p-1 rounded-lg">
                  <button 
                    onClick={() => updateEquipmentStatus(eq.id, 'available')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md ${eq.status === 'available' ? 'bg-[#003629] text-white' : 'text-[#404945]'}`}
                  >
                    Available
                  </button>
                  <button 
                    onClick={() => updateEquipmentStatus(eq.id, 'in_field')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md ${eq.status === 'in_field' ? 'bg-[#fdbe50] text-[#281900]' : 'text-[#404945]'}`}
                  >
                    In Field
                  </button>
                  <button 
                    onClick={() => updateEquipmentStatus(eq.id, 'maintenance')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md ${eq.status === 'maintenance' ? 'bg-[#ba1a1a] text-white' : 'text-[#404945]'}`}
                  >
                    Maint.
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
