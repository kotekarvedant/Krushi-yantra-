import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckCircle2, Mic, Search, Truck, Verified, Phone, MapPin, Settings, HelpCircle, Activity, Star } from 'lucide-react';
import { mockEquipment } from '../data/mockData';

export const Home = () => {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const [acres, setAcres] = useState(5);

  const traditionalCost = 185000;
  const rentalCost = acres * 5700; // rough calculation
  const savings = traditionalCost - rentalCost;

  return (
    <main className="w-full pt-28 bg-[#f1fcf2] min-h-[calc(100vh-160px)]">
      <div className="flex flex-col w-full">
        {/* Top Visual Accent & Hero Banner Overlap */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#e5f1e7] to-[#f1fcf2] px-4 lg:px-10 pt-8 pb-12">
          <div className="max-w-[1280px] mx-auto flex flex-col gap-8 relative z-10">
            {/* Seasonal Ribbon & Govt Scheme Sync */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ebf7ed]/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center p-1 bg-[#003629] text-[#a3f69c] rounded-lg">
                  <Verified className="w-[18px] h-[18px]" />
                </span>
                <span className="text-[14px] font-bold text-[#003629]">SMAM Supported CHC Network</span>
                <span className="hidden sm:inline-block text-[#c0c9c3]">•</span>
                <span className="hidden sm:inline-block text-[12px] font-medium text-[#404945]">शासकीय अनुदानित शेती अवजारे केंद्र संलग्न</span>
              </div>
              <div className="flex items-center gap-2 text-[#7e5700] text-[14px] font-bold">
                <span>Rabi Sowing Ready: Instant Hub Dispatch</span>
              </div>
            </div>

            {/* Hero Main Lockup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdbe50]/30 text-[#714d00] self-start">
                  <Truck className="w-[18px] h-[18px] text-[#7e5700]" />
                  <span className="text-[14px] font-bold uppercase tracking-wider">Free Farmgate Delivery Available</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-[36px] font-bold text-[#003629] tracking-tight leading-tight">
                    Kisan Ki Unnati, <span className="text-[#7e5700] underline decoration-[#fdbe50] decoration-4 underline-offset-4">Sahi Yantra Se</span>
                  </h1>
                  <p className="text-[20px] font-semibold text-[#141e18]">
                    आपल्या जवळची शेती अवजारे थेट बांधावर भाड्याने मिळवा
                  </p>
                </div>
                <p className="text-[17px] text-[#404945] max-w-xl">
                  Rent high-power tractors, laser levelers, and automated harvesters from certified local Custom Hiring Centers (CHCs) and verified owners. Includes skilled operators and diesel fuel transparency.
                </p>
                
                {/* Search Widget */}
                <div className="bg-[#ffffff] p-4 rounded-xl shadow-xl mt-4 border border-[#dae5dc]">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <label className="text-[14px] text-[#003629] font-bold">Location</label>
                      <input type="text" defaultValue="Dindori, Nashik" className="h-12 px-3 rounded-lg bg-[#ebf7ed] border border-[#c0c9c3] outline-none" />
                    </div>
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <label className="text-[14px] text-[#003629] font-bold">Required Machinery</label>
                      <select className="h-12 px-3 rounded-lg bg-[#ebf7ed] border border-[#c0c9c3] outline-none">
                        <option>Tractor (35-75 HP)</option>
                        <option>Harvester</option>
                        <option>Rotavator</option>
                        <option>Kisan Drone</option>
                        <option>Baler & Thresher</option>
                      </select>
                    </div>
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <label className="text-[14px] text-[#003629] font-bold">Rental Model</label>
                      <select className="h-12 px-3 rounded-lg bg-[#ebf7ed] border border-[#c0c9c3] outline-none">
                        <option>Hourly</option>
                        <option>Daily</option>
                        <option>Acre-based</option>
                      </select>
                    </div>
                    <div className="md:col-span-3 flex items-center gap-2">
                      <button onClick={() => navigate('/rent')} className="flex-1 h-12 bg-[#fdbe50] hover:bg-[#7e5700] text-[#281900] hover:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                        <Search className="w-5 h-5" /> Find
                      </button>
                      <button className="h-12 w-12 bg-[#003629] text-[#ffdead] rounded-lg flex items-center justify-center shadow-md transition-all hover:bg-[#1b4d3e]">
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="lg:col-span-5 relative">
                <img 
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-xl" 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/85/Ford_8N.jpg" 
                  alt="Tractor" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Live Fleet Counter */}
        <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-8">
          <div className="bg-[#ebf7ed] rounded-xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#dae5dc]">
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex items-center gap-2 text-[#003629] font-bold">
                <Activity className="w-5 h-5 text-[#003809] animate-pulse" />
                <span>LIVE FLEET RADAR: NASHIK RURAL REGION</span>
              </div>
              <h2 className="text-2xl font-bold text-[#003629]">142 Agricultural Machines Active in 25 km Radius</h2>
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-[#dae5dc]">
                <span className="block text-2xl font-bold text-[#003629]">38</span>
                <span className="text-sm text-[#404945]">Tractors Ready</span>
              </div>
              <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-[#dae5dc]">
                <span className="block text-2xl font-bold text-[#7e5700]">14</span>
                <span className="text-sm text-[#404945]">Harvesters</span>
              </div>
              <div className="bg-white p-4 rounded-xl text-center shadow-sm border border-[#dae5dc]">
                <span className="block text-2xl font-bold text-[#003809]">100%</span>
                <span className="text-sm text-[#404945]">CHC Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual 4-Step Process */}
        <section className="w-full bg-[#e5f1e7] py-16">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-10 flex flex-col gap-8">
            <div className="text-center">
              <h2 className="text-[28px] font-bold text-[#003629]">How It Works (कसे कार्य करते)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Select Location & Crop', mr: 'गाव व पीक निवडा', icon: <MapPin /> },
                { title: 'Choose Machinery & Driver', mr: 'यंत्र व चालक निवडा', icon: <Settings /> },
                { title: 'Book via Website or Call', mr: 'थेट बुकिंग करा', icon: <Phone /> },
                { title: 'Work on Field & Pay After', mr: 'काम झाल्यावर पैसे द्या', icon: <CheckCircle2 /> }
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center border border-[#dae5dc] flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#003629] text-[#a3f69c] flex items-center justify-center mb-4 font-bold text-xl">{i+1}</div>
                  <h3 className="font-bold text-[#003629]">{step.title}</h3>
                  <p className="text-[#7e5700] text-sm mt-1">{step.mr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Machinery */}
        <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-12 flex flex-col gap-8">
          <div className="flex flex-col">
            <h2 className="text-[28px] font-bold text-[#003629]">Explore Machinery by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEquipment.slice(0, 3).map(eq => (
              <div key={eq.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-all border border-[#dae5dc]">
                <div className="relative h-48 overflow-hidden">
                  <img src={eq.image} alt={eq.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-[#003629] text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow">
                    <Verified className="w-3 h-3 text-[#a3f69c]" /> {eq.village}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#fdbe50] text-[#281900] px-2 py-1 rounded text-sm font-bold shadow">
                    From ₹{eq.rateHr} / hr
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#003629]">{eq.title}</h3>
                    <p className="text-[13px] text-[#404945] mt-1">{eq.features.join(' • ')}</p>
                  </div>
                  <button onClick={() => navigate('/rent')} className="w-full py-3 bg-[#003629] hover:bg-[#1b4d3e] text-white font-bold rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Mechanization Economics Calculator */}
        <section className="w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-[#dae5dc]">
            <div className="flex flex-col gap-4">
              <h2 className="text-[28px] font-bold text-[#003629]">Why Buying Machinery Drains Farm Capital</h2>
              <p className="text-[#404945]">Annual depreciation, loans at 12% interest, and seasonal idle time cost smallholders heavily. Renting converts fixed asset stress into flexible pay-as-you-farm utility.</p>
              
              <div className="mt-4">
                <label className="font-bold text-[#003629]">Select Landholding: <span className="text-[#7e5700]">{acres} Acres</span></label>
                <input 
                  type="range" min="1" max="25" value={acres} 
                  onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full h-2 bg-[#e5f1e7] rounded-lg appearance-none cursor-pointer mt-2 accent-[#003629]"
                />
              </div>
            </div>
            
            <div className="bg-[#ebf7ed] p-6 rounded-xl flex flex-col gap-4">
              <h3 className="font-bold text-[#003629]">Annual Cost Analysis ({acres} Acres)</h3>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#141e18]">Traditional Ownership (Tractor + Implements)</span>
                  <span className="font-bold text-[#ba1a1a]">₹{traditionalCost.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#dae5dc] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#707974] h-full w-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#003629] font-bold">On-Demand KrushiYantr Rental</span>
                  <span className="font-bold text-[#003809]">₹{rentalCost.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#dae5dc] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#fdbe50] h-full rounded-full" style={{ width: `${Math.min((rentalCost / traditionalCost) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div className="mt-2 pt-4 border-t border-[#c0c9c3] flex justify-between">
                <span className="font-bold text-[#003629]">Net Farmer Savings</span>
                <span className="font-bold text-[#003809] text-xl">₹{savings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials & Hotline */}
        <section className="w-full bg-[#e5f1e7] py-16">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-10 flex flex-col gap-8">
            <h2 className="text-[28px] font-bold text-[#003629] text-center">Trusted by 50,000+ Progressive Kisans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Bhausaheb', loc: 'Dindori, Nashik', text: 'Got a harvester in 2 hours during peak season. Saved my crop!' },
                { name: 'Rajendra Singh', loc: 'Niphad', text: 'Drone spraying saved 60% of my labour costs and was extremely fast.' },
                { name: 'Sachin D.', loc: 'Kalwan Hub (Owner)', text: 'KrushiYantr keeps my tractor busy all year. Earned extra ₹70k last month.' }
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-[#dae5dc]">
                  <div className="flex text-[#fdbe50] mb-2">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="italic text-[#404945] mb-4">"{t.text}"</p>
                  <div className="font-bold text-[#003629]">{t.name}</div>
                  <div className="text-sm text-[#7e5700]">{t.loc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#003629] text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Instant Machine Dispatch?</h3>
                <p className="text-[#9ed1bd]">Call our 24x7 toll-free helpline to book in Marathi, Hindi, or English.</p>
              </div>
              <a href="tel:1800456789" className="whitespace-nowrap px-8 py-4 bg-[#fdbe50] hover:bg-[#7e5700] text-[#281900] hover:text-white font-bold rounded-xl flex items-center gap-3 text-lg transition-colors">
                <Phone className="w-6 h-6" /> 1800-456-789
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};
