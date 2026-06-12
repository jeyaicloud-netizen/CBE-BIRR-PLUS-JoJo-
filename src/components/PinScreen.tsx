import React, { useState, useEffect } from 'react';

interface PinScreenProps {
  onBack: () => void;
  onSuccess: () => void;
  masterPin: string;
}

export default function PinScreen({ onBack, onSuccess, masterPin }: PinScreenProps) {
  const [pinVal, setPinVal] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (pinVal.length === 4) {
      const t = setTimeout(() => {
        if (pinVal === masterPin) {
          onSuccess();
        } else {
          setIsError(true);
          const failTimer = setTimeout(() => {
            setPinVal('');
            setIsError(false);
          }, 1000);
          return () => clearTimeout(failTimer);
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [pinVal, masterPin, onSuccess]);

  const handleNumPress = (num: string) => {
    if (pinVal.length < 4 && !isError) {
      setIsError(false);
      setPinVal(prev => prev + num);
    }
  };

  const handleDelPress = () => {
    if (!isError) {
      setIsError(false);
      setPinVal(prev => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex-1 bg-white relative overflow-hidden flex flex-col min-h-screen select-none animate-fade-in pb-8">
      {/* Decorative design */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple rounded-full translate-x-20 -translate-y-20 z-0 opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <button 
          onClick={onBack}
          className="w-11 h-11 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-purple shadow-sm transition-all cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </header>

      {/* Main pin panel */}
      <main className="flex-1 flex flex-col items-center px-8 pt-10 z-10 relative">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Login Authentication</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">
            Please enter valid PIN to continue
          </p>
        </div>

        {/* Pin Dots */}
        <div className="flex gap-5 my-10" id="pin-dots">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pinVal.length > idx;
            return (
              <div 
                key={idx}
                className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                  isError 
                    ? 'border-red-500 bg-red-50' 
                    : isFilled 
                      ? 'border-purple bg-white shadow-lg shadow-purple/10' 
                      : 'border-slate-100 bg-slate-50'
                }`}
              >
                {isFilled && (
                  <div className={`w-3 h-3 rounded-full ${isError ? 'bg-red-500' : 'bg-purple'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Incorrect PIN Display */}
        <div className="h-6 mb-6">
          {isError && (
            <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.15em] animate-bounce">
              Incorrect PIN. Please try again.
            </p>
          )}
        </div>

        {/* Custom Numpad */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full max-w-[320px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button 
              key={num}
              onClick={() => handleNumPress(num)}
              className="h-16 bg-white border border-slate-100 rounded-2xl text-xl font-black text-slate-800 shadow-sm active:scale-95 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div className="h-16" />
          <button 
            onClick={() => handleNumPress('0')}
            className="h-16 bg-white border border-slate-100 rounded-2xl text-xl font-black text-slate-800 shadow-sm active:scale-95 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all flex items-center justify-center"
          >
            0
          </button>
          <button 
            onClick={handleDelPress}
            className="h-16 bg-white border border-slate-100 rounded-2xl text-slate-500 flex items-center justify-center shadow-sm active:scale-95 hover:bg-slate-50 cursor-pointer transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current stroke-[1.5] fill-none">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </div>

        {/* USSD OFFLINE badge at bottom */}
        <div className="mt-auto pt-10 pb-2">
          <div className="bg-gold border border-gold/30 rounded-full px-8 py-4 flex items-center gap-3 shadow-lg shadow-gold/25 select-none">
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-[11px] font-black text-white tracking-widest uppercase">USSD - OFFLINE</span>
          </div>
        </div>
      </main>
    </div>
  );
}
