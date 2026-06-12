import React, { useState } from 'react';

interface SignInProps {
  onNext: (phone: string) => void;
  onBack: () => void;
}

export default function SignIn({ onNext, onBack }: SignInProps) {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValid = phone.trim().length >= 9 && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(phone.trim());
    }
  };

  return (
    <div className="flex-1 bg-white relative overflow-hidden flex flex-col min-h-screen px-8 pt-6 select-none animate-fade-in">
      {/* Decorative Circle */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-purple rounded-full translate-x-20 -translate-y-20 z-0 opacity-10 md:opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between pb-8 pt-2">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-purple transition-colors cursor-pointer"
          aria-label="go back"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-purple tracking-tight leading-none">CBE</span>
          <span className="text-2xl font-black italic text-purple leading-none">Birr</span>
        </div>
        <button className="p-2 -mr-2 text-slate-400 hover:text-purple transition-colors cursor-pointer">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Main Form content */}
      <main className="flex-1 flex flex-col z-10 pt-10">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold text-purple/80 uppercase tracking-[0.15em] mb-1">
            Welcome to CBEBirr plus app
          </p>
          <h1 className="text-3xl font-black text-purple relative inline-block">
            Login
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-purple rounded-full" />
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-[0.15em] ml-1 mb-2">
              Phone number
            </label>
            <div className="flex items-center h-16 border-1.5 border-slate-200 focus-within:border-purple/40 rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-purple/6 transition-all">
              <div className="bg-purple h-full px-5 flex items-center text-white font-bold text-sm select-none">
                +251
              </div>
              <input 
                type="tel" 
                placeholder="9xxxxxxxx" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-1 h-full px-4 text-sm font-bold border-none outline-none text-slate-800 placeholder-slate-300"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!isValid}
            className={`w-full h-16 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] cursor-pointer transition-all active:scale-[0.98] ${
              isValid 
                ? 'bg-purple text-white shadow-lg shadow-purple/20' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </form>

        <div 
          onClick={() => setAgreed(!agreed)}
          className="flex items-start gap-3 mt-6 px-1 cursor-pointer group"
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            agreed ? 'bg-purple border-purple' : 'border-slate-200 group-hover:border-purple/50'
          }`}>
            <svg 
              viewBox="0 0 12 12" 
              className={`w-3 h-3 stroke-white stroke-[3] fill-none transition-transform duration-200 ${agreed ? 'scale-100' : 'scale-0'}`}
            >
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed select-none">
            By signing up, you agree to our <span className="text-purple hover:underline">Terms &amp; Conditions</span> and <span className="text-purple hover:underline">Privacy Policy</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto mb-10 flex flex-col items-center gap-6">
          <div className="bg-[#a0522d]/10 border border-[#a0522d]/20 rounded-full px-6 py-3 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-amber-800/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-800 rounded-full" />
            </div>
            <span className="text-[11px] font-black text-amber-900 tracking-widest uppercase">USSD - OFFLINE</span>
          </div>
          <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">
            © 2026 Commercial Bank of Ethiopia, All Rights Reserved 5.0.0 version.
          </p>
        </div>
      </main>
    </div>
  );
}
