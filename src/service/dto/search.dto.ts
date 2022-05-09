import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { __ } from 'src/translatorInstance';

export class searchDto {
  @IsOptional()
  @IsString()
  categoryName: string;

  @IsOptional()
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  destination: string;

  @IsOptional()
  @IsString()
  @Matches(/(\d{4})-0?(\d+)-0?(\d+)/, {
    message: __('date must be a valid ISO date string: yyyy-mm-dd'),
  })
  date: string;

  @ValidateIf((o) => o.date !== undefined)
  @IsNotEmpty({
    message: __('As date is provided, a timezone is needed'),
  })
  @IsString()
  timezone: string;
}
