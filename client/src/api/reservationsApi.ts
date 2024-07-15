import axios, { isAxiosError } from 'axios';
import dayjs from 'dayjs';

export const handleReserveSpot = async (
  parkingSpot: string,
  userId: string,
  startDate: dayjs.Dayjs | null,
): Promise<void> => {
  if (parkingSpot && startDate) {
    try {
      const { data: reservationData } = await axios.post('http://localhost:3000/api/reservations/create', {
        userId,
        parkingSpot,
        startTime: startDate.toISOString(),
        endTime: startDate.toISOString(),
        status: 'active',
      });
      await axios.put(`http://localhost:3000/api/parkingSpots/pick/${parkingSpot}`, {
        lastReservation: reservationData._id,
        status: 'reserved',
      });
      console.log('Reservation created successfully');
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        throw new Error(`Failed to pick place ${e.message}`);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw e;
      }
    }
  }
};
