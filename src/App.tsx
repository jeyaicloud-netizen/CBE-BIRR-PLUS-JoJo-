import React, { useState, useEffect } from 'react';
import { SavedAccount, Message, Transaction } from './types';
import { initialSavedAccounts, defaultMessages, defaultHistory } from './data/mockData';

// Subcomponents
import Splash from './components/Splash';
import SignIn from './components/SignIn';
import PinScreen from './components/PinScreen';
import Dashboard from './components/Dashboard';
import Transfer from './components/Transfer';
import History from './components/History';
import Others from './components/Others';
import CbeBeje from './components/CbeBeje';
import MiniApps from './components/MiniApps';
import Notifications from './components/Notifications';
import BillPage from './components/BillPage';
import SuccessScreen from './components/SuccessScreen';
import ReceiptModal from './components/ReceiptModal';
import BottomNav from './components/BottomNav';

export default function App() {
  // Global States
  const [activePage, setActivePage] = useState<string>('splash');
  
  // User profile settings
  const [ownerName, setOwnerName] = useState('ABDU SERIG HASEN');
  const [walletBalance, setWalletBalance] = useState(12450.00);
  const [mobileNum, setMobileNum] = useState('251922805782');
  const [masterPin, setMasterPin] = useState('1669');

  // Stateful collections (allowing client-side updates/searches)
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>(initialSavedAccounts);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Transaction[]>([]);

  // Active inputs / Transfer Details
  const [activeTransfer, setActiveTransfer] = useState({ acc: '', name: '', amount: '' });
  const [lastTransaction, setLastTransaction] = useState({
    tid: '',
    name: '',
    acc: '',
    amount: '',
    date: '',
    datetime: '',
    newBal: ''
  });

  // Modal Overlay Toggles
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTransferPinOpen, setIsTransferPinOpen] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSaveAccountOpen, setIsSaveAccountOpen] = useState(false);
  const [isSavedAccountsOpen, setIsSavedAccountsOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Profile Edit fields
  const [editNameField, setEditNameField] = useState('');
  const [editBalanceField, setEditBalanceField] = useState('');

  // Add saved account inputs
  const [addAccName, setAddName] = useState('');
  const [addAccNum, setAddNum] = useState('');

  // Saved accounts listing state
  const [savedSearchQuery, setSavedSearchQuery] = useState('');

  // Initialize data on mount from localStorage or defaults
  useEffect(() => {
    try {
      // Configuration
      const cfg = JSON.parse(localStorage.getItem('app_client_config') || '{}');
      if (cfg.masterPin) setMasterPin(cfg.masterPin);
      if (cfg.mobileNumber) setMobileNum(cfg.mobileNumber);
      if (cfg.ownerName) setOwnerName(cfg.ownerName);
      if (cfg.walletBalance) setWalletBalance(parseFloat(cfg.walletBalance));

      // Messages
      const msgLogs = JSON.parse(localStorage.getItem('cbe_sms_log') || '[]');
      setMessages([...msgLogs, ...defaultMessages]);

      // Transactions
      const txHistory = JSON.parse(localStorage.getItem('cbe_tx_history') || '[]');
      setHistory([...txHistory, ...defaultHistory]);

      // Saved Accounts
      const saved = JSON.parse(localStorage.getItem('saved_accounts_list') || '[]');
      if (saved.length > 0) {
        setSavedAccounts(saved);
      }
    } catch (e) {
      setMessages(defaultMessages);
      setHistory(defaultHistory);
    }
  }, []);

  // Save current profile to config
  const handleSaveProfile = (name: string, balance: number) => {
    setOwnerName(name.toUpperCase());
    setWalletBalance(balance);
    try {
      const cfg = JSON.parse(localStorage.getItem('app_client_config') || '{}');
      cfg.ownerName = name.toUpperCase();
      cfg.walletBalance = balance.toString();
      localStorage.setItem('app_client_config', JSON.stringify(cfg));
      
      const s = JSON.parse(localStorage.getItem('user_session') || '{}');
      s.name = name.toUpperCase();
      s.balance = balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
      localStorage.setItem('user_session', JSON.stringify(s));
      localStorage.setItem('wallet_balance', balance.toString());
    } catch (e) {}
  };

  // Sign in sequence completed
  const handleSignInNext = (phone: string) => {
    try {
      localStorage.setItem('temp_signin_phone', phone);
    } catch (e) {}
    setActivePage('pin');
  };

  const handlePinSuccess = () => {
    let phoneNum = mobileNum;
    try {
      phoneNum = localStorage.getItem('temp_signin_phone') || mobileNum;
    } catch (e) {}

    const session = {
      name: ownerName,
      balance: walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 }),
      type: 'primary',
      mobile: phoneNum
    };
    try {
      localStorage.setItem('user_session', JSON.stringify(session));
      localStorage.setItem('wallet_balance', walletBalance.toString());
    } catch (e) {}
    setActivePage('dashboard');
  };

  // Initiate transfer bottom-sheet
  const handleInitiateTransfer = (acc: string, name: string, amount: string) => {
    setActiveTransfer({ acc, name, amount });
    setIsConfirmOpen(true);
  };

  const handleTriggerTransferPin = () => {
    setIsConfirmOpen(false);
    setIsTransferPinOpen(true);
  };

  const handleTpinNumPress = (num: string) => {
    // We enter a temporary transfer PIN, let's say after 4 characters successfully processes
    const nextVal = currentTpin + num;
    if (nextVal.length <= 4) {
      setCurrentTpin(nextVal);
      if (nextVal.length === 4) {
        setTimeout(() => {
          setIsTransferPinOpen(false);
          setCurrentTpin('');
          setIsLoadingOpen(true);
          
          // Secure transaction latency simulation
          setTimeout(() => {
            setIsLoadingOpen(false);
            finalizeTransfer();
          }, 2500);
        }, 300);
      }
    }
  };

  const [currentTpin, setCurrentTpin] = useState('');

  const handleTpinDel = () => {
    setCurrentTpin(prev => prev.slice(0, -1));
  };

  // Finalizes transaction, writes logs, local states and localStorages
  const finalizeTransfer = () => {
    const now = new Date();
    const tid = Math.random().toString(36).substring(2, 11).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const amountVal = parseFloat(activeTransfer.amount || '0');
    
    // Subtraction and updated balance values
    const newBal = walletBalance - amountVal;
    setWalletBalance(newBal);
    
    try {
      localStorage.setItem('wallet_balance', newBal.toString());
      const cfg = JSON.parse(localStorage.getItem('app_client_config') || '{}');
      cfg.walletBalance = newBal.toString();
      localStorage.setItem('app_client_config', JSON.stringify(cfg));
    } catch (e) {}

    // SMS compilation
    const smsText = `ETB ${activeTransfer.amount} debited from your account for ${activeTransfer.name} (${activeTransfer.acc}) on ${dateStr} at ${timeStr} with Transaction ID: ${tid} via CBEBirr mobile app's Select Transfer (Ok). Your current balance is ETB ${newBal.toFixed(2)}. Verify: https://cbebirr-plus-verification.net/receipt?txn=${tid}&amt=${activeTransfer.amount}&to=${encodeURIComponent(activeTransfer.name)}&bal=${newBal.toFixed(2)}`;

    // Notifications state prepend
    const newSms: Message = { id: Date.now().toString(), text: smsText, timestamp: timeStr };
    const updatedMsgs = [newSms, ...messages];
    setMessages(updatedMsgs);
    try {
      const storedSms = JSON.parse(localStorage.getItem('cbe_sms_log') || '[]');
      localStorage.setItem('cbe_sms_log', JSON.stringify([newSms, ...storedSms]));
    } catch (e) {}

    // History log state prepend
    const newTx: Transaction = {
      id: tid,
      title: `Transfer to ${activeTransfer.name}`,
      date: now.toLocaleDateString('en-US') + ' ' + timeStr,
      amount: `- ${parseFloat(activeTransfer.amount).toFixed(2)}`,
      type: 'outgoing'
    };
    const updatedHistory = [newTx, ...history];
    setHistory(updatedHistory);
    try {
      const storedHistory = JSON.parse(localStorage.getItem('cbe_tx_history') || '[]');
      localStorage.setItem('cbe_tx_history', JSON.stringify([newTx, ...storedHistory]));
    } catch (e) {}

    // Set last transaction state
    setLastTransaction({
      tid,
      name: activeTransfer.name,
      acc: activeTransfer.acc,
      amount: activeTransfer.amount,
      date: dateStr,
      datetime: dateStr + ' ' + timeStr,
      newBal: newBal.toFixed(2)
    });

    setIsSuccessOpen(true);
  };

  // Profile management edit modal
  const handleOpenEditProfileModal = () => {
    setEditNameField(ownerName);
    setEditBalanceField(walletBalance.toString());
    setIsEditProfileOpen(true);
  };

  const handleSaveEditProfile = () => {
    if (editNameField.trim() && editBalanceField.trim()) {
      handleSaveProfile(editNameField.trim(), parseFloat(editBalanceField));
      setIsEditProfileOpen(false);
      
      // Toast notification alert
      triggerToast('Profile updated!');
    }
  };

  // Custom Toast helper
  const [toastText, setToastText] = useState('');
  const triggerToast = (text: string) => {
    setToastText(text);
    setTimeout(() => {
      setToastText('');
    }, 2000);
  };

  // Add / Save contact account to saved accounts list
  const handleAddSaveContact = () => {
    if (addAccName.trim() && addAccNum.trim()) {
      const exists = savedAccounts.find(sa => sa.number === addAccNum.trim());
      if (!exists) {
        const newContact: SavedAccount = {
          number: addAccNum.trim(),
          name: addAccName.trim().toUpperCase()
        };
        const updated = [...savedAccounts, newContact];
        setSavedAccounts(updated);
        try {
          localStorage.setItem('saved_accounts_list', JSON.stringify(updated));
        } catch (e) {}
      }
      setIsSaveAccountOpen(false);
      setAddName('');
      setAddNum('');
      triggerToast('Account saved!');
    }
  };

  const handleOpenSaveAccountModalDirect = () => {
    setAddName(activeTransfer.name !== 'UNKNOWN' ? activeTransfer.name : '');
    setAddNum(activeTransfer.acc);
    setIsSaveAccountOpen(true);
  };

  const handleDeleteSavedContact = (idx: number) => {
    const list = [...savedAccounts];
    list.splice(idx, 1);
    setSavedAccounts(list);
    try {
      localStorage.setItem('saved_accounts_list', JSON.stringify(list));
    } catch (e) {}
  };

  const handleSelectSavedContact = (num: string, name: string) => {
    setIsSavedAccountsOpen(false);
    setActiveTransfer({ acc: num, name, amount: '' });
    setActivePage('transfer');
  };

  const handleOpenReceiptFromLink = (tid: string, amount: string, receiver: string, balance: string) => {
    setLastTransaction({
      tid,
      name: receiver,
      acc: '',
      amount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      datetime: new Date().toLocaleString(),
      newBal: balance
    });
    setIsReceiptOpen(true);
  };

  const handleBillPaymentSuccess = (type: string, refNum: string, amtStr: string) => {
    const amt = parseFloat(amtStr);
    const newBal = walletBalance - amt;
    setWalletBalance(newBal);
    try {
      localStorage.setItem('wallet_balance', newBal.toString());
      const cfg = JSON.parse(localStorage.getItem('app_client_config') || '{}');
      cfg.walletBalance = newBal.toString();
      localStorage.setItem('app_client_config', JSON.stringify(cfg));
    } catch (e) {}

    const now = new Date();
    const tid = Math.random().toString(36).substring(2, 11).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // History list update
    const newTx: Transaction = {
      id: tid,
      title: `${type} PAYMENT`,
      date: now.toLocaleDateString('en-US') + ' ' + timeStr,
      amount: `- ${amt.toFixed(2)}`,
      type: 'outgoing'
    };
    setHistory([newTx, ...history]);

    triggerToast(`${type} processed successful!`);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user_session');
    } catch (e) {}
    setActivePage('signin');
  };

  // Nav item click callback router
  const handleBottomTabChange = (tab: string) => {
    setActivePage(tab);
  };

  // Filters saved contacts lists on live input search
  const filteredSavedAccounts = savedAccounts.filter(
    sa => sa.name.toLowerCase().includes(savedSearchQuery.toLowerCase()) || sa.number.includes(savedSearchQuery)
  );

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-slate-50 relative flex flex-col shadow-2xl overflow-hidden font-sans pb-16">
      
      {/* 1. Page router container */}
      {activePage === 'splash' && (
        <Splash onFinish={() => setActivePage('signin')} />
      )}

      {activePage === 'signin' && (
        <SignIn 
          onNext={handleSignInNext} 
          onBack={() => setActivePage('splash')} 
        />
      )}

      {activePage === 'pin' && (
        <PinScreen 
          onBack={() => setActivePage('signin')} 
          onSuccess={handlePinSuccess} 
          masterPin={masterPin}
        />
      )}

      {activePage === 'dashboard' && (
        <Dashboard 
          ownerName={ownerName}
          walletBalance={walletBalance}
          onNavigate={(tab) => setActivePage(tab)}
          onOpenSaveAccount={() => setIsSaveAccountOpen(true)}
          onOpenSavedAccounts={() => setIsSavedAccountsOpen(true)}
        />
      )}

      {activePage === 'transfer' && (
        <Transfer 
          onBack={() => setActivePage('dashboard')}
          onInitiateTransfer={handleInitiateTransfer}
          savedAccounts={savedAccounts}
        />
      )}

      {activePage === 'history' && (
        <History 
          onBack={() => setActivePage('dashboard')}
          transactions={history}
        />
      )}

      {activePage === 'others' && (
        <Others 
          ownerName={ownerName}
          mobileNumber={mobileNum}
          onNavigate={(tab) => setActivePage(tab)}
          onOpenEditProfile={handleOpenEditProfileModal}
          onOpenSavedAccounts={() => setIsSavedAccountsOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {activePage === 'cbebeje' && (
        <CbeBeje onBack={() => setActivePage('dashboard')} />
      )}

      {activePage === 'miniapps' && (
        <MiniApps onBack={() => setActivePage('dashboard')} />
      )}

      {activePage === 'notifications' && (
        <Notifications 
          onBack={() => setActivePage('dashboard')}
          messages={messages}
          onOpenReceiptFromLink={handleOpenReceiptFromLink}
        />
      )}

      {activePage === 'waterbill' && (
        <BillPage 
          billType="water"
          walletBalance={walletBalance}
          onBack={() => setActivePage('dashboard')}
          onPaySuccess={handleBillPaymentSuccess}
        />
      )}

      {activePage === 'electricbill' && (
        <BillPage 
          billType="electric"
          walletBalance={walletBalance}
          onBack={() => setActivePage('dashboard')}
          onPaySuccess={handleBillPaymentSuccess}
        />
      )}

      {/* 2. Global bottom nav rendering inside state views */}
      {['dashboard', 'transfer', 'cbebeje', 'miniapps', 'others', 'notifications'].includes(activePage) && (
        <BottomNav activeTab={activePage} onTabChange={handleBottomTabChange} />
      )}

      {/* ===== OVERLAY SCREENS / DIALOG MODALS ===== */}

      {/* Confirmation bottom sliding sheet modal */}
      {isConfirmOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xs flex items-end justify-center select-none animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setIsConfirmOpen(false)}
        >
          <div className="bg-white rounded-t-[32px] p-6 pb-10 w-full max-w-[430px] shadow-2xl relative translate-y-0 transform transition-transform duration-300">
            <div className="flex justify-end mb-2">
              <button onClick={() => setIsConfirmOpen(false)} className="text-slate-400 hover:text-red-500 cursor-pointer p-1">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#d1d5db" strokeWidth="1.2" fill="#e5e7eb">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-40px font-black text-slate-800">{activeTransfer.amount}</span>
                <span className="text-sm font-black text-slate-800 uppercase">ETB</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase ml-2 mb-3">
                Payment Method
              </div>
              
              <div className="border-1.5 border-purple/10 rounded-[24px] p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1" fill="#d1d5db">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-black text-[13px] text-slate-800 uppercase leading-none">Select Bank</div>
                    <div className="text-[10px] text-slate-400 font-semibold mt-1">Acct: {activeTransfer.acc}</div>
                  </div>
                </div>

                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" strokeWidth="3" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            </div>

            <button 
              onClick={handleTriggerTransferPin}
              className="w-full h-15 bg-purple text-white border-none rounded-full font-black text-sm uppercase tracking-widest cursor-pointer shadow-lg active:scale-97 select-none"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Transfer Pin Authorization keypad popup panel */}
      {isTransferPinOpen && (
        <div className="fixed inset-y-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] z-[150] bg-white flex flex-col justify-between select-none pb-10 animate-fade-in">
          {/* Header */}
          <div className="bg-purple text-white px-4 pt-12 pb-6 flex items-center justify-between">
            <button 
              onClick={() => { setIsTransferPinOpen(false); setIsConfirmOpen(true); }}
              className="w-10 h-10 bg-white/20 flex items-center justify-center rounded-full cursor-pointer transition-colors"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.1" fill="none">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="text-[13px] font-bold uppercase tracking-wider">Select Transfer</span>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="bg-white/20 border border-white/15 rounded-full py-0.5 px-3 text-[10px] font-bold">EN</div>
            </div>
          </div>

          {/* Prompt info dots panel */}
          <div className="flex-1 flex flex-col items-center pt-10 px-8">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-800">Authentication</h2>
              <p className="text-[11px] font-bold text-slate-400 tracking-[0.15em] uppercase mt-1">Please enter valid PIN to continue</p>
            </div>

            {/* Verification Password Dots */}
            <div className="flex gap-5 my-10" id="tpin-dots">
              {[0, 1, 2, 3].map((idx) => {
                const isFilled = currentTpin.length > idx;
                return (
                  <div 
                    key={idx}
                    className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      isFilled ? 'border-purple bg-white shadow-md' : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    {isFilled && <div className="w-3 h-3 bg-purple rounded-full" />}
                  </div>
                );
              })}
            </div>

            {/* Dynamic Numeric Numpad */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full max-w-[320px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button 
                  key={num}
                  onClick={() => handleTpinNumPress(num)}
                  className="h-16 bg-white border border-slate-100 rounded-2xl text-xl font-black text-slate-800 shadow-sm active:scale-95 cursor-pointer flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  {num}
                </button>
              ))}
              <div className="h-16" />
              <button 
                onClick={() => handleTpinNumPress('0')}
                className="h-16 bg-white border border-slate-100 rounded-2xl text-xl font-black text-slate-800 shadow-sm active:scale-95 cursor-pointer flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                0
              </button>
              <button 
                onClick={handleTpinDel}
                className="h-16 bg-purple text-white border-2 border-purple rounded-2xl flex items-center justify-center shadow-lg active:scale-95 cursor-pointer transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current stroke-[2] fill-none">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sending Money Loading Overlay */}
      {isLoadingOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none animate-fade-in">
          <div className="w-[112px] h-[112px] relative flex items-center justify-center mb-10">
            {/* Spinning vector ring */}
            <div className="absolute inset-0 border-2 border-transparent border-t-purple border-r-purple rounded-full animate-spin" />
            
            <div className="bg-white rounded-2xl border border-slate-100 w-[72px] h-[72px] flex flex-col items-center justify-center leading-none shadow-sm">
              <span className="text-[8px] font-black text-purple">CBE</span>
              <span className="text-sm font-black italic text-purple">Birr</span>
            </div>
          </div>

          <div className="text-xl font-black text-slate-800 tracking-[0.2em] mb-3">SEND MONEY</div>
          
          <div className="flex gap-1.5 mb-3 select-none">
            <div className="w-2.5 h-2.5 bg-purple rounded-full animate-bounce" />
            <div className="w-2.5 h-2.5 bg-purple rounded-full animate-bounce [animation-delay:0.15s]" />
            <div className="w-2.5 h-2.5 bg-purple rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>

          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.45em] text-center px-8 leading-relaxed opacity-75">
            PLEASE WAIT WHILE WE SECURE YOUR TRANSACTION...
          </div>
        </div>
      )}

      {/* Success Details overlay Screen */}
      {isSuccessOpen && (
        <SuccessScreen 
          tid={lastTransaction.tid}
          receiver={lastTransaction.name}
          accNum={lastTransaction.acc}
          amount={lastTransaction.amount}
          dateStr={lastTransaction.date}
          timeStr={lastTransaction.datetime.split(' ').slice(-2).join(' ')}
          newBalance={lastTransaction.newBal}
          onClose={() => { setIsSuccessOpen(false); setActivePage('dashboard'); }}
          onOpenReceipt={() => setIsReceiptOpen(true)}
          onOpenSaveAccount={handleOpenSaveAccountModalDirect}
        />
      )}

      {/* Dynamic VAT customer PDF receipt drawer modal */}
      {isReceiptOpen && (
        <ReceiptModal 
          tid={lastTransaction.tid}
          name={lastTransaction.name}
          accNum={lastTransaction.acc}
          amount={lastTransaction.amount}
          dateStr={lastTransaction.date}
          datetimeStr={lastTransaction.datetime}
          newBalance={lastTransaction.newBal}
          onClose={() => setIsReceiptOpen(false)}
        />
      )}

      {/* Client Edit Profile settings panel popup code */}
      {isEditProfileOpen && (
        <div 
          className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center px-6"
          onClick={(e) => e.target === e.currentTarget && setIsEditProfileOpen(false)}
        >
          <div className="bg-white rounded-[24px] p-8 w-full max-w-[380px] shadow-2xl relative select-none animate-fade-in">
            <button 
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 cursor-pointer p-1"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.1" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center text-purple mb-4">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>

            <h2 className="text-xl font-black text-slate-800 mb-6">Update My Profile</h2>
            
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 select-none">
              Update My Profile Name
            </label>
            <input 
              type="text"
              value={editNameField}
              onChange={(e) => setEditNameField(e.target.value)}
              className="w-full h-13 border-2 border-purple rounded-xl px-4 text-sm font-black text-slate-800 outline-none bg-slate-50 mb-5"
            />

            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 select-none">
              Update My Simulated Balance (ETB)
            </label>
            <input 
              type="number"
              value={editBalanceField}
              onChange={(e) => setEditBalanceField(e.target.value)}
              className="w-full h-13 border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-800 outline-none bg-slate-50 mb-6"
            />

            <button 
              onClick={handleSaveEditProfile}
              className="w-full h-13 bg-purple text-white border-none rounded-xl font-black text-[13px] uppercase tracking-widest cursor-pointer shadow-md hover:brightness-110 active:scale-97 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Save Account Contact entry modal */}
      {isSaveAccountOpen && (
        <div 
          className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center px-6 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setIsSaveAccountOpen(false)}
        >
          <div className="bg-white rounded-[24px] p-8 w-full max-w-[380px] shadow-2xl relative select-none">
            <button 
              onClick={() => setIsSaveAccountOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 cursor-pointer p-1"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-6">Save Account</h2>
            
            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 select-none">
              Account Holder Name
            </label>
            <input 
              type="text"
              placeholder="Enter name"
              value={addAccName}
              onChange={(e) => setAddName(e.target.value)}
              className="w-full h-13 border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-800 bg-slate-50 outline-none mb-5"
            />

            <label className="block text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2 select-none">
              Account Number
            </label>
            <input 
              type="text"
              placeholder="Enter account number"
              value={addAccNum}
              onChange={(e) => setAddNum(e.target.value.replace(/\D/g, ''))}
              className="w-full h-13 border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-800 bg-slate-50 outline-none mb-6"
            />

            <button 
              onClick={handleAddSaveContact}
              disabled={!addAccName.trim() || !addAccNum.trim()}
              className={`w-full h-13 rounded-xl font-black text-[13px] border-none transition-all ${
                addAccName.trim() && addAccNum.trim() 
                  ? 'bg-purple text-white cursor-pointer hover:brightness-110 active:scale-97' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Save Account
            </button>
          </div>
        </div>
      )}

      {/* Saved Accounts listing Drawer slider sheet */}
      {isSavedAccountsOpen && (
        <div 
          className="fixed inset-0 z-[500] bg-black/50 flex items-end justify-center select-none"
          onClick={(e) => e.target === e.currentTarget && setIsSavedAccountsOpen(false)}
        >
          <div className="bg-white rounded-t-[24px] p-6 w-full max-w-[430px] max-h-[85vh] flex flex-col relative animate-slide-up shadow-2xl">
            <button 
              onClick={() => setIsSavedAccountsOpen(false)}
              className="absolute top-4 right-4 bg-slate-100 rounded-lg p-1.5 text-slate-500 hover:text-red-500 cursor-pointer flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.0" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="text-2xl font-black text-slate-800 mb-5 pl-1">Saved Accounts</h2>
            
            {/* Search Input */}
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 h-12 mb-4">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="#9ca3af" strokeWidth="2.1" fill="none">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text"
                placeholder="Search saved accounts..."
                value={savedSearchQuery}
                onChange={(e) => setSavedSearchQuery(e.target.value)}
                className="flex-1 border-none outline-none text-xs font-semibold text-slate-800 bg-transparent placeholder-slate-400"
              />
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto flex flex-col gap-2 flex-grow pr-0.5">
              {filteredSavedAccounts.map((a, i) => (
                <div 
                  key={i}
                  onClick={() => handleSelectSavedContact(a.number, a.name)}
                  className="flex items-center gap-3 bg-white border border-slate-100 hover:bg-slate-50 rounded-2xl p-4 cursor-pointer transition-colors shadow-sm active:scale-[0.99]"
                >
                  <div className="w-10 h-10 bg-purple/10 text-purple rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-slate-800 uppercase truncate leading-none mb-1">
                      {a.name}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                      <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="1.5" fill="none">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      {a.number}
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteSavedContact(i); }}
                    className="p-1.5 text-slate-300 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
                      <polyline points="3 6 5 6 21 6" strokeWidth="2" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              ))}

              {filteredSavedAccounts.length === 0 && (
                <div className="text-center py-10 text-slate-300 text-xs font-bold font-mono">
                  No saved contacts.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast alert display popup */}
      {toastText && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow-2xl z-[99999] select-none animate-fade-in flex items-center gap-1.5 border border-white/10">
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-[3.5] fill-none">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toastText}
        </div>
      )}

    </div>
  );
}
