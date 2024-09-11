import { Injectable, NotFoundException } from '@nestjs/common';
import { invoices } from './mock-invoice-data';
import { Invoice } from './interfaces/invoice.interface';
import { InvoiceFilterDto } from './dto/invoice-filter.dto';

@Injectable()
export class InvoicesService {
  private invoices = invoices; // Mock data

  searchInvoices(filterDto: InvoiceFilterDto): Invoice[] {
    const { searchText, startDate, endDate } = filterDto;
    let filteredInvoices = this.invoices;

    // Search by customerName or description
    if (searchText) {
      filteredInvoices = filteredInvoices.filter((invoice) =>
        invoice.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        (invoice.description && invoice.description.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredInvoices = filteredInvoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= start && invoiceDate <= end;
      });
    }

    return filteredInvoices;
  }

  getInvoiceById(id: string): Invoice {
    const invoice = this.invoices.find((inv) => inv.id === id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }
}
