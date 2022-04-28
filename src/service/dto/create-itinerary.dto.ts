import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { PlaceDto } from './create-place.dto';
import { StopDto } from './create-stop.dto';

export class CreateItineraryDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PlaceDto)
  origin: PlaceDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PlaceDto)
  destination: PlaceDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StopDto)
  stops: StopDto[];
}
