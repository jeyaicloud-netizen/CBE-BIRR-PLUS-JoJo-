import React, { useState } from 'react';
import { Transaction } from '../types';

interface HistoryProps {
  onBack: () => void;
  transactions: Transaction[];
}

export default function History({ onBack, transactions }: HistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(tx =>
    tx.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-100 flex flex-col select-none animate-fade-in overflow-y-auto">
      {/* Page Header */}
      <div className="bg-purple text-white px-4 pt-12 pb-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-sm font-bold uppercase tracking-wider">Recent Transactions</h1>
        </div>
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <div className="bg-white/20 border border-white/10 rounded-full py-0.5 px-3 text-[10px] font-bold">
            EN
          </div>
        </div>
      </div>

      {/* Search Input Card */}
      <div className="p-4 pb-2 sticky top-[76px] bg-slate-100 z-20">
        <div className="flex items-center gap-2.5 bg-white rounded-2xl px-4 h-13 shadow-sm border border-slate-100">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="#9ca3af" strokeWidth="1.5" fill="none">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input 
            type="text" 
            placeholder="Search Transactions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none outline-none text-sm text-slate-700 bg-transparent placeholder-slate-400"
          />
        </div>
      </div>

      {/* Transaction List Cards */}
      <div className="p-4 pt-2 flex flex-col gap-3 pb-24">
        {filtered.map((tx: Transaction) => {
          const isOutgoing = tx.type === 'outgoing';
          return (
            <div 
              key={tx.id}
              className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm hover:scale-[0.99] active:scale-95 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOutgoing ? 'bg-red-50' : 'bg-green-50'}`}>
                  <svg 
                    viewBox="0 0 24 24" 
                    className={`w-6 h-6 stroke-[1.5] fill-none ${isOutgoing ? 'stroke-red-400/80' : 'stroke-green-400/80'}`}
                  >
                    {isOutgoing ? (
                      <>
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </>
                    ) : (
                      <>
                        <line x1="17" y1="7" x2="7" y2="17" />
                        <polyline points="17 17 7 17 7 7" />
                      </>
                    )}
                  </svg>
                </div>
                <div>
                  <div className="text-slate-800 text-[11px] font-black uppercase tracking-wide leading-tight">
                    {tx.title}
                  </div>
                  <div className="text-[9px] text-slate-300 font-bold uppercase mt-0.5">
                    {tx.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-black tracking-tight ${isOutgoing ? 'text-purple' : 'text-green-custom'}`}>
                  {tx.amount}
                </span>
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-300 stroke-[1.5] fill-none">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center p-12 text-slate-400 text-xs font-bold font-mono">
            No matching transactions found.
          </div>
        )}
      </div>
    </div>
  );
}
