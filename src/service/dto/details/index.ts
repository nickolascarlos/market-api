import { CarpoolDetails } from './carpool.dto';
import { CharterDetails } from './charter.dto';
import { FreightDetails } from './feight.dto';
import { PrivateCarDetails } from './private-car.dto';
import { RentalDetails } from './rental.dto';
import { SchoolShuttleDetails } from './school-shuttle.dto';
import { VanpoolDetails } from './vanpool.dto';

export default {
  'school-shuttle': SchoolShuttleDetails,
  carpool: CarpoolDetails,
  vanpool: VanpoolDetails,
  charter: CharterDetails,
  rental: RentalDetails,
  freight: FreightDetails,
  'private-car': PrivateCarDetails,
};
