import React from 'react';

interface ReceiptModalProps {
  tid: string;
  name: string;
  accNum: string;
  amount: string;
  dateStr: string;
  datetimeStr: string;
  newBalance: string;
  onClose: () => void;
}

export default function ReceiptModal({
  tid,
  name,
  accNum,
  amount,
  dateStr,
  datetimeStr,
  newBalance,
  onClose
}: ReceiptModalProps) {
  
  const formattedAmt = parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 });
  const formattedBal = parseFloat(newBalance || '0').toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm overflow-y-auto px-4 py-8 flex items-start justify-center animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-[400px] overflow-hidden shadow-2xl mx-auto border border-slate-100/50">
        
        {/* Invoice Header */}
        <div className="bg-purple p-5 text-white relative">
          <div className="flex justify-between items-center gap-3">
            <div className="w-13 h-13 bg-white rounded-full flex flex-col items-center justify-center leading-none flex-shrink-0 shadow-sm select-none">
              <span className="text-[7px] font-black text-purple">CBE</span>
              <span className="text-sm font-black italic text-purple">Birr</span>
            </div>
            
            <div className="text-center flex-1 px-2 select-none">
              <div className="text-[14px] font-black tracking-wide leading-tight">COMMERCIAL BANK OF ETHIOPIA</div>
              <div className="text-[9px] text-white/80 font-bold uppercase tracking-widest mt-0.5">VAT INVOICE / CUSTOMER RECEIPT</div>
              <div className="text-xs font-black italic text-white/90 mt-0.5 tracking-widest">CBEBIRR</div>
            </div>

            <div className="w-13 h-13 bg-white rounded-full flex flex-col items-center justify-center leading-none flex-shrink-0 shadow-sm select-none">
              <span className="text-[7px] font-black text-purple">CBE</span>
              <span className="text-sm font-black italic text-purple">Birr</span>
            </div>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-5">
          {/* Verified tag */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">Verified Receipt</span>
          </div>

          {/* Double Column Company / Customer info details */}
          <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-4 mb-4 select-none relative">
            <div>
              <div className="text-[9px] font-black text-slate-800 uppercase tracking-wider mb-1.5">Company Address</div>
              <div className="text-[8.5px] text-slate-500 leading-relaxed font-semibold">
                Country: <span className="text-slate-800">Ethiopia</span><br />
                City: <span className="text-slate-800">Addis Ababa</span><br />
                Address: <span className="text-slate-800">Kirkos, Ras Desta Damtew St</span><br />
                Postal code: <span className="text-slate-800">255</span><br />
                SWIFT: <span className="text-slate-800">CBETETAA</span><br />
                Invoice No: <span className="text-slate-800">011140</span>
              </div>
            </div>

            <div className="relative">
              <div className="text-[9px] font-black text-slate-800 uppercase tracking-wider mb-1.5">Customer details</div>
              <div className="text-[8.5px] text-slate-500 leading-relaxed font-semibold">
                Recipient Name: <span className="text-slate-800 uppercase">{name || 'UNKNOWN'}</span><br />
                Date: <span className="text-slate-800">{dateStr}</span><br />
                TIN (TAX ID): <span className="text-slate-800">N/A</span><br />
                Branch: <span className="text-slate-800">Sarbet</span>
              </div>

              {/* Blue ink visual simulation stamp */}
              <div className="absolute -bottom-2 right-0 w-[64px] h-[64px] border-1.5 border-blue-500/30 rounded-full flex flex-col items-center justify-center text-center text-blue-500/50 uppercase select-none pointer-events-none transform rotate-12 leading-none font-bold text-[5px]">
                <span>Commercial</span>
                <span className="my-0.5">Bank</span>
                <span>Of Ethiopia</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-black text-center tracking-widest text-slate-700 uppercase mb-3 select-none">
            Transaction Information
          </div>

          {/* Transaction Metadata Grid */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden mb-4 shadow-sm select-none">
            <div className="grid grid-cols-2 text-[10px] font-bold text-slate-700">
              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/50">Debit Account</div>
              <div className="p-2 px-3 border-b border-slate-100 text-right text-slate-800">+251 922805782</div>
              
              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/50">Credit Account</div>
              <div className="p-2 px-3 border-b border-slate-100 text-right text-slate-800 font-mono truncate">{accNum || 'N/A'}</div>

              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/50">Receiver Name</div>
              <div className="p-2 px-3 border-b border-slate-100 text-right text-slate-800 uppercase truncate">{name || 'UNKNOWN'}</div>

              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/50">Order ID</div>
              <div className="p-2 px-3 border-b border-slate-100 text-right font-mono text-slate-800">{tid}</div>

              <div className="p-2 px-3 border-b border-slate-100 bg-slate-50/50">Date &amp; Time</div>
              <div className="p-2 px-3 border-b border-slate-100 text-right text-slate-800">{datetimeStr}</div>

              <div className="p-2 px-3 bg-slate-50/50">Transaction Status</div>
              <div className="p-2 px-3 text-right flex items-center justify-end gap-1.5 text-green-700">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Completed
              </div>
            </div>
          </div>

          {/* Pricing list VAT invoice table */}
          <div className="overflow-hidden rounded-xl border border-slate-100 mb-4 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple text-white text-[8px] font-black uppercase tracking-wider">
                  <th className="p-2 text-left">Receipt Number</th>
                  <th className="p-2 text-center">Transaction Date</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-bold text-slate-700">
                <tr className="bg-white">
                  <td className="p-2 font-mono text-slate-800">{tid}</td>
                  <td className="p-2 text-center text-slate-500 uppercase">{dateStr.toUpperCase()}</td>
                  <td className="p-2 text-right text-slate-800 font-black">ETB {formattedAmt}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Row summaries */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex justify-between items-center mb-1 text-slate-800 font-bold select-none text-[11px]">
              <span className="font-semibold text-slate-500">Total Paid Amount</span>
              <span className="font-black">ETB {formattedAmt}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-green-700 font-bold select-none text-[11px]">
              <span className="font-semibold">Updated Balance</span>
              <span className="font-black">ETB {formattedBal}</span>
            </div>
          </div>

          <div className="text-center mt-5 mb-1 font-semibold italic text-[10px] text-slate-400 select-none">
            — The Bank you can always rely on! —
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex gap-3 px-5 pb-5">
          <button 
            onClick={onClose}
            className="flex-1 h-12 bg-slate-100 text-slate-700 border-none rounded-xl font-black text-[10px] uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
          >
            Done
          </button>
          <button 
            type="button"
            onClick={() => alert('Simulating receipt download... PDF successfully stored.')}
            className="flex-1 h-12 bg-purple text-white border-none rounded-xl font-black text-[10px] uppercase tracking-wider cursor-pointer active:scale-95 transition-transform shadow-md"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
