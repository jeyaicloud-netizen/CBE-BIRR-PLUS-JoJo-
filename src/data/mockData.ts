import { SavedAccount, Message, Transaction, ServiceItem, MiniAppItem } from '../types';

export const initialSavedAccounts: SavedAccount[] = [
  { number: '1000750226888', name: 'MRS MULUNESH MEKURIYA KEBED' },
  { number: '1000179205703', name: 'HABIB ARGIB ABIDERAZAK' },
  { number: '1000664945987', name: 'ISMAEL MENGISTU ARAGAW' },
  { number: '1000449866766', name: 'TESEFAYE KINFE ZEMECHA' },
  { number: '1000378192278', name: 'YOHANNIS GIRMA W/GEBREAL' },
];

export const defaultMessages: Message[] = [
  { id: '1', text: 'Dear Customer, you have deposited 15,000.00Br. into your CBE Birr account on 21/05/26 16:48 with receipt number CLH5XJERO4. Your current balance is 26,822.00Br. Thank you!', timestamp: '04:48 PM' },
  { id: '2', text: 'Dear ABDU SERIG SEID, you have successfully transferred 628.00Br. to 1000508935289-MOHAMED MIFITA BEDRU (Select Transfer) on 21-05-2026 16:47:25. Txn ID DCF47KQ1. Your balance is 11,822.00Br. Thank You!', timestamp: '04:47 PM' }
];

export const defaultHistory: Transaction[] = [
  { id: '1', title: 'Transfer to CBE Customer', date: '21-05-2026 16:54:17', amount: '- 10.00', type: 'outgoing' },
  { id: '2', title: 'Transfer to MR ABDULMEJID KEDRU ABDELLA', date: '21-05-2026 16:49:27', amount: '- 3,232.00', type: 'outgoing' },
  { id: '3', title: 'Money Received - CBE COMMERCIAL BANK', date: '21-05-2026 16:48:00', amount: '+ 15,000.00', type: 'incoming' },
  { id: '4', title: 'Transfer to MOHAMED MIFITA BEDRU', date: '21-05-2026 16:47:25', amount: '- 628.00', type: 'outgoing' }
];

export const allServices: ServiceItem[] = [
  { id: 'scan', label: 'Scan QR', icon: 'camera' },
  { id: 'other_bank', label: 'Other Bank Transfer', badge: '$', icon: 'bank' },
  { id: 'wallet', label: 'Wallet & Finance', icon: 'wallet' },
  { id: 'merchant', label: 'Pay Merchant', icon: 'dollar' },
  { id: 'fuel', label: 'Fuel Pay', icon: 'fuel' },
  { id: 'condo', label: 'Condominium', icon: 'building' },
  { id: 'request', label: 'Money Request', icon: 'user-plus' },
  { id: 'bot', label: 'Message Bot', badge: '●', icon: 'msg' },
  { id: 'save_account', label: 'Save Account', badge: '$', icon: 'save-acc' },
  { id: 'saved_accounts', label: 'Saved Accounts', badge: '●', icon: 'saved-accs' },
  { id: 'school', label: 'School Fee', icon: 'grad' },
  { id: 'bill', label: 'Bill Payment', icon: 'receipt' },
  { id: 'electric', label: 'Electric Bill', icon: 'zap' },
  { id: 'water', label: 'Water Bill', icon: 'drop' },
  { id: 'tv', label: 'Cable TV', icon: 'tv' },
  { id: 'traffic', label: 'Traffic Penalty', icon: 'alert' },
  { id: 'tax', label: 'Tax Payment', icon: 'file' },
  { id: 'donation', label: 'Donation', icon: 'heart' },
  { id: 'ticket', label: 'Ticket', icon: 'ticket' },
  { id: 'insurance', label: 'Insurance', icon: 'shield' },
  { id: 'card', label: 'Card Services', icon: 'card' },
  { id: 'shopping', label: 'Shopping', icon: 'bag' },
  { id: 'bus', label: 'Bus Ticket', icon: 'bus' },
  { id: 'flight', label: 'Flight Ticket', icon: 'plane' },
  { id: 'food', label: 'Food & Drinks', icon: 'food' },
  { id: 'internet', label: 'Internet Pay', icon: 'wifi' },
  { id: 'airtime', label: 'Airtime Pay', icon: 'phone' },
  { id: 'history', label: 'Transaction History', icon: 'history' },
];

export const miniAppsData: MiniAppItem[] = [
  { name: 'Kuraztech', bg: '#1a1a1a', emoji: '⚫', color: '#fff' },
  { name: 'Guzo', bg: '#16a34a', letter: 'G', color: '#fff' },
  { name: 'iChereta', bg: '#3b82f6', letter: 'i', color: '#fff' },
  { name: 'National ID', bg: '#e0f2fe', svg: 'globe', color: '#2563eb' },
  { name: 'DSTV', bg: '#06b6d4', letter: 'DStv', color: '#fff' },
  { name: 'ETAirlines', bg: '#eff6ff', svg: 'plane', color: '#3b82f6' },
  { name: 'Beu Delivery', bg: '#fef9c3', emoji: '🛵', color: '#000' },
  { name: 'School pay', bg: '#7A1B7B', cbe: true },
  { name: 'CBETickets', bg: '#7A1B7B', cbe: true },
  { name: 'CBEDonation', bg: '#fef9c3', emoji: '🍯', color: '#000' },
  { name: 'Commercepal', bg: '#fff', svg: 'target', color: '#ef4444' },
  { name: 'Brana pay', bg: '#fff', svg: 'pen', color: '#374151' },
  { name: 'TicketBiro', bg: '#3b82f6', letter: 'T', color: '#fff' },
  { name: 'SeregelaGebeya', bg: '#fef3e2', emoji: '🐎', color: '#000' },
  { name: 'Digital Equb', bg: '#fef3e2', emoji: '🏺', color: '#000' },
  { name: 'Henon School Pay', bg: '#1e3a8a', letter: 'H', color: '#fff' },
];
