import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/invoices';
  private selectedInvoiceSubject = new BehaviorSubject<any>(null);
  selectedInvoice$ = this.selectedInvoiceSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  searchInvoices(searchText: string, startDate: Date | null, endDate: Date | null): Observable<any[]> {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    if (startDate) {
      params = params.set('startDate', startDate.toISOString().split('T')[0]);
    }

    if (endDate) {
      params = params.set('endDate', endDate.toISOString().split('T')[0]);
    }

    return this.http.get<Invoice[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching invoices:', error);
        return of([]);
      })
    );
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }

  selectInvoice(invoice: Invoice): void {
    this.selectedInvoiceSubject.next(invoice);
  }

  clearSelectedInvoice(): void {
    this.selectedInvoiceSubject.next(null);
  }
}
