import React, { useState } from 'react';

interface BillPageProps {
  billType: 'water' | 'electric';
  walletBalance: number;
  onBack: () => void;
  onPaySuccess: (type: string, refNum: string, amtStr: string) => void;
}

export default function BillPage({ billType, walletBalance, onBack, onPaySuccess }: BillPageProps) {
  const [refNum, setRefNum] = useState('');
  const [amount, setAmount] = useState('');

  const isWater = billType === 'water';
  const label = isWater ? 'WATER BILL' : 'ELECTRIC BILL';

  const handleContinue = () => {
    if (refNum.trim() && amount.trim() && parseFloat(amount) > 0) {
      if (parseFloat(amount) > walletBalance) {
        alert('Insufficient funds in your simulated wallet balance.');
        return;
      }
      onPaySuccess(label, refNum.trim(), amount.trim());
    }
  };

  const isReady = refNum.trim() !== '' && amount.trim() !== '' && parseFloat(amount) > 0;

  return (
    <div className="flex-1 bg-slate-100 flex flex-col select-none animate-fade-in overflow-y-auto">
      {/* Page Header */}
      <div className="bg-purple text-white px-4 pt-12 pb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-white/20 flex items-center justify-center rounded-full text-white cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-sm font-bold uppercase tracking-widest">{label}</h1>
        </div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          <div className="w-[1px] h-4 bg-white/30 mx-1" />
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      {/* Main card layouts */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            ACCOUNT/REFERENCE NUMBER
          </div>
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl h-13 px-4 gap-2">
            <input 
              type="text" 
              placeholder="Enter number (e.g. 554326)"
              value={refNum}
              onChange={(e) => setRefNum(e.target.value)}
              className="flex-1 border-none outline-none text-sm text-slate-800 bg-transparent placeholder-slate-400 font-semibold"
            />
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#7A1B7B" strokeWidth="1.5" fill="none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            AMOUNT (ETB)
          </div>
          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl h-13 px-4">
            <input 
              type="number" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 border-none outline-none text-base text-slate-800 bg-transparent font-black placeholder-slate-300"
            />
          </div>
          <div className="flex justify-between items-center mt-3 pt-1 select-none font-bold">
            <span className="text-[11px] text-slate-400 font-semibold">Available Balance</span>
            <span className="text-[11px] text-purple">
              ETB {walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <button 
          onClick={handleContinue}
          disabled={!isReady}
          className={`w-full h-14 rounded-full font-black text-[13px] border-none uppercase tracking-widest mt-2 active:scale-[0.98] transition-all cursor-pointer ${
            isReady 
              ? 'bg-purple text-white shadow-lg' 
              : 'bg-purple/40 text-white/70 cursor-not-allowed'
          }`}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
