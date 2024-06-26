import axios, { isAxiosError } from 'axios';

export const handleReserveSpot = async (parkingSpot: string, userId: string): Promise<void> => {
  if (parkingSpot) {
    try {
      const { data: reservationData } = await axios.post('http://localhost:3000/api/reservations/create', {
        userId,
        parkingSpot,
        startTime: new Date(),
        endTime: new Date(),
        status: 'active',
      });
      await axios.put(`http://localhost:3000/api/parkingSpots/pick/${parkingSpot}`, {
        lastReservation: reservationData._id,
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
