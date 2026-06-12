import React from 'react';
import { Message } from '../types';

interface NotificationsProps {
  onBack: () => void;
  messages: Message[];
  onOpenReceiptFromLink: (tid: string, amount: string, receiver: string, balance: string) => void;
}

export default function Notifications({ onBack, messages, onOpenReceiptFromLink }: NotificationsProps) {
  
  // Custom parser to convert links inside SMS text to interactive click triggers
  const renderMessageText = (text: string) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    // Check if there is an HTTP link inside the sms
    const parts = text.split(urlPattern);
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        // Extract URL parameters
        try {
          const url = new URL(part);
          const tid = url.searchParams.get('txn') || '';
          const amt = url.searchParams.get('amt') || '';
          const toName = decodeURIComponent(url.searchParams.get('to') || '');
          const bal = url.searchParams.get('bal') || '';
          
          return (
            <button 
              key={index}
              onClick={() => onOpenReceiptFromLink(tid, amt, toName, bal)}
              className="text-blue-500 underline font-semibold hover:text-blue-700 cursor-pointer align-baseline text-left inline-block"
            >
              Verify Receipt Link
            </button>
          );
        } catch (e) {
          return (
            <a 
              key={index} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 underline whitespace-normal break-all font-semibold"
            >
              {part}
            </a>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 bg-[#f5f5f5] flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:text-purple transition-colors cursor-pointer mr-1">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="#9ca3af" strokeWidth="1" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-sm">CBEBirr</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex flex-col items-center gap-0.5 text-purple cursor-pointer hover:opacity-85">
            <svg viewBox="0 0 24 24" width="20" height="20" className="stroke-current stroke-[1.5] fill-none transform rotate-180">
              <line x1="12" y1="17" x2="12" y2="22" />
              <path d="M5 17H19V13L21 7H3L5 13V17Z" />
            </svg>
            <span className="text-[10px] font-bold">Pin</span>
          </div>
          <button className="p-1 hover:text-red-500 transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="p-4 flex flex-col gap-6 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col gap-2 animate-fade-in">
            <div className="bg-[#e9e9eb] rounded-[24px] p-5 relative max-w-[90%] shadow-sm Self-start">
              <div className="text-slate-800 text-[13px] leading-relaxed font-medium whitespace-pre-line break-words">
                {renderMessageText(m.text)}
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-300/30 flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold font-mono">View all</span>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4 px-1.5 max-w-[90%] select-none">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="#d1d5db" strokeWidth="1.5" fill="none" className="opacity-60">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
