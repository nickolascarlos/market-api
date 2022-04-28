import { IsNotEmpty } from "class-validator";


export class updateUserPasswordDto {

    @IsNotEmpty()
    newPassword: string;

    @IsNotEmpty()
    currentPassword: string;

}