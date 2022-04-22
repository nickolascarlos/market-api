import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CargoType, VehicleType, WeekDay } from "src/types";
import { CreateItineraryDto } from "./create-itinerary.dto";
import { PlaceDto } from "./create-place.dto";

export class CreateServiceDetailsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateItineraryDto)
    itinerary: CreateItineraryDto;

    @IsOptional()
    @IsString()
    goingTripStartTime: string;
    
    @IsOptional()
    @IsString()
    returnTripStartTime: string;
    
    @IsOptional()
    @IsEnum(WeekDay, { each: true })
    workingDays: WeekDay[];
    
    @IsOptional()
    @IsString()
    hasAssistant: boolean;
    
    @IsOptional()
    @IsString()
    tripStartDateTime: string;
    
    @IsOptional()
    @IsNumber()
    seats: number;
    
    @IsOptional()
    @IsBoolean()
    acceptsPackages: boolean;
    
    @IsOptional()
    @IsBoolean()
    isTripStartTimeFlexible: boolean;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => PlaceDto)
    origin: PlaceDto;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PlaceDto)
    operatingAreas: PlaceDto[];
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 0
    })
    vehicleSeats: number;
    
    @IsOptional()
    @IsEnum(VehicleType)
    vehicleType: VehicleType;
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 2
    })
    hourlyPrice: number;
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 2
    })
    mileagePrice: number;
    
    @IsOptional()
    @IsBoolean()
    hasDriver: boolean;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PlaceDto)
    dropOffPlaces: PlaceDto[];
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 2
    })
    dailyPrice: number;
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 2
    })
    surplusMileagePrice: number;
    
    @IsOptional()
    @IsString()
    workingHoursStart: string;
    
    @IsOptional()
    @IsString()
    workingHoursEnd: string;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PlaceDto)
    operationAreas: PlaceDto[];
    
    @IsOptional()
    @IsEnum(CargoType, { each: true })
    cargoTypes: CargoType[];
    
    @IsOptional()
    @IsNumber({
        maxDecimalPlaces: 2
    })
    maximumWeight: number;
    
    @IsOptional()
    @IsBoolean()
    hasPackaging: boolean;
    
    @IsOptional()
    @IsBoolean()
    hasFurnitureAssembly: boolean;
}