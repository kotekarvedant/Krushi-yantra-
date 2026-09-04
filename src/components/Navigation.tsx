import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MapPin, Globe, ChevronDown, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { Language } from '../types';
import { AuthModal } from './AuthModal';

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" className="h-8 w-auto" fill="none">
    <g transform="translate(6, 6)">
      <circle cx="24" cy="24" r="22" fill="#1B4D3E" />
      <circle cx="24" cy="24" r="16" stroke="#E5A93C" strokeWidth="2.5" strokeDasharray="6 3" />
      <path d="M24 33V20M24 20C24 15 17 14 15 19C13 24 19 25 24 20ZM24 24C24 19 31 18 33 23C35 28 29 29 24 24Z" stroke="#FBF8F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#E5A93C" fillOpacity="0.3" />
      <circle cx="24" cy="33" r="2" fill="#E5A93C" />
    </g>
    <text x="62" y="32" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="22" fill="#1B4D3E" letterSpacing="-0.5">Krushi<tspan fill="#C68A1E">Yantr</tspan></text>
    <text x="63" y="47" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="11" fill="#5C6B61" letterSpacing="0.3">कृषी यंत्र • FARM EQUIPMENT</text>
  </svg>
);

export const Navigation = () => {
  const { role, setRole, language, setLanguage, t, user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleRoleSwitch = (newRole: 'farmer' | 'owner') => {
    setRole(newRole);
    if (newRole === 'owner') {
      navigate('/owner');
    } else {
      navigate('/rent');
    }
  };

  const handleLogout = () => {
    setUser({ name: '', phone: '', isLoggedIn: false });
    navigate('/');
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-24 max-w-[1280px] mx-auto px-4 lg:px-10 flex flex-col justify-between py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <LogoSVG />
            </Link>
            
            <div className="hidden sm:flex items-center gap-1 bg-[#e5f1e7] px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#e0ebe1] transition-colors">
              <MapPin className="text-[#003629] w-[18px] h-[18px]" />
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#141e18] leading-tight">Nashik District, MH</span>
                <span className="text-[12px] font-medium text-[#404945] leading-tight">नाशिक विभाग</span>
              </div>
              <ChevronDown className="text-[#707974] w-[16px] h-[16px]" />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="flex items-center bg-[#ebf7ed] p-1 rounded-full">
              <button 
                onClick={() => handleRoleSwitch('farmer')}
                className={`px-3 py-1 rounded-full text-[14px] font-semibold transition-colors ${role === 'farmer' ? 'bg-[#1b4d3e] text-white shadow-sm' : 'text-[#404945] hover:text-[#141e18]'}`}
              >
                {t('Farmer')}
              </button>
              <button 
                onClick={() => handleRoleSwitch('owner')}
                className={`px-3 py-1 rounded-full text-[14px] font-semibold transition-colors ${role === 'owner' ? 'bg-[#1b4d3e] text-white shadow-sm' : 'text-[#404945] hover:text-[#141e18]'}`}
              >
                {t('Owner')}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-[#e5f1e7] px-3 py-1.5 rounded-full text-[#404945] hover:text-[#141e18] cursor-pointer">
              <Globe className="w-[18px] h-[18px]" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent outline-none text-[14px] font-semibold cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-[#c0c9c3]">
              {user.isLoggedIn ? (
                <>
                  <img 
                    alt="Profile" 
                    src="https://upload.wikimedia.org/wikipedia/commons/8/81/Woman_at_work%2C_Gujarat.jpg" 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#fdbe50]" 
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-[14px] font-semibold text-[#141e18] leading-tight">{user.name}</span>
                    <span className="text-[12px] font-medium text-[#7e5700] leading-tight">प्रमाणित {role === 'farmer' ? 'शेतकरी' : 'मालक'}</span>
                  </div>
                  <button onClick={handleLogout} className="ml-2 text-[#ba1a1a] hover:bg-[#ffdad6] p-1.5 rounded-full transition-colors" title="Logout">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="px-4 py-1.5 bg-[#003629] text-white text-[14px] font-bold rounded-full hover:bg-[#1b4d3e] transition-colors flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" /> Login
                </button>
              )}
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto pb-1 mt-2 scrollbar-hide">
          {[
            { to: '/', title: 'Home & Explore', titleMr: 'मुख्य पृष्ठ' },
            { to: '/rent', title: 'Rent Equipment', titleMr: 'भाड्याने घ्या' },
            { to: '/owner', title: 'Owner Dashboard', titleMr: 'उपकरण मालक' },
            { to: '/bookings', title: 'My Bookings', titleMr: 'माझे आरक्षण' },
            { to: '/support', title: 'Help & Voice Support', titleMr: 'मदत केंद्र (1800-456-789)' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `inline-flex flex-col items-center justify-center px-4 py-1 rounded-xl min-h-[3rem] transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#1b4d3e] text-white font-bold' 
                    : 'text-[#404945] hover:bg-[#e5f1e7] hover:text-[#141e18]'
                }`
              }
            >
              <span className="text-[16px] font-semibold leading-tight">{t(link.title)}</span>
              <span className="text-[12px] font-medium leading-tight opacity-90">{link.titleMr}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
