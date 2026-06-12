import React from 'react';

interface CbeBejeProps {
  onBack: () => void;
}

export default function CbeBeje({ onBack }: CbeBejeProps) {
  return (
    <div className="flex-1 bg-white flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="bg-purple text-white px-4 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <h1 className="text-sm font-bold uppercase tracking-wider">CBEBEJE</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black/25 flex items-center justify-center rounded-full text-white font-black text-xs">
            N
          </div>
          <div className="bg-white/15 border border-white/20 rounded-full py-0.5 px-3 text-[10px] font-bold">
            EN
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6 flex-1">
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full border-2 border-slate-100 flex flex-col items-center justify-center mb-2 shadow-sm">
            <span className="text-[10px] font-bold text-amber-800">CBE</span>
            <span className="text-xl font-black italic text-amber-800">Beje</span>
          </div>
        </div>

        <div className="flex justify-center gap-12 mb-6">
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="w-16 h-16 rounded-full border-2 border-amber-800 flex items-center justify-center bg-amber-500/5">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="#8B4513" strokeWidth="1.5" fill="none">
                <line x1="3" y1="22" x2="3" y2="2" />
                <polyline points="3 22 21 22" />
                <path d="M3 12h18M3 6h12v4H3z" />
              </svg>
            </div>
            <span className="text-xs font-bold text-purple">Ordinary</span>
            <div className="w-8 h-1 bg-purple rounded-full" />
          </div>

          <div className="flex flex-col items-center gap-2 cursor-pointer opacity-50">
            <div className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="#9ca3af" strokeWidth="1.5" fill="none">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
              </svg>
            </div>
            <span className="text-xs font-bold text-slate-400">Overdraft</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 bg-amber-100/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#8B4513" strokeWidth="1.5" fill="none">
                <line x1="3" y1="22" x2="3" y2="2" />
                <polyline points="3 22 21 22" />
                <path d="M3 12h18M3 6h12v4H3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-slate-800">MICRO SAVING</div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Save money and earn 7% interest.</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#d1d5db" strokeWidth="1.5" fill="none">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 bg-amber-100/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#8B4513" strokeWidth="1.5" fill="none">
                <line x1="3" y1="22" x2="3" y2="2" />
                <polyline points="3 22 21 22" />
                <path d="M3 12h18M3 6h12v4H3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-slate-800">MICRO LOAN</div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Let's assist to process a micro loan easily.</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#d1d5db" strokeWidth="1.5" fill="none">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 bg-amber-100/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#8B4513" strokeWidth="1.5" fill="none">
                <line x1="3" y1="22" x2="3" y2="2" />
                <polyline points="3 22 21 22" />
                <path d="M3 12h18M3 6h12v4H3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xs font-black text-slate-800">FIXED SAVING</div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Earn more interest(8% +) by saving using CBEBirr.</p>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#d1d5db" strokeWidth="1.5" fill="none">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
