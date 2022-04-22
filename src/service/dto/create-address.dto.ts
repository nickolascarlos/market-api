import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    street: string;
    
    @IsOptional()
    @IsString()
    neighborhood: string;
    
    @IsNotEmpty()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    country: string;
}