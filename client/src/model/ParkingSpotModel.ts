export interface ParkingSpotDTO {
  _id: string;
  number: number;
  level: number;
  status: 'free' | 'reserved';
  lastReservation: string | undefined;
}
