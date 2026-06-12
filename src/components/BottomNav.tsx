import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] h-[78px] bg-transparent z-[110] select-none pb-2">
      
      {/* Primary White navigation bar base */}
      <div className="absolute bottom-0 left-0 right-0 h-[62px] bg-white border-t border-slate-100 shadow-[0_-8px_24px_rgba(0,0,0,0.05)] rounded-t-[26px] flex items-center justify-between px-3">
        
        {/* Left spacing reserved for the floating Home orb */}
        <div className="w-[66px]" />

        {/* Pay Tab */}
        <button 
          onClick={() => onTabChange('transfer')}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer"
        >
          <div className={`p-1 transition-colors ${activeTab === 'transfer' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth="2.1" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="11" x2="22" y2="11" strokeWidth="2.5" />
            </svg>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-wider leading-none mt-0.5 ${activeTab === 'transfer' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            Pay
          </span>
        </button>

        {/* CBEBeje Tab */}
        <button 
          onClick={() => onTabChange('cbebeje')}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer"
        >
          <div className={`p-1 transition-colors ${activeTab === 'cbebeje' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            <div className="w-5 h-5 rounded-full border-1.5 border-current flex items-center justify-center leading-none text-center p-0.5">
              <span className="text-[5.5px] font-black font-serif uppercase tracking-tighter">CBE</span>
            </div>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-wider leading-none mt-0.5 ${activeTab === 'cbebeje' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            CBEBeje
          </span>
        </button>

        {/* Mini Apps Tab */}
        <button 
          onClick={() => onTabChange('miniapps')}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer"
        >
          <div className={`p-1 transition-colors ${activeTab === 'miniapps' ? 'text-[#7A1C7C]' : 'text-slate-455'}`}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
              {/* 2x3 square block grid layout inside photo 1 */}
              <circle cx="6" cy="6" r="2.3" />
              <circle cx="12" cy="6" r="2.3" />
              <circle cx="18" cy="6" r="2.3" />
              <circle cx="6" cy="14" r="2.3" />
              <circle cx="12" cy="14" r="2.3" />
              <circle cx="18" cy="14" r="2.3" />
            </svg>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-wider leading-none mt-0.5 ${activeTab === 'miniapps' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            Mini Apps
          </span>
        </button>

        {/* Others Tab */}
        <button 
          onClick={() => onTabChange('others')}
          className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer"
        >
          <div className={`p-1 transition-colors ${activeTab === 'others' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.3" fill="none">
              <circle cx="6" cy="12" r="1.5" fill="currentColor" />
              <line x1="10" y1="12" x2="20" y2="12" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
              <line x1="10" y1="6" x2="20" y2="6" />
              <circle cx="6" cy="18" r="1.5" fill="currentColor" />
              <line x1="10" y1="18" x2="20" y2="18" />
            </svg>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-wider leading-none mt-0.5 ${activeTab === 'others' ? 'text-[#7A1C7C]' : 'text-slate-450'}`}>
            Others
          </span>
        </button>

        {/* Right spacing reserved for the floating scanner / fuel pay orb */}
        <div className="w-[66px]" />
      </div>

      {/* FLOAT 1: Elevated House tab container on the left */}
      <div className="absolute -top-3.5 left-5 z-[120]">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-[48px] h-[48px] rounded-full border-3 border-white flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeTab === 'dashboard' 
              ? 'bg-[#59145A] text-[#FFE58F] shadow-[0_6px_16px_rgba(89,20,90,0.4)]' 
              : 'bg-slate-700 text-white shadow-md'
          }`}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.3" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>
      </div>

      {/* FLOAT 2: Elevated purple scanner trigger on the right side labeled "Fuel Pay" */}
      <div className="absolute -top-4 right-5 z-[120] flex flex-col items-center">
        <button 
          onClick={() => onTabChange('transfer')}
          className="w-[48px] h-[48px] rounded-xl bg-[#7A1C7C] border-2 border-white text-white flex items-center justify-center shadow-[0_6px_16px_rgba(122,28,124,0.4)] active:scale-92 cursor-pointer hover:brightness-110 transition-all"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none">
            {/* Custom high contrast QR code finder loops */}
            <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth="2.2" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth="2.2" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth="2.2" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth="2.2" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </button>
        <span className="text-[7px] font-black uppercase text-[#7A1C7C] tracking-wider mt-1 select-none">
          Fuel Pay
        </span>
      </div>

    </div>
  );
}
