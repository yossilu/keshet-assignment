import { IsOptional, IsString, IsDateString } from 'class-validator';

export class InvoiceFilterDto {
  @IsOptional()
  @IsString()
  searchText?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
