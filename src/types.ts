export class SchoolShuttle {
  itinerary: Itinerary;
  goingTripStartTime: string;
  returnTripStartTime: string;
  workingDays: WeekDay[];
  hasAssistant: boolean;
}

export class Carpool {
  itinerary: Itinerary;
  tripStartDateTime: string;
  vehicleSeats: number;
  acceptsPackages: boolean;
  isTripStartTimeFlexible: boolean;
}

export class Vanpool {
  itinerary: Itinerary;
  goingTripStartTime: string;
  returnTripStartTime: string;
  workingDays: WeekDay[];
  vehicleSeats: number;
  acceptsPackages: boolean;
  isTripStartTimeFlexible: boolean;
}

export class Charter {
  origin: Place;
  operatingAreas: Place[];
  vehicleSeats: number;
  vehicleType: VehicleType;
  hourlyPrice: number;
  mileagePrice: number;
  hasDriver: boolean;
  workingDays: WeekDay[];
  workingHoursStart: number;
  workingHoursEnd: number;
}

export class Rental {
  origin: Place;
  dropOffPlaces: Place[];
  vehicleType: VehicleType;
  dailyPrice: number;
  mileagePrice: number;
  surplusMileagePrice: number;
  workingHoursStart: string;
  workingHoursEnd: string;
  workingDays: WeekDay[];
}

export class Freight {
  origin: Place;
  operationAreas: Place[];
  vehicleType: VehicleType;
  cargoTypes: CargoType[];
  maximumWeight: number;
  hasAssistant: boolean;
  hasPackaging: boolean;
  hasFurnitureAssembly: boolean;
}

export interface PrivateCar {
  origin: Place;
  operationAreas: Place[];
  vehicleType: VehicleType;
  vehicleSeats: number;
  workingDays: WeekDay[];
  workingHoursStart: number;
  workingHoursEnd: number;
}

// Helpers

export type PossibleServices =
  | Carpool
  | SchoolShuttle
  | Freight
  | Vanpool
  | Charter
  | Rental
  | PrivateCar;

export class Address {
  text: string;
  street?: string;
  neighborhood?: string;
  city: string;
  state?: string;
  country?: string;
}

export class Place {
  address: Address;
  location?: { lat: number; lng: number };
}

export class Itinerary {
  origin: Place;
  destination: Place;
  stops: Stop[];
}
export class Stop {
  order: number;
  place: Place;
}

export enum VehicleType {
  'BICYCLE',
  'MOTORCYCLE',
  'CAR',
  'PICKUP',
  'TRAILER',
  'VAN',
  'BUS',
  'EXEC_BUS',
  'MICROBUS',
  'TRUCK',
  'JET_SKI',
  'BOAT',
  'AIRPLANE',
  'HELICOPTER',
}

export enum CargoType {
  'PARCEL',
  'MOVING',
  'FREIGHT',
}

export enum Amenity {
  'WIFI',
  'AIR_CONDITIONING',
  'MASK_REQUIRED',
  'SMOKE_FREE',
  'ENHANCED_HEALTH_SAFETY',
  'MOBILE_TICKET',
  'RECLINING_SEATS',
  'TV',
  'DVD',
  'USB',
  'FRIDGE',
  'TOILET',
}

export enum WeekDay {
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
}

export enum SearchField {
  'ORIGIN',
  'DESTINATION',
  'GOING_DATE',
  'GOING_TIME',
  'RETURN_TIME',
  'RETURN_DATE',
}
