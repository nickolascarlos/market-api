import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const customValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory: (errors) => new BadRequestException(errors),
});

export const validateEmail = (email) => {
  return !!String(email)
    .toLowerCase()
    // eslint-disable-next-line prettier/prettier
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export const isNotExpired = (expirationTimestamp: number) =>
  new Date(expirationTimestamp) > new Date();
