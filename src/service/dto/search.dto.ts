import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateIf,
} from 'class-validator';
import { __ } from 'src/translatorInstance';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/(\d{4})-0?(\d+)-0?(\d+)/, {
    message: __('date must be a valid ISO date string: yyyy-mm-dd'),
  })
  date: string;

  @IsNotEmpty()
  // @IsDefined({
  //   message: __('As date is provided, a timezone is needed'),
  // })
  @IsString()
  @ValidateIf((o) => o.date !== undefined)
  timezone: string;
}
