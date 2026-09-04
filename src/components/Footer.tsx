import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#e5f1e7] mt-12">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#dae5dc]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[18px] font-bold text-[#003629]">KrushiYantr Agri-Rentals</span>
          <span className="text-[13px] text-[#404945] mt-1">Connecting Indian Agriculture with Shared Mechanization</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-[#404945]">
          <span className="text-[14px] hover:text-[#141e18] cursor-pointer font-bold">SMAM Subsidies</span>
          <span className="text-[14px] hover:text-[#141e18] cursor-pointer font-bold">CHC Depot List</span>
          <span className="text-[14px] hover:text-[#141e18] cursor-pointer font-bold">Safety Guidelines</span>
          <span className="text-[14px] hover:text-[#141e18] cursor-pointer font-bold text-[#7e5700]">Toll-Free: 1800-456-789</span>
        </div>
        
        <div className="text-[13px] text-[#404945] text-center md:text-right font-medium">
          © 2026 KrushiYantr Agri-Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
