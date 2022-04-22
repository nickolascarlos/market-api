import { ValidationPipe } from "@nestjs/common";

export const customValidationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })