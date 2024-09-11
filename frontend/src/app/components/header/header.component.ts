import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';
import { CommonModule } from '@angular/common';
import { ViewStateService } from '../../services/view-state.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    FormsModule,
    MatIcon,
    CommonModule
  ]
})
export class HeaderComponent implements OnInit {
  @Input() invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  
  searchText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  startDate$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  endDate$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  paidInvoices: number = 0;
  totalInvoices: number = 0;
  inProcessInvoices: number = 0;
  unpaidInvoices: number = 0;

  isFullView$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Output() filtersChanged = new EventEmitter<{ searchText: string, startDate: string, endDate: string }>();
  @Output() viewChanged = new EventEmitter<boolean>();

  private updatingQueryParams = false; // Flag to prevent multiple API calls

  constructor(
    private invoiceService: InvoiceService,
    private viewStateService: ViewStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  

  ngOnInit(): void {
    combineLatest([this.searchText$, this.startDate$, this.endDate$])
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(([searchText, startDate, endDate]) => {
          if (this.updatingQueryParams) {
            return [];
          }
          const parsedStartDate = startDate ? new Date(startDate) : null;
          const parsedEndDate = endDate ? new Date(endDate) : null;
          return this.invoiceService.searchInvoices(searchText, parsedStartDate, parsedEndDate);
        })
      )
      .subscribe((invoices) => {
        this.invoices = invoices;
        this.filteredInvoices = invoices;
        this.calculateInvoiceStatistics();
      });
  }

  calculateInvoiceStatistics(): void {
    this.totalInvoices = this.filteredInvoices.length;
    this.paidInvoices = this.filteredInvoices.filter(invoice => invoice.status === 'Paid').length;
    this.inProcessInvoices = this.filteredInvoices.filter(invoice => invoice.status === 'Pending').length;
    this.unpaidInvoices = this.filteredInvoices.filter(invoice => invoice.status === 'Overdue').length;
  }

  resetFilters(): void {
    this.searchText$.next('');  
    this.startDate$.next(''); 
    this.endDate$.next('');  
    
    this.updateQueryParams('', ''); 
    this.viewStateService.setFullView(true);
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    this.updateQueryParams(searchText, 'searchText');
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const startDate = input.value;
    this.updateQueryParams(startDate, 'startDate');
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const endDate = input.value;

    this.updateQueryParams(endDate, 'endDate');
  }

  updateQueryParams(value: string, paramType: string): void {
  this.updatingQueryParams = true;

  const queryParams = {
    searchText: paramType === 'searchText' ? value : this.searchText$.value || '',
    startDate: paramType === 'startDate' ? value : this.startDate$.value || '',
    endDate: paramType === 'endDate' ? value : this.endDate$.value || '',
  };

  if (paramType === 'searchText') {
    this.searchText$.next(value);
  } else if (paramType === 'startDate') {
    this.startDate$.next(value);
  } else if (paramType === 'endDate') {
    this.endDate$.next(value);
  }

  this.router.navigate(['/invoices'], {
    queryParams,
  }).finally(() => {
    this.updatingQueryParams = false;
  });

  this.filtersChanged.emit({
    searchText: queryParams.searchText,
    startDate: queryParams.startDate,
    endDate: queryParams.endDate,
  });
}


  toggleFullView(): void {
    this.viewStateService.setFullView(true);
    this.isFullView$.next(true);
  }

  toggleHalfView(): void {
    this.viewStateService.setFullView(false);
    this.isFullView$.next(false);
  }
}
