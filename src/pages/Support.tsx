import React from 'react';
import { Phone, MessageSquare, HelpCircle, FileText, Verified } from 'lucide-react';

export const Support = () => {
  return (
    <main className="w-full pt-28 bg-[#f1fcf2] min-h-[calc(100vh-160px)] px-4 lg:px-10 pb-12">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-[36px] font-bold text-[#003629] mb-4">Help & Voice Support</h1>
          <p className="text-[#404945] text-lg">
            Our agricultural experts and AI assistant KrushiMitra are here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          
          {/* AI Chatbot Promotion */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#dae5dc] flex flex-col gap-4">
            <div className="w-16 h-16 bg-[#ebf7ed] rounded-full flex items-center justify-center mb-2">
              <MessageSquare className="w-8 h-8 text-[#003629]" />
            </div>
            <h2 className="text-2xl font-bold text-[#003629]">Chat with KrushiMitra AI</h2>
            <p className="text-[#404945]">
              Get instant answers about machinery recommendations, farming techniques, or platform usage. Our AI speaks Marathi, Hindi, and English.
            </p>
            <div className="bg-[#f1fcf2] p-4 rounded-xl mt-4">
              <span className="font-bold text-[#003629]">Try asking:</span>
              <ul className="mt-2 text-sm text-[#404945] space-y-2">
                <li>"What tractor horsepower do I need for hard soil?"</li>
                <li>"रोटाव्हेटर चे एका दिवसाचे भाडे किती असते?"</li>
                <li>"ड्रोन फवारणी साठी बुकिंग कसे करावे?"</li>
              </ul>
            </div>
            <p className="text-sm font-semibold text-[#7e5700] mt-4">
              Click the floating microphone icon at the bottom right to start chatting!
            </p>
          </div>

          {/* FAQ & Manuals */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dae5dc] flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#e5f1e7] rounded-xl text-[#003629]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#141e18]">Frequently Asked Questions</h3>
                <p className="text-sm text-[#404945]">Read answers to common queries</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dae5dc] flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#e5f1e7] rounded-xl text-[#003629]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#141e18]">Machinery User Manuals</h3>
                <p className="text-sm text-[#404945]">Safety guidelines and operations</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dae5dc] flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="p-3 bg-[#e5f1e7] rounded-xl text-[#003629]">
                <Verified className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#141e18]">SMAM Subsidy Details</h3>
                <p className="text-sm text-[#404945]">Check your eligibility for Govt benefits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toll Free Banner */}
        <div className="mt-8 bg-[#003629] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#1b4d3e] rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-[32px] font-bold mb-2">Speak to a Human Expert</h2>
            <p className="text-[#9ed1bd] text-lg">
              Facing an issue on the field? Call our 24x7 toll-free helpline. We are here to ensure your farm work never stops.
            </p>
          </div>
          
          <a href="tel:1800456789" className="relative z-10 whitespace-nowrap px-8 py-5 bg-[#fdbe50] hover:bg-[#7e5700] text-[#281900] hover:text-white font-bold rounded-xl flex items-center gap-3 text-xl transition-all hover:scale-105 shadow-lg">
            <Phone className="w-6 h-6" /> 1800-456-789
          </a>
        </div>
      </div>
    </main>
  );
};
