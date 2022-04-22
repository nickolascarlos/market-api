import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsUUID, Max, Validate, ValidateNested } from "class-validator";
import { Amenity } from "src/types";
import ValidServiceCategoryId from "src/validators/ValidServiceCategoryId.validator";
import { CreateServiceDetailsDto } from "./service-details.dto";

export class CreateServiceDto {
    @IsUUID()
    @IsNotEmpty()
    providerId: string;

    @IsUUID()
    @IsNotEmpty()
    @Validate(ValidServiceCategoryId)
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
