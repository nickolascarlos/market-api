import { IsNotEmpty, IsOptional } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    text: string;

    @IsOptional()
    street: string;
    
    @IsOptional()
    neighborhood: string;
    
    @IsNotEmpty()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;
}