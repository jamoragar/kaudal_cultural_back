import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateNested,
  isEmpty,
  isString,
} from 'class-validator';
import { IsUnique } from '@youba/nestjs-dbvalidator';
import { Type } from 'class-transformer';

export class NestedTicketsPropertyDto {
  @IsString()
  @IsNotEmpty()
  TipoTicket: string;

  @IsNotEmpty()
  @Min(0)
  PrecioTicket: number;

  @IsNotEmpty()
  @Min(0)
  CantidadTicketTipo: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsString()
  @IsNotEmpty()
  City: string;

  @IsArray()
  Codes: Array<object>;

  @IsNotEmpty()
  @IsArray()
  Categories: string[];

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'event', column: 'EventName' }])
  EventName: string;

  @IsString()
  Region: string;

  @IsString()
  @IsNotEmpty()
  Sumary: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NestedTicketsPropertyDto)
  Tickets: Array<NestedTicketsPropertyDto>;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  Imagenes?: string[];

  @IsArray()
  @IsNotEmpty()
  Dates: Array<{ StartDate: string; EndDate: string }>;
}
