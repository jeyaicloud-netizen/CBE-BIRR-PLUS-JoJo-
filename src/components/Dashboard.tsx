import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { allServices } from '../data/mockData';
import CbeGoldLogo from './CbeGoldLogo';

interface DashboardProps {
  ownerName: string;
  walletBalance: number;
  onNavigate: (tab: string) => void;
  onOpenSaveAccount: () => void;
  onOpenSavedAccounts: () => void;
}

export default function Dashboard({ 
  ownerName, 
  walletBalance, 
  onNavigate, 
  onOpenSaveAccount, 
  onOpenSavedAccounts 
}: DashboardProps) {
  const [balVisible, setBalVisible] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const displayedServices = servicesExpanded ? allServices : allServices.slice(0, 8);

  const handleServiceClick = (id: string) => {
    if (id === 'other_bank' || id === 'linked_bank' || id === 'send_money' || id === 'to_cbe' || id === 'cash_out' || id === 'magic_pay') {
      onNavigate('transfer');
    } else if (id === 'history' || id === 'scheduled') {
      onNavigate('history');
    } else if (id === 'save_account') {
      onOpenSaveAccount();
    } else if (id === 'saved_accounts') {
      onOpenSavedAccounts();
    } else if (id === 'water') {
      onNavigate('waterbill');
    } else if (id === 'electric' || id === 'airtime' || id === 'airtime_pkg') {
      onNavigate('electricbill');
    }
  };

  // 8 Specific Quick Access elements exactly matching Photo 1 labels and custom purple line illustrations
  const quickAccessItems = [
    { id: 'linked_bank', label: 'Linked Bank Acct', icon: 'linked_bank' },
    { id: 'send_money', label: 'Send Money', icon: 'send_money' },
    { id: 'to_cbe', label: 'To CBE Acct', icon: 'to_cbe' },
    { id: 'airtime', label: 'Air Time', icon: 'airtime' },
    { id: 'cash_out', label: 'Cash Out', icon: 'cash_out' },
    { id: 'airtime_pkg', label: 'Airtime Package', icon: 'airtime_pkg' },
    { id: 'scheduled', label: 'Scheduled Pay', icon: 'scheduled' },
    { id: 'magic_pay', label: 'MagicPay', icon: 'magic_pay' }
  ];

  // Helper to render high fidelity lines-illustration matching icons in Photo 1
  const renderQuickAccessIcon = (icon: string) => {
    switch (icon) {
      case 'linked_bank':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Home with key/lock combination */}
            <path d="M3 21h18M5 21V10l7-6 7 6v11" />
            <rect x="10" y="14" width="4" height="7" fill="#7A1B7B" opacity="0.15" />
            <circle cx="12" cy="11" r="2" strokeWidth="2" />
            <path d="M12 9V7" strokeWidth="1.8" />
          </svg>
        );
      case 'send_money':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Arrow passing upward from banknotes */}
            <rect x="3" y="10" width="18" height="11" rx="2" strokeWidth="1.8" />
            <circle cx="12" cy="15.5" r="2.2" />
            <polyline points="9 5 12 2 15 5" strokeWidth="2" />
            <line x1="12" y1="2" x2="12" y2="10" strokeWidth="2" />
          </svg>
        );
      case 'to_cbe':
        return (
          <div className="w-6 h-6 bg-[#7A1B7B] rounded-full flex items-center justify-center p-0.5 shadow-sm">
            <span className="text-[5.5px] text-white font-black leading-none uppercase tracking-tighter">CBE</span>
          </div>
        );
      case 'airtime':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Mobile phone screen layout */}
            <rect x="6" y="2" width="12" height="20" rx="3" strokeWidth="1.8" />
            <rect x="8" y="5" width="8" height="11" rx="1" fill="#7A1B7B" opacity="0.15" />
            <circle cx="12" cy="19" r="1" fill="#7A1B7B" />
          </svg>
        );
      case 'cash_out':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Slot with inserting card illustration */}
            <line x1="2" y1="18" x2="22" y2="18" strokeWidth="2.2" />
            <rect x="5" y="4" width="14" height="10" rx="1.5" />
            <line x1="9" y1="7" x2="15" y2="7" strokeWidth="2.5" />
            <path d="M12 14v4" strokeWidth="2" />
          </svg>
        );
      case 'airtime_pkg':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Gift card / wrapped airtime packet logo */}
            <rect x="3" y="11" width="18" height="10" rx="1" />
            <rect x="2" y="7" width="20" height="4" rx="0.5" fill="#7A1B7B" opacity="0.2" />
            <line x1="12" y1="7" x2="12" y2="21" strokeWidth="1.5" />
            <path d="M12 7c-1.5-3-5-3-5 0s3.5 3 5 0c1.5-3 5-3 5 0s-3.5 3-5 0" strokeWidth="1.5" />
          </svg>
        );
      case 'scheduled':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Calendar with notice bubble */}
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <line x1="16" y1="2" x2="16" y2="5" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="5" strokeWidth="2" />
            <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.8" />
            <circle cx="16.5" cy="15.5" r="2.5" fill="#7A1B7B" strokeWidth="1.2" />
          </svg>
        );
      case 'magic_pay':
        return (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="#7A1B7B" strokeWidth="1.8" fill="none">
            {/* Mobile checklist validation screen */}
            <rect x="6" y="2" width="12" height="20" rx="2.5" />
            <rect x="9" y="5" width="6" height="6" rx="1" strokeDasharray="2,2" />
            <polyline points="9 15 11 17 15 13" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      default:
        return <span>⭐</span>;
    }
  };

  return (
    <div className="flex-1 bg-[#FAF7FB] flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      
      {/* 1. Header Safe Area Bar matching Photo 1 exactly */}
      <div className="bg-[#7A1C7C] pt-12 pb-5 px-5 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* App-logo rounded dark box container */}
            <div className="w-[44px] h-[44px] rounded-xl bg-[#59145A] border border-white/10 p-1 flex flex-col items-center justify-center leading-none">
              <span className="text-[6.5px] font-black text-white/50 tracking-wider">CBE</span>
              <span className="text-sm font-black italic text-[#FFE58F] leading-tight">Birr</span>
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className="text-base font-black tracking-wide text-white">CBEBirr</span>
              <span className="text-[11px] font-bold text-white/80">ባሉበት ሁሉ አለ!</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher paintbrush icon button */}
            <button className="p-2 text-white/90 hover:bg-white/15 rounded-full transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" width="19" height="19" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeDasharray="3,3" />
                <path d="M18 12c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z" fill="currentColor" opacity="0.1" />
                <path d="M12 6v6l4 2" strokeWidth="2.5" />
              </svg>
            </button>
            {/* Active Language identifier */}
            <div className="bg-white/15 border border-white/10 rounded-full py-0.5 px-3 text-[11px] font-bold tracking-wider hover:bg-white/20 transition-all">
              EN
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Balance / Spiral Medal Brand Card of Photo 1 */}
      <div className="px-4 -mt-1 z-20">
        <div className="bg-[#59145A] border border-[#D4AF37]/25 rounded-[26px] p-5 text-white shadow-xl relative overflow-hidden">
          {/* Subtle gold decoration gradients inside the premium card */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Golden logo brand representation row exactly matching Photo 2 */}
          <div className="flex items-center gap-4 pb-3.5 border-b border-white/5">
            <CbeGoldLogo className="w-16 h-16 flex-shrink-0 drop-shadow-lg" />
            <div className="flex-1 min-w-0 flex flex-col justify-center select-none">
              <span className="text-[17.5px] sm:text-[19px] font-black tracking-wide text-[#FFE58F] antialiased leading-none font-serif">
                የኢትዮጵያ ንግድ ባንክ
              </span>
              <span className="text-[11.5px] sm:text-[12.5px] font-black text-[#E5C158] italic tracking-wide font-serif mt-1 pb-0.5 leading-none">
                Commercial Bank of Ethiopia
              </span>
            </div>
          </div>

          {/* Masked credentials row */}
          <div className="flex flex-col items-center justify-center text-center my-3 py-2 border-y border-white/5">
            <div className="flex items-center gap-1.5 text-[#FFE58F] font-bold">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
              <span className="text-[12px] font-black font-mono tracking-widest">+2519*******</span>
            </div>
            <div className="text-[8px] font-black text-[#FFE58F]/75 tracking-[0.2em] uppercase mt-0.5">
              WELCOME BACK
            </div>
          </div>

          {/* Parallel balances display */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="border-r border-white/5 pr-1">
              <div className="flex items-center gap-1.5 text-white/70 text-[8px] font-bold uppercase tracking-widest mb-1 select-none">
                <span>Balance (ETB)</span>
                <button 
                  onClick={() => setBalVisible(!balVisible)}
                  className="text-[#FFE58F] hover:scale-110 active:scale-90 transition-transform cursor-pointer p-0.5 inline-flex items-center justify-center"
                >
                  {balVisible ? (
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-base font-black tracking-wide font-mono">
                {balVisible ? `${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '******'}
              </div>
            </div>

            <div className="pl-3">
              <div className="flex items-center gap-1.5 text-white/70 text-[8px] font-bold uppercase tracking-widest mb-1 select-none">
                <span>Reward (ETB)</span>
                <button 
                  onClick={() => setBalVisible(!balVisible)}
                  className="text-[#FFE58F] hover:scale-110 active:scale-90 transition-transform cursor-pointer p-0.5 inline-flex items-center justify-center"
                >
                  {balVisible ? (
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-base font-black tracking-wide font-mono">
                {balVisible ? '450.00' : '******'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Access Heading */}
      <div className="px-5 mt-6 flex items-center justify-between">
        <h3 className="text-xs font-black tracking-wider text-[#7A1C7C] uppercase">
          Quick Access
        </h3>
        <button 
          onClick={() => onNavigate('history')}
          className="text-[11px] font-black text-[#7A1C7C] flex items-center gap-1 hover:brightness-125 cursor-pointer"
        >
          <span>Transaction Detail</span>
          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="3" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 4. Exact 8-Button Quick Access Grid of Photo 1 */}
      <div className="px-4 mt-3 grid grid-cols-4 gap-2">
        {quickAccessItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleServiceClick(item.id)}
            className="flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div className="relative bg-white border border-slate-100 hover:border-purple/20 hover:bg-purple/5 aspect-square w-full rounded-[20px] flex items-center justify-center active:scale-92 transition-all shadow-sm">
              <div className="text-purple-mid text-center">
                {renderQuickAccessIcon(item.icon)}
              </div>
            </div>
            <span className="text-[8.5px] font-black text-slate-700 text-center leading-tight h-5 overflow-hidden tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 5. Fuel Pay Carousel Promo Banner matching Photo 1 exactly */}
      <div className="px-4 mt-6">
        <div className="bg-[#7A1C7C] rounded-[30px] overflow-hidden min-h-[125px] flex relative shadow-lg">
          {/* Wave decor backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800/10 to-[#59145A]/30 pointer-events-none" />
          
          <div className="p-5 flex-1 flex flex-col justify-between z-10 text-white select-none">
            <div>
              {/* Amharic primary Promo title */}
              <h4 className="text-[17px] font-black leading-tight text-white tracking-wide">
                የነዳጅ ክፍያዎችን በሲቢኢ ብር
              </h4>
              <p className="text-[9.5px] font-extrabold text-[#FFE58F] mt-1 opacity-90 tracking-wide uppercase">
                Easy, Fast & Secure Fuel Pay
              </p>
            </div>
            
            {/* Learn More pill */}
            <button className="bg-white text-[#7A1C7C] border-none rounded-full px-4 py-1.5 font-black text-[9px] mt-3.5 flex items-center gap-1.5 w-fit active:scale-95 cursor-pointer shadow-md">
              <span>LEARN MORE</span>
              <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="3" fill="none">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Right Vector segment highlighting yellow fuel nozzle nozzle illustration */}
          <div className="w-[120px] bg-[#59145A]/45 flex flex-col items-center justify-center p-3 text-center relative">
            <div className="absolute top-3 right-3 bg-white text-[#7A1C7C] rounded-full p-1 shadow-md">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M19 14h-1.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5H19c2.76 0 5-2.24 5-5V4c0-3.32-2.68-6-6-6S12 2.68 12 6v6H6.5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5H12v6c0 1.1-.9 2-2 2H6c-3.31 0-6-2.69-6-6V5c0-.55.45-1 1-1h2c1.1 0 2-.9 2-2V1c0-.55-.45-1-1-1H2C.9 0 0 .9 0 2v17c0 4.41 3.59 8 8 8h4c2.21 0 4-1.79 4-4v-7h1.5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5H18c-2.76 0-5 2.24-5 5v5c0 1.1.9 2 2 2h3v1h-3.5c-.28 0-.5.22-.5.5v2c0 .28.22.5.5.5H19c3.31 0 6-2.69 6-6v-3H19.5c-.28 0-.5-.22-.5-.5z" />
              </svg>
            </div>
            
            {/* Simulated fuel pump circle overlay badge */}
            <div className="bg-white rounded-2xl py-1 px-2.5 shadow-md flex flex-col items-center leading-none select-none border border-purple/10">
              <span className="text-[7.5px] font-black text-[#7A1C7C]">የነዳጅ ክፍያ</span>
            </div>

            {/* Glowing yellow nozzle graphic background ring */}
            <div className="w-[60px] h-[60px] bg-yellow-400 rounded-full flex items-center justify-center mt-3 shadow-lg border border-white animate-pulse">
              <span className="text-2xl">⛽</span>
            </div>
          </div>
        </div>

        {/* 5 Indicator Dots exactly matching Photo 1 */}
        <div className="flex justify-center gap-1.5 mt-3 select-none">
          <div className="w-5 h-2 rounded-full bg-[#7A1C7C]" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* 6. Footer items row exactly matching bottom section before nav */}
      <div className="px-4 mt-6">
        <div className="bg-white/80 border border-slate-100 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col items-center gap-1 flex-1 cursor-pointer group" onClick={() => onNavigate('transfer')}>
            <div className="w-9 h-9 bg-purple/10 rounded-xl flex items-center justify-center text-[#7A1B7B] group-hover:bg-purple/20 transition-all">
              <span className="text-sm font-black">$</span>
            </div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider">Other Bank</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 cursor-pointer group" onClick={() => onNavigate('transfer')}>
            <div className="w-9 h-9 bg-purple/10 rounded-xl flex items-center justify-center text-[#7A1B7B] group-hover:bg-purple/20 transition-all">
              <span>💳</span>
            </div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider">Other Wallet</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 cursor-pointer group" onClick={() => onNavigate('transfer')}>
            <div className="w-9 h-9 bg-purple/10 rounded-xl flex items-center justify-center text-[#7A1B7B] group-hover:bg-purple/20 transition-all">
              <span>⚡</span>
            </div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider">Quick</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 cursor-pointer group" onClick={() => onNavigate('transfer')}>
            <div className="w-9 h-9 bg-[#7A1B7B] rounded-xl flex items-center justify-center text-white scale-110 shadow-md">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="14" y="14" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
              </svg>
            </div>
            <span className="text-[8px] font-black text-[#7A1B7B] uppercase tracking-wider">Fuel Pay</span>
          </div>
        </div>
      </div>

      {/* Collapsible secondary Services Grid for richer functionality */}
      {servicesExpanded && (
        <section className="px-4 mt-6 animate-fade-in">
          <div className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-3">
            All Extended Services
          </div>
          
          <div className="grid grid-cols-4 gap-2 bg-white rounded-3xl p-4 border border-slate-100">
            {allServices.map((svc: ServiceItem) => (
              <div 
                key={svc.id}
                onClick={() => handleServiceClick(svc.id)}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div className="relative bg-[#FAF7FB] hover:bg-purple/10 rounded-xl aspect-square w-full flex items-center justify-center active:scale-90 transition-all">
                  <div className="text-[#7A1B7B] text-center">
                    <span className="text-lg">
                      {svc.id === 'scan' ? '📷' : 
                       svc.id === 'other_bank' ? '🏦' :
                       svc.id === 'wallet' ? '💳' :
                       svc.id === 'merchant' ? '🛍️' :
                       svc.id === 'fuel' ? '⛽' :
                       svc.id === 'condo' ? '🏢' :
                       svc.id === 'request' ? '💸' :
                       svc.id === 'bot' ? '🤖' :
                       svc.id === 'save_account' ? '💾' :
                       svc.id === 'saved_accounts' ? '👥' :
                       svc.id === 'school' ? '🎓' :
                       svc.id === 'bill' ? '🧾' :
                       svc.id === 'electric' ? '⚡' :
                       svc.id === 'water' ? '💧' : '⭐'}
                    </span>
                  </div>
                </div>
                <span className="text-[8px] font-black text-slate-500 text-center leading-tight h-5 overflow-hidden">
                  {svc.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Extra services expand toggle button */}
      <div className="flex justify-center mt-5 mb-2">
        <button 
          onClick={() => setServicesExpanded(!servicesExpanded)}
          className="bg-white border border-slate-200 rounded-full px-5 py-1.5 font-black text-[9px] text-purple uppercase tracking-wider flex items-center gap-2 hover:bg-slate-50 cursor-pointer active:scale-95 shadow-sm"
        >
          <span>{servicesExpanded ? 'Hide Extra Services' : 'Show All Services'}</span>
          <svg 
            className={`w-2.5 h-2.5 stroke-current stroke-[2.5] fill-none transition-transform duration-300 ${servicesExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

    </div>
  );
}
