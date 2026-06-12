import React, { useEffect, useState } from 'react';

interface SplashProps {
  onFinish: () => void;
}

export default function Splash({ onFinish }: SplashProps) {
  const [animate, setAnimate] = useState(false);
  const [showBranding, setShowBranding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    const t2 = setTimeout(() => {
      setShowBranding(true);
    }, 1900);

    const t3 = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-purple z-50 flex flex-col items-center justify-center overflow-hidden animate-fade-in select-none">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-purple via-purple-mid to-purple-dark opacity-50"
      />
      
      {/* Logo wrap */}
      <div 
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ease-out transform ${
          animate ? '-translate-y-20 scale-75' : 'translate-y-0 scale-100'
        }`}
      >
        <div className="bg-white px-8 py-7 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="text-purple font-black text-sm tracking-tight mr-10 leading-none">CBE</div>
          <div className="text-purple font-black italic text-5xl leading-none">Birr</div>
          <div className="text-purple font-bold text-[10px] mt-2 tracking-widest Amharic">ባሉበት ሁሉ አለ!</div>
        </div>
      </div>

      {/* Branding */}
      <div 
        className={`absolute bottom-20 left-0 right-0 flex flex-col items-center gap-2 text-white z-10 transition-all duration-1000 ease-out transform ${
          showBranding ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-sm font-bold tracking-widest uppercase text-center px-4">Commercial Bank of Ethiopia</h2>
        <p className="text-[10px] opacity-70 italic tracking-widest text-center px-4">The Bank You Can Always Rely On!</p>
        
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
          <div className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase">System Initializing</div>
        </div>
      </div>
    </div>
  );
}
