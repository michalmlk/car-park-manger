export interface ReservationDTO {
  userId: string;
  parkingSpot: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
}
