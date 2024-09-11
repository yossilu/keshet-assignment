import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CommonModule } from '@angular/common';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'; 
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  invoice$: Observable<any> = of(null); 
  @ViewChild('invoiceDetails') invoiceDetails!: ElementRef; 
  @ViewChild('exportButton') exportButton!: ElementRef; 

  constructor(private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoice$ = this.route.paramMap.pipe(
      mergeMap(params => {
        const id = params.get('id');
        if (id) {
          return this.invoiceService.getInvoiceById(id); 
        } else {
          return of(null); 
        }
      })
    );
  }

  exportToPDF(): void {
    this.exportButton.nativeElement.style.display = 'none';
  
    html2canvas(this.invoiceDetails.nativeElement, {
      scale: 2, 
      useCORS: true, // Allow cross-origin images (if any)
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
  
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      const xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
  
      pdf.addImage(imgData, 'PNG', xPos, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', xPos, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save(`invoice_${new Date().getTime()}.pdf`);
    }).finally(() => {
      this.exportButton.nativeElement.style.display = 'block';
    });
  }
}
