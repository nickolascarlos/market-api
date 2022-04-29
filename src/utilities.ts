import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const customValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
  stopAtFirstError: true,
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory: (errors) => new BadRequestException(errors),
});
