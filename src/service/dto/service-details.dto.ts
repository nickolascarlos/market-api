import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CargoType, VehicleType, WeekDay } from 'src/types';
import { CreateItineraryDto } from './create-itinerary.dto';
import { PlaceDto } from './create-place.dto';

export class CreateServiceDetailsDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateItineraryDto)
  itinerary: CreateItineraryDto;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(86399000)
  goingTripStartTime: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(86399000)
  returnTripStartTime: number;

  @ArrayNotEmpty()
  @IsEnum(WeekDay, { each: true })
  workingDays: WeekDay[];

  @IsNotEmpty()
  @IsBoolean()
  hasAssistant: boolean;

  @IsNotEmpty()
  @IsNumber()
  tripStartDateTime: number;

  @IsNotEmpty()
  @IsNumber()
  seats: number;

  @IsNotEmpty()
  @IsBoolean()
  acceptsPackages: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isTripStartTimeFlexible: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PlaceDto)
  origin: PlaceDto;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PlaceDto)
  operatingAreas: PlaceDto[];

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  vehicleSeats: number;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  hourlyPrice: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  mileagePrice: number;

  @IsNotEmpty()
  @IsBoolean()
  hasDriver: boolean;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PlaceDto)
  dropOffPlaces: PlaceDto[];

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  dailyPrice: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  surplusMileagePrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(86399000)
  workingHoursStart: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(86399000)
  workingHoursEnd: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PlaceDto)
  operationAreas: PlaceDto[];

  @ArrayNotEmpty()
  @IsEnum(CargoType, { each: true })
  cargoTypes: CargoType[];

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  maximumWeight: number;

  @IsNotEmpty()
  @IsBoolean()
  hasPackaging: boolean;

  @IsNotEmpty()
  @IsBoolean()
  hasFurnitureAssembly: boolean;
}

export class CreatePartialServiceDetailsDto extends PartialType(
  CreateServiceDetailsDto,
) {}
