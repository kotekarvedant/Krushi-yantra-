import React, { useState } from 'react';
import { X, Lock, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { setUser, t, setRole } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'owner'>('farmer');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep(2);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setUser({
        name: isLogin ? 'Ramesh Patil' : name || 'New User',
        phone: phone,
        isLoggedIn: true,
      });
      setRole(selectedRole);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#141e18]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative border border-[#dae5dc]">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f1fcf2] flex items-center justify-center text-[#404945] hover:text-[#141e18]">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-[#003629] mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-[14px] text-[#404945]">
            {isLogin ? 'Login to access your farm equipment.' : 'Join the KrushiYantr community today.'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-bold text-[#003629]">Full Name / पूर्ण नाव</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full h-12 px-4 bg-[#f1fcf2] border border-[#c0c9c3] rounded-xl outline-none focus:border-[#003629]"
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-bold text-[#003629]">Phone Number / मोबाईल नंबर</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#404945]">+91</span>
                <input 
                  type="tel" 
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full h-12 pl-12 pr-4 bg-[#f1fcf2] border border-[#c0c9c3] rounded-xl outline-none focus:border-[#003629]"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1 mt-2">
                <label className="text-[14px] font-bold text-[#003629]">I am a / मी आहे</label>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setSelectedRole('farmer')}
                    className={`flex-1 py-2 rounded-xl text-[14px] font-bold transition-all ${selectedRole === 'farmer' ? 'bg-[#003629] text-white' : 'bg-[#e5f1e7] text-[#404945]'}`}
                  >
                    Farmer (शेतकरी)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSelectedRole('owner')}
                    className={`flex-1 py-2 rounded-xl text-[14px] font-bold transition-all ${selectedRole === 'owner' ? 'bg-[#003629] text-white' : 'bg-[#e5f1e7] text-[#404945]'}`}
                  >
                    Owner (मालक)
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="w-full h-12 bg-[#fdbe50] hover:bg-[#7e5700] text-[#281900] hover:text-white font-bold rounded-xl mt-4 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Send OTP
            </button>
            
            <div className="text-center mt-2">
              <span className="text-[14px] text-[#404945]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-bold text-[#003629] hover:underline">
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-bold text-[#003629] text-center">Enter 4-digit OTP sent to +91 {phone}</label>
              <div className="flex justify-center mt-4 mb-2">
                <input 
                  type="text" 
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••"
                  className="w-32 h-14 text-center text-2xl tracking-[0.5em] bg-[#f1fcf2] border border-[#c0c9c3] rounded-xl outline-none focus:border-[#003629]"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button type="submit" className="w-full h-12 bg-[#003629] hover:bg-[#1b4d3e] text-white font-bold rounded-xl mt-4 transition-colors flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> Verify & Login
            </button>
            <button type="button" onClick={() => setStep(1)} className="text-[14px] font-bold text-[#404945] hover:text-[#003629] mt-2">
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
