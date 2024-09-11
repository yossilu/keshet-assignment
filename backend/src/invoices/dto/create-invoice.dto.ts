import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  id: string; // Assuming id is a string, it can be changed to a number if needed.

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: string;

  @IsDateString()
  @IsNotEmpty()
  date: string; // Date of the invoice

  @IsString()
  @IsNotEmpty()
  invoiceProvider: string; // Provider of the invoice

  @IsString()
  @IsNotEmpty()
  description: string; // Description of the services
}
