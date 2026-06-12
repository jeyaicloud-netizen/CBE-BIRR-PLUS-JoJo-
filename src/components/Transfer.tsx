import React, { useState, useEffect } from 'react';
import { SavedAccount } from '../types';
import { initialSavedAccounts } from '../data/mockData';

interface TransferProps {
  onBack: () => void;
  onInitiateTransfer: (acc: string, name: string, amount: string) => void;
  savedAccounts: SavedAccount[];
}

export default function Transfer({ onBack, onInitiateTransfer, savedAccounts }: TransferProps) {
  const [accNum, setAccNum] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [amount, setAmount] = useState('');
  const [matchedContact, setMatchedContact] = useState<SavedAccount | null>(null);

  useEffect(() => {
    const matched = savedAccounts.find(
      sa => sa.number === accNum.trim()
    );
    if (matched) {
      setMatchedContact(matched);
      setReceiverName(matched.name);
    } else {
      setMatchedContact(null);
    }
  }, [accNum, savedAccounts]);

  const isValid = accNum.trim() !== '' && amount.trim() !== '' && parseFloat(amount) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onInitiateTransfer(accNum.trim(), receiverName.trim() || 'UNKNOWN', amount.trim());
    }
  };

  const clearAll = () => {
    setAccNum('');
    setReceiverName('');
    setAmount('');
    setMatchedContact(null);
  };

  return (
    <div className="flex-1 bg-slate-100 flex flex-col pb-24 select-none animate-fade-in overflow-y-auto">
      {/* Page Header */}
      <div className="bg-purple text-white px-4 pt-12 pb-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 flex items-center justify-center rounded-full transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-sm font-bold uppercase tracking-wider">Select Transfer</h1>
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

      {/* Main Form Fields */}
      <div className="p-4 flex-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-8 shadow-md flex flex-col gap-6 mt-8">
          {/* Receiver Account Number */}
          <div>
            <label className="block text-[11px] font-bold text-purple uppercase tracking-widest ml-2 mb-2">
              * Receivers Account Number
            </label>
            <div 
              className={`flex items-center h-14 border rounded-2xl px-3 gap-3 transition-all ${
                matchedContact ? 'border-green-500 bg-green-50/10' : 'border-purple/15 focus-within:border-purple focus-within:ring-4 focus-within:ring-purple/5'
              }`}
            >
              <div className="w-10 h-10 bg-purple rounded-xl flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="1.5" fill="none">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Receivers Account Number"
                value={accNum}
                onChange={(e) => setAccNum(e.target.value.replace(/\D/g, ''))}
                className="flex-1 border-none outline-none text-sm font-bold text-slate-800 bg-transparent placeholder-slate-300"
              />
              {accNum && (
                <button 
                  type="button"
                  onClick={clearAll}
                  className="text-purple flex hover:opacity-80 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                  </svg>
                </button>
              )}
            </div>

            {/* Matched Verified Account Badge and Holder Meta Details */}
            {matchedContact && (
              <div className="mt-4 animate-fade-in">
                <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-[9px] font-black tracking-widest px-2 py-1 rounded-md uppercase">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current stroke-[3] fill-none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Verified Account
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 mt-2">
                  <div className="text-xs font-black text-slate-800 uppercase">{matchedContact.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1">Acct: {matchedContact.number}</div>
                </div>
              </div>
            )}
          </div>

          {/* Receiver Name Label & Input */}
          <div>
            <label className="block text-[11px] font-bold text-purple uppercase tracking-widest ml-2 mb-2">
              * Receiver Name
            </label>
            <div className="flex items-center h-14 border border-purple/15 rounded-2xl px-3 gap-3 focus-within:border-purple focus-within:ring-4 focus-within:ring-purple/5 transition-all">
              <span className="text-xl select-none">👤</span>
              <input 
                type="text" 
                placeholder="Receiver Name"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                disabled={matchedContact !== null}
                className="flex-1 border-none outline-none text-sm font-bold text-slate-800 bg-transparent disabled:opacity-75 placeholder-slate-300"
              />
            </div>
          </div>

          {/* Amount Label & Input */}
          <div>
            <label className="block text-[11px] font-bold text-purple uppercase tracking-widest ml-2 mb-2">
              * Amount
            </label>
            <div className="flex items-center h-14 border border-purple/15 rounded-2xl px-3 gap-3 focus-within:border-purple focus-within:ring-4 focus-within:ring-purple/5 transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-purple text-base">
                $
              </div>
              <input 
                type="number" 
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 border-none outline-none text-sm font-bold text-slate-800 bg-transparent placeholder-slate-300"
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <button 
            type="submit"
            disabled={!isValid}
            className={`w-full h-16 rounded-3xl font-black text-sm border-none uppercase tracking-widest cursor-pointer transition-all active:scale-[0.98] ${
              isValid
                ? 'bg-purple text-white shadow-lg shadow-purple/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Bank Transfer
          </button>
        </form>
      </div>
    </div>
  );
}
