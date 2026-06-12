export interface Message {
  id: string;
  text: string;
  timestamp: string;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: 'incoming' | 'outgoing';
}

export interface SavedAccount {
  number: string;
  name: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface MiniAppItem {
  name: string;
  bg: string;
  emoji?: string;
  letter?: string;
  svg?: string;
  color?: string;
  cbe?: boolean;
}
