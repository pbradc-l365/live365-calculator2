export interface ExpenseOption {
  id: string;
  name: string;
  category: 'hosting' | 'licensing' | 'reporting';
  cost: number;
  description: string;
  color: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  details?: string;
}

export interface ComparisonState {
  live365Monthly: number;
  radioCoBase: number;
}
