import React from 'react';

interface SuccessScreenProps {
  tid: string;
  receiver: string;
  accNum: string;
  amount: string;
  dateStr: string;
  timeStr: string;
  newBalance: string;
  onClose: () => void;
  onOpenReceipt: () => void;
  onOpenSaveAccount: () => void;
}

export default function SuccessScreen({
  tid,
  receiver,
  accNum,
  amount,
  dateStr,
  timeStr,
  newBalance,
  onClose,
  onOpenReceipt,
  onOpenSaveAccount
}: SuccessScreenProps) {

  const successMessage = `ETB ${parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })} debited from your account for ${receiver} (${accNum || 'N/A'}) on ${dateStr} at ${timeStr} with Transaction ID: ${tid} via CBEBirr mobile app's Select Transfer (Ok). Your current balance is ETB ${parseFloat(newBalance || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}.`;

  // Dynamic QR Code SVG matrix generator! Generates a mock standard QR code design with finder patterns
  const renderMockQR = () => {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-black bg-white" shapeRendering="crispEdges">
        {/* Finder Pattern - Top Left */}
        <rect x="0" y="0" width="28" height="28" fill="currentColor" />
        <rect x="4" y="4" width="20" height="20" fill="white" />
        <rect x="8" y="8" width="12" height="12" fill="currentColor" />

        {/* Finder Pattern - Top Right */}
        <rect x="72" y="0" width="28" height="28" fill="currentColor" />
        <rect x="76" y="4" width="20" height="20" fill="white" />
        <rect x="80" y="8" width="12" height="12" fill="currentColor" />

        {/* Finder Pattern - Bottom Left */}
        <rect x="0" y="72" width="28" height="28" fill="currentColor" />
        <rect x="4" y="76" width="20" height="20" fill="white" />
        <rect x="8" y="80" width="12" height="12" fill="currentColor" />

        {/* Alignment pattern */}
        <rect x="76" y="76" width="12" height="12" fill="currentColor" />
        <rect x="80" y="80" width="4" height="4" fill="white" />

        {/* Timing pattern lines */}
        <line x1="28" y1="6" x2="72" y2="6" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
        <line x1="6" y1="28" x2="6" y2="72" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />

        {/* Checkerboard mock randomized data bytes matrix */}
        <path d="
          M 32,12 h 4 v 4 h -4 z  M 40,8 h 8 v 4 h -8 z  M 52,4 h 4 v 8 h -4 z  M 60,0 h 8 v 4 h -8 z
          M 32,24 h 8 v 4 h -8 z  M 48,20 h 4 v 4 h -4 z  M 56,16 h 12 v 4 h -12 z
          M 4,32 h 12 v 4 h -12 z  M 20,36 h 4 v 8 h -4 z  M 28,40 h 8 v 4 h -8 z  M 44,32 h 8 v 4 h -8 z  M 56,36 h 4 v 4 h -4 z
          M 12,48 h 4 v 4 h -4 z  M 24,52 h 8 v 4 h -8 z  M 36,48 h 12 v 4 h -12 z  M 52,52 h 8 v 4 h -8 z  M 64,48 h 4 v 8 h -4 z
          M 0,60 h 8 v 4 h -8 z   M 16,56 h 4 v 12 h -4 z  M 28,60 h 12 v 4 h -12 z  M 48,56 h 4 v 4 h -4 z  M 56,60 h 8 v 4 h -8 z
          M 32,72 h 4 v 4 h -4 z  M 40,76 h 8 v 4 h -8 z  M 52,72 h 12 v 4 h -12 z
          M 36,84 h 12 v 4 h -12 z M 52,80 h 4 v 8 h -4 z  M 60,84 h 8 v 4 h -8 z
          M 32,92 h 8 v 4 h -8 z  M 44,96 v -4 h 8 v 4 z    M 56,92 h 12 v 4 h -12 z
        " fill="currentColor" />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#f5f5f5] z-[120] flex flex-col overflow-y-auto w-full select-none animate-fade-in">
      {/* Dynamic Purple Header */}
      <div className="bg-purple px-4 pt-12 pb-5 flex items-center justify-between text-white flex-shrink-0 shadow-md">
        <button 
          onClick={onClose}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 flex items-center justify-center rounded-full transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-sm font-bold uppercase tracking-widest text-[#fff]">Transaction Details</span>
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <div className="bg-white/20 border border-white/15 rounded-full py-0.5 px-3 text-[10px] font-bold">
            EN
          </div>
        </div>
      </div>

      {/* Share / Download Toolbar */}
      <div className="bg-white py-3 px-10 flex items-center justify-between border-b border-slate-100 flex-shrink-0 shadow-sm">
        <button 
          onClick={onOpenReceipt}
          className="p-2 text-purple hover:bg-purple/5 rounded-full transition-colors cursor-pointer flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        <button className="p-2 text-purple hover:bg-purple/5 rounded-full transition-colors cursor-pointer flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button 
          onClick={onClose}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.1" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Content scrollable pane */}
      <div className="flex-1 p-5 pb-10 flex flex-col gap-6 max-w-[430px] mx-auto w-full">
        {/* Thank You Success Banner */}
        <div className="bg-green-custom rounded-full py-4 px-6 flex items-center gap-4 text-white shadow-md select-none">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
            <svg viewBox="0 0 24 24" width="30" height="30" stroke="#56B964" strokeWidth="3.5" fill="none">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-black leading-none">Thank you!</div>
            <div className="text-[11px] font-bold tracking-widest uppercase text-white/90 mt-1">SUCCESS</div>
          </div>
        </div>

        {/* Clear Message metadata text description */}
        <div className="text-center px-4">
          <div className="text-[10px] font-bold tracking-[0.45em] text-slate-400 uppercase mb-4">
            MESSAGE
          </div>
          <p className="text-[14px] font-extrabold text-slate-800 leading-relaxed max-w-sm mx-auto">
            {successMessage}
          </p>
        </div>

        {/* Dynamic High Contrast QR Code with nested central logo overlay card */}
        <div className="flex justify-center select-none">
          <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-100/50 w-[300px] flex flex-col items-center relative">
            <div className="w-[268px] h-[268px] relative rounded-2xl overflow-hidden p-1 bg-white">
              {renderMockQR()}
              
              {/* Nested brand overlay precisely styled to align in absolute center of QR code */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 rounded-xl px-2.5 py-1.5 border-[3px] border-white flex flex-col items-center leading-none shadow-md"
                style={{ width: '80px', height: '48px', justifyContent: 'center' }}
              >
                <span className="text-lg font-black italic text-purple leading-none">Birr</span>
                <div className="bg-purple rounded py-0.5 px-1.5 mt-0.5">
                  <span className="text-[7px] font-black text-white tracking-widest uppercase">PLUS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Bank of Ethiopia Promo brand description card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm select-none">
          <div className="flex flex-col leading-none">
            <span className="text-[8px] font-black text-purple">CBE</span>
            <span className="text-xl font-black italic text-purple">Birr</span>
          </div>
          <div className="border-l border-slate-200 h-8 pl-1" />
          <div>
            <div className="text-xs font-black text-slate-800">Commercial Bank of Ethiopia</div>
            <p className="text-[10px] text-slate-400 italic font-semibold mt-0.5">The Bank You Can Always Rely On!</p>
          </div>
        </div>

        {/* SMS receipt notice display */}
        <p className="text-[11px] text-slate-400 font-bold italic text-center uppercase tracking-wide">
          you will receive a confirmation SMS shortly!
        </p>

        {/* Success Trigger Actions buttons layout */}
        <div className="flex flex-col gap-3 mt-2 pr-1 pl-1">
          <button 
            onClick={onClose}
            className="w-full py-4.5 bg-purple text-white border-none rounded-full font-black text-xs uppercase tracking-widest cursor-pointer select-none shadow-lg active:scale-98 hover:brightness-110 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            BACK TO HOME
          </button>
          
          <button 
            onClick={onOpenReceipt}
            className="w-full py-4.5 bg-purple text-white border-none rounded-full font-black text-xs uppercase tracking-widest cursor-pointer select-none shadow-lg active:scale-98 hover:brightness-110 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            GET RECEIPT
          </button>

          <button 
            onClick={onOpenSaveAccount}
            className="w-full py-4.5 bg-white text-purple border-2 border-purple rounded-full font-black text-xs uppercase tracking-widest cursor-pointer select-none active:scale-98 hover:bg-purple/5 flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            SAVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
}
