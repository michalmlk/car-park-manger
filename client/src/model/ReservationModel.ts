export interface ReservationDTO {
  _id: string;
  userId: string;
  parkingSpot: string;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
}
