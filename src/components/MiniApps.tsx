import React from 'react';
import { miniAppsData } from '../data/mockData';

interface MiniAppsProps {
  onBack: () => void;
}

export default function MiniApps({ onBack }: MiniAppsProps) {
  return (
    <div className="flex-1 bg-slate-100 flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="bg-purple text-white px-4 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <h1 className="text-sm font-bold uppercase tracking-wider">MINI APPS</h1>
        </div>
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Grid apps list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {miniAppsData.map((app, idx) => {
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2.5 shadow-sm border border-slate-100/50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: app.bg }}
                >
                  {app.emoji ? (
                    <span className="text-3xl">{app.emoji}</span>
                  ) : app.cbe ? (
                    <div className="flex flex-col items-center leading-none text-white">
                      <span className="text-[7px] font-black">CBE</span>
                      <span className="text-[12px] font-black italic">Birr</span>
                    </div>
                  ) : app.letter ? (
                    <span 
                      className={`font-black uppercase tracking-tight text-center ${app.letter.length > 2 ? 'text-xs' : 'text-xl'}`}
                      style={{ color: app.color || '#fff' }}
                    >
                      {app.letter}
                    </span>
                  ) : app.svg === 'globe' ? (
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke={app.color || '#fff'} strokeWidth="1.5" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  ) : app.svg === 'plane' ? (
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke={app.color || '#fff'} strokeWidth="1.5" fill="none">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 1-4 1L5 8.2l-2 2 3.5.8L4 14l-2 1 3 3 1-2 3.5 2 .8 3.5 2-2L11 16l.8 3.5z" />
                    </svg>
                  ) : app.svg === 'target' ? (
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke={app.color || '#fff'} strokeWidth="1.5" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  ) : app.svg === 'pen' ? (
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke={app.color || '#fff'} strokeWidth="1.5" fill="none">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  ) : (
                    <span className="text-white text-xs font-bold">App</span>
                  )}
                </div>
                <span className="text-[10px] font-black text-slate-600 text-center leading-tight">
                  {app.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
