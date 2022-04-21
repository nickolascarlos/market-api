import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUUID, Max, Validate, ValidateNested } from "class-validator";
import { Amenity } from "src/types";
import { CreateServiceDetailsDto } from "./service-details.dto";

export class CreateServiceDto {
    @IsUUID()
    @IsNotEmpty()
    providerId: string;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsNumber({
        maxDecimalPlaces: 2
    })
    @IsOptional()
    price: number;

    @IsNotEmpty()
    @IsEnum(Amenity, { each: true })
    amenities: Amenity[];

    @IsOptional()
    @IsBoolean()
    acceptsCards: boolean;
    
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateServiceDetailsDto)
    details: CreateServiceDetailsDto;
}
