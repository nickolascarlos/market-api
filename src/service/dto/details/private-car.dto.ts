import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class PrivateCarDetails extends PickType(CreateServiceDetailsDto, [
  'origin',
  'operationAreas',
  'vehicleType',
  'vehicleSeats',
  'workingDays',
  'workingHoursStart',
  'workingHoursEnd',
]) {}
