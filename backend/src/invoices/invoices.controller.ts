import { Controller, Get, Param, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Invoice } from './interfaces/invoice.interface';
import { InvoiceFilterDto } from './dto/invoice-filter.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  // GET /invoices?searchText=someText&startDate=yyyy-mm-dd&endDate=yyyy-mm-dd
  @Get()
  searchInvoices(@Query() filterDto: InvoiceFilterDto): Invoice[] {
    return this.invoicesService.searchInvoices(filterDto);
  }

  // GET /invoices/:id
  @Get(':id')
  getInvoiceById(@Param('id') id: string): Invoice {
    return this.invoicesService.getInvoiceById(id);
  }
}
