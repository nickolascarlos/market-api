import { Type } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNotEmptyObject, IsOptional, Validate, ValidateNested } from "class-validator";
import { AddressDto } from "./create-address.dto";


export class LocationDto {
    @IsNotEmpty()
    @IsLatitude()
    lat: number; 

    @IsNotEmpty()
    @IsLongitude()
    lng: number;
}

export class PlaceDto {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
}