import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceService } from '../../services/invoice.service';
import { MatIcon } from '@angular/material/icon';
import { switchMap, Observable, of, BehaviorSubject, combineLatest, tap, debounceTime } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { ViewStateService } from '../../services/view-state.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIcon,
  ],
})
export class InvoiceListComponent implements OnInit {
  invoices$: Observable<Invoice[]> = of([]); 
  filteredInvoices$: Observable<Invoice[]> = of([]); 
  selectedInvoice$: Observable<Invoice | null> = of(null);

  searchText$ = new BehaviorSubject<string>(''); 
  startDate$ = new BehaviorSubject<Date | null>(null);
  endDate$ = new BehaviorSubject<Date | null>(null);
  isFullView$ = new BehaviorSubject<boolean>(true); 

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private viewStateService: ViewStateService
  ) {}

  ngOnInit(): void {
    this.viewStateService.isFullView$.subscribe((isFullView) => {
      this.isFullView$.next(isFullView);
    });

    this.filteredInvoices$ = combineLatest([
      this.searchText$,
      this.startDate$,
      this.endDate$,
      this.route.queryParams, 
    ]).pipe(
      debounceTime(300),
      switchMap(([searchText, startDate, endDate, queryParams]) => {
        searchText = queryParams['searchText'] || searchText;
        startDate = queryParams['startDate'] ? new Date(queryParams['startDate']) : startDate;
        endDate = queryParams['endDate'] ? new Date(queryParams['endDate']) : endDate;

        return this.invoiceService.searchInvoices(searchText, startDate, endDate);
      }),
      tap((invoices) => {
        console.log('Filtered Invoices:', invoices); // Debugging
      })
    );

    this.selectedInvoice$ = this.route.params.pipe(
      switchMap((params) => {
        const invoiceId = params['id'];
        if (invoiceId) {
          return this.invoiceService.getInvoiceById(invoiceId); 
        } else {
          return of(null); 
        }
      })
    );
  }

  selectInvoice(invoiceId: string): void {
    this.viewStateService.setFullView(false); 
    this.router.navigate([`/invoices/${invoiceId}`], {
      relativeTo: this.route,
      queryParamsHandling: 'merge', 
    });
  }

  onViewChange(isFullView: boolean): void {
    this.viewStateService.setFullView(isFullView);
  }

  onSearchTextChange(searchText: string): void {
    this.searchText$.next(searchText);
  }

  onStartDateChange(startDate: Date | null): void {
    this.startDate$.next(startDate);
  }

  onEndDateChange(endDate: Date | null): void {
    this.endDate$.next(endDate);
  }
}
