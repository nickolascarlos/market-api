import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUUID, Max, Validate, ValidateNested } from "class-validator";
import { Amenity } from "src/types";
import ValidServiceCategoryName from "src/validators/ValidServiceCategoryName.validator";
import { CreateServiceDetailsDto } from "./service-details.dto";

export class CreateServiceDto {
    @IsUUID()
    @IsNotEmpty()
    providerId: string;

    @IsNotEmpty()
    @Validate(ValidServiceCategoryName)
    categoryName: string;

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
