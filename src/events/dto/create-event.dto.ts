import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  isEmpty,
} from 'class-validator';
import { IsUnique } from '@youba/nestjs-dbvalidator';

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

  @IsDateString()
  EndDate: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'event', column: 'EventName' }])
  EventName: string;

  @IsString()
  Region: string;

  @IsDateString()
  @IsNotEmpty()
  StartDate: string;

  @IsString()
  @IsNotEmpty()
  Sumary: string;

  @IsArray()
  Tickets: Array<object>;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  Imagenes?: string[];
}
