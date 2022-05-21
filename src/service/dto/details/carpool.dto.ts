import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class CarpoolDetails extends PickType(CreateServiceDetailsDto, [
  'itinerary',
  'tripStartDateTime',
  'vehicleSeats',
  'acceptsPackages',
  'isTripStartTimeFlexible',
]) {}
