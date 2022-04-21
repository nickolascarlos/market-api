import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, Validate, ValidateNested } from "class-validator";
import { PlaceDto } from "./create-place.dto";

export class StopDto {
    @IsNotEmpty()
    @IsNumber()
    order: number;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PlaceDto)
    place: PlaceDto;
}