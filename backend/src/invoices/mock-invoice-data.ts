import { Invoice } from './interfaces/invoice.interface';

export const invoices: Invoice[] = [
  {
    id: '1',
    customerName: 'John Doe',
    amount: 150.00,
    status: 'Paid',
    createdAt: '2023-10-01',
    date: '2023-10-01',
    invoiceProvider: 'Provider A',
    description: 'Consultation services for project X.'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    amount: 250.50,
    status: 'Pending',
    createdAt: '2023-09-15',
    date: '2023-09-15',
    invoiceProvider: 'Provider B',
    description: 'Graphic design services for new product launch.'
  },
  {
    id: '3',
    customerName: 'Acme Corp',
    amount: 600.00,
    status: 'Overdue',
    createdAt: '2023-08-30',
    date: '2023-08-30',
    invoiceProvider: 'Provider C',
    description: 'Supply of office equipment and furniture.'
  },
  {
    id: '4',
    customerName: 'Wayne Enterprises',
    amount: 450.00,
    status: 'Paid',
    createdAt: '2023-08-12',
    date: '2023-08-12',
    invoiceProvider: 'Provider D',
    description: 'IT infrastructure services and support.'
  },
  {
    id: '5',
    customerName: 'Stark Industries',
    amount: 1200.00,
    status: 'Pending',
    createdAt: '2023-07-25',
    date: '2023-07-25',
    invoiceProvider: 'Provider E',
    description: 'Research and development consultation services.'
  },
  {
    id: '6',
    customerName: 'Oscorp',
    amount: 780.00,
    status: 'Overdue',
    createdAt: '2023-07-10',
    date: '2023-07-10',
    invoiceProvider: 'Provider F',
    description: 'Chemical supplies and laboratory equipment.'
  },
  {
    id: '7',
    customerName: 'LexCorp',
    amount: 900.00,
    status: 'Paid',
    createdAt: '2023-06-20',
    date: '2023-06-20',
    invoiceProvider: 'Provider G',
    description: 'Marketing strategy consultation for new campaign.'
  },
  {
    id: '8',
    customerName: 'Umbrella Corp',
    amount: 320.00,
    status: 'Pending',
    createdAt: '2023-06-05',
    date: '2023-06-05',
    invoiceProvider: 'Provider H',
    description: 'Bioengineering research services for medical products.'
  },
  {
    id: '9',
    customerName: 'Weyland-Yutani',
    amount: 510.00,
    status: 'Overdue',
    createdAt: '2023-05-25',
    date: '2023-05-25',
    invoiceProvider: 'Provider I',
    description: 'Space exploration project consultation.'
  },
  {
    id: '10',
    customerName: 'Cyberdyne Systems',
    amount: 860.00,
    status: 'Paid',
    createdAt: '2023-05-12',
    date: '2023-05-12',
    invoiceProvider: 'Provider J',
    description: 'AI development and robotics services.'
  },
  {
    id: '11',
    customerName: 'Blue Sun Corporation',
    amount: 430.00,
    status: 'Pending',
    createdAt: '2023-04-28',
    date: '2023-04-28',
    invoiceProvider: 'Provider K',
    description: 'Supply of agricultural products and services.'
  },
  {
    id: '12',
    customerName: 'InGen',
    amount: 275.00,
    status: 'Overdue',
    createdAt: '2023-04-15',
    date: '2023-04-15',
    invoiceProvider: 'Provider L',
    description: 'Genetic engineering services for new species development.'
  },
  {
    id: '13',
    customerName: 'Tyrell Corporation',
    amount: 660.00,
    status: 'Paid',
    createdAt: '2023-03-30',
    date: '2023-03-30',
    invoiceProvider: 'Provider M',
    description: 'Replicant development and manufacturing.'
  },
  {
    id: '14',
    customerName: 'Delos Inc.',
    amount: 340.00,
    status: 'Pending',
    createdAt: '2023-03-15',
    date: '2023-03-15',
    invoiceProvider: 'Provider N',
    description: 'Luxury resort management and entertainment services.'
  },
  {
    id: '15',
    customerName: 'Massive Dynamic',
    amount: 780.00,
    status: 'Overdue',
    createdAt: '2023-03-05',
    date: '2023-03-05',
    invoiceProvider: 'Provider O',
    description: 'Advanced technology research and development services.'
  }
];
