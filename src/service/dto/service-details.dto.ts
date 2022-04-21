import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { CargoType, VehicleType, WeekDay } from "src/types";
import { CreateItineraryDto } from "./create-itinerary.dto";
import { PlaceDto } from "./create-place.dto";

export class CreateServiceDetailsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateItineraryDto)
    itinerary: CreateItineraryDto;

    @IsOptional()
    goingTripStartTime: string;
    
    @IsOptional()
    returnTripStartTime: string;
    
    @IsOptional()
    @IsEnum(WeekDay, { each: true })
    workingDays: WeekDay[];
    
    @IsOptional()
    hasAssistant: boolean;
    
    @IsOptional()
    tripStartDateTime: string;
    
    @IsOptional()
    seats: number;
    
    @IsOptional()
    acceptsPackages: boolean;
    
    @IsOptional()
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
    vehicleSeats: number;
    
    @IsOptional()
    @IsEnum(VehicleType)
    vehicleType: VehicleType;
    
    @IsOptional()
    hourlyPrice: number;
    
    @IsOptional()
    mileagePrice: number;
    
    @IsOptional()
    hasDriver: boolean;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PlaceDto)
    dropOffPlaces: PlaceDto[];
    
    @IsOptional()
    dailyPrice: number;
    
    @IsOptional()
    surplusMileagePrice: number;
    
    @IsOptional()
    workingHoursStart: string;
    
    @IsOptional()
    workingHoursEnd: string;
    
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PlaceDto)
    operationAreas: PlaceDto[];
    
    @IsOptional()
    @IsEnum(CargoType, { each: true })
    cargoTypes: CargoType[];
    
    @IsOptional()
    maximumWeight: number;
    
    @IsOptional()
    hasPackaging: boolean;
    
    @IsOptional()
    hasFurnitureAssembly: boolean;
}