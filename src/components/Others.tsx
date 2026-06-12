import React from 'react';

interface OthersProps {
  ownerName: string;
  mobileNumber: string;
  onNavigate: (tab: string) => void;
  onOpenEditProfile: () => void;
  onOpenSavedAccounts: () => void;
  onLogout: () => void;
}

export default function Others({ 
  ownerName, 
  mobileNumber, 
  onNavigate, 
  onOpenEditProfile, 
  onOpenSavedAccounts, 
  onLogout 
}: OthersProps) {
  
  const menuItems = [
    { label: 'All Balances', icon: 'wallet', action: () => onNavigate('dashboard') },
    { label: 'Transaction History', icon: 'history', action: () => onNavigate('history') },
    { label: 'Saved Accounts', icon: 'savedacc', action: () => onOpenSavedAccounts() },
    { label: 'PIN Reset', icon: 'refresh', action: null },
    { label: 'Change PIN', icon: 'lock', action: null },
    { label: 'Manage Bill Info', icon: 'bill', action: null },
    { label: 'Invite Friend', icon: 'invite', action: null },
  ];

  const getMenuIcon = (icon: string) => {
    switch (icon) {
      case 'wallet':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <rect x="2" y="7" width="22" height="14" rx="2" />
            <path d="M16 3H2v4h20V7l-6-4z" />
          </svg>
        );
      case 'history':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="12 8 12 12 14 14" />
            <path d="M3.05 11a9 9 0 102.13-9.36L1 10" />
            <polyline points="1 3 1 7 5 7" />
          </svg>
        );
      case 'savedacc':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        );
      case 'refresh':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
        );
      case 'lock':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        );
      case 'bill':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'invite':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        );
      default:
        return null;
    }
  };

  const maskedPhone = () => {
    if (mobileNumber.length >= 4) {
      return '*'.repeat(mobileNumber.length - 4) + mobileNumber.slice(-4);
    }
    return mobileNumber;
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      {/* Top Header Card Background */}
      <div className="bg-purple text-white px-4 pt-12 pb-20 rounded-b-[40px] relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-1 hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center rounded-full"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <h1 className="text-sm font-bold uppercase tracking-widest pl-1">Others</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-black/25 flex items-center justify-center rounded-full font-black text-sm">
              {ownerName.charAt(0)}
            </div>
            <div className="bg-white/15 border border-white/20 rounded-full py-0.5 px-3 text-[10px] font-bold">
              EN
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-purple-dark rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-white border-2 border-gold rounded-full" />
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="font-black text-sm text-white tracking-wide truncate max-w-[140px]">
                  {ownerName}
                </div>
                <button 
                  onClick={onOpenEditProfile}
                  className="p-1 text-white/60 hover:text-white cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <div className="text-[11px] text-white/60 tracking-widest font-bold">
                +{maskedPhone()}
              </div>
              <div className="text-[9px] font-black bg-yellow-500 text-purple-dark rounded-full px-2.5 py-0.5 w-fit mt-1.5 border-none">
                Level 1
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 cursor-pointer">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M18.66 18.66l1.41-1.41M4.93 5.34l1.41 1.41" />
              </svg>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" strokeWidth="1.5" fill="none" className="opacity-45">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Menus List Container */}
      <div className="px-4 -mt-8 relative z-20 flex flex-col gap-3 pb-8">
        {menuItems.map((menu, idx) => {
          return (
            <div 
              key={idx}
              onClick={menu.action || undefined}
              className="bg-white rounded-2xl px-5 h-14 flex items-center justify-between cursor-pointer border border-slate-100 shadow-sm active:scale-[0.99] transition-transform hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="text-purple flex-shrink-0">
                  {getMenuIcon(menu.icon)}
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {menu.label}
                </span>
              </div>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="#d1d5db" strokeWidth="1.5" fill="none">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          );
        })}

        {/* Logout Button */}
        <button 
          onClick={onLogout}
          className="w-full h-13 mt-4 border-1.5 border-red-500 rounded-2xl bg-white text-red-500 hover:bg-red-50 font-bold text-sm tracking-widest uppercase cursor-pointer active:scale-98 transition-all flex items-center justify-center shadow-sm"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
