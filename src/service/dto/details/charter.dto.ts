import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class CharterDetails extends PickType(CreateServiceDetailsDto, [
  'origin',
  'operationAreas',
  'vehicleSeats',
  'vehicleType',
  'hourlyPrice',
  'mileagePrice',
  'hasDriver',
  'workingDays',
  'workingHoursStart',
  'workingHoursEnd',
]) {}
