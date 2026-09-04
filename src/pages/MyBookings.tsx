import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, MapPin, Truck, CheckCircle2 } from 'lucide-react';

export const MyBookings = () => {
  const { requests, equipment } = useAppContext();
  
  // Show bookings for the farmer
  const myBookings = requests;

  return (
    <main className="w-full pt-28 bg-[#f1fcf2] min-h-[calc(100vh-160px)] px-4 lg:px-10 pb-12">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#003629]">My Bookings (माझे आरक्षण)</h1>
          <p className="text-[#404945]">Manage and track your farm equipment rentals.</p>
        </div>

        <div className="flex flex-col gap-4">
          {myBookings.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-[#dae5dc] text-center text-[#404945]">
              You have no active or past bookings.
            </div>
          ) : (
            myBookings.map(req => {
              const eq = equipment.find(e => e.id === req.equipmentId);
              if (!eq) return null;

              return (
                <div key={req.id} className="bg-white rounded-xl shadow-sm border border-[#dae5dc] flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-1/4 h-48 md:h-auto relative bg-[#e5f1e7]">
                    <img src={eq.image} alt={eq.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                      #{req.id.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-[#003629]">{eq.title}</h3>
                        <p className="text-[#7e5700] text-sm font-semibold">{req.operation}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-[#003629]">₹{req.estimatedRevenue}</span>
                        <span className="text-sm text-[#404945]">{req.acres} Acres</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-4 bg-[#ebf7ed] p-4 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#003629]" />
                        <div>
                          <span className="block text-xs text-[#404945]">Date</span>
                          <span className="font-semibold text-[#141e18]">{req.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-[#003629]" />
                        <div>
                          <span className="block text-xs text-[#404945]">Status</span>
                          <span className={`font-bold ${req.status === 'pending' ? 'text-[#7e5700]' : 'text-[#005111]'}`}>
                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {req.status === 'pending' && (
                        <button className="px-6 py-2 bg-[#ffdad6] text-[#ba1a1a] rounded-lg font-bold hover:bg-[#ffb4ab]">
                          Cancel Request
                        </button>
                      )}
                      {req.status === 'accepted' && (
                        <button className="px-6 py-2 bg-[#e5f1e7] text-[#003629] rounded-lg font-bold hover:bg-[#dae5dc]">
                          Track GPS
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};
