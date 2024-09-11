import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';

export const routes: Routes = [
  {
    path: 'invoices',
    component: InvoiceListComponent,
    children: [
      {
        path: ':id',
        component: InvoiceDetailComponent,
      },
    ],
  },
  { path: '', redirectTo: '/invoices', pathMatch: 'full' },
];
