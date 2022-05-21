import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class CharterDetails extends PickType(CreateServiceDetailsDto, [
  'origin',
  'operatingAreas',
  'vehicleSeats',
  'vehicleType',
  'hourlyPrice',
  'mileagePrice',
  'hasDriver',
  'workingDays',
  'workingHoursStart',
  'workingHoursEnd',
]) {}
