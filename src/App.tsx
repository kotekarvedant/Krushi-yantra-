/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { RenterPortal } from './pages/RenterPortal';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { KrushiMitra } from './components/KrushiMitra';
import { Footer } from './components/Footer';
import { MyBookings } from './pages/MyBookings';
import { Support } from './pages/Support';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#f1fcf2] font-sans text-[#141e18] flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rent" element={<RenterPortal />} />
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </div>
          <Footer />
          <KrushiMitra />
        </div>
      </Router>
    </AppProvider>
  );
}

