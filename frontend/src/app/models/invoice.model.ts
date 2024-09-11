export interface Invoice {
  date: string;
  id: string;
  customerName: string;
  amount: number;
  status: string;
  createdAt: string;
  invoiceProvider: string;
  description: string;
}
