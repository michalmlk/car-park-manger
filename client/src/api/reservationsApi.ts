import axios, { isAxiosError } from 'axios';
import { ReservationDTO } from '../model/ReservationModel.ts';
import { OverviewData } from '../pages/dashboard';

export const handleReserveSpot = async (parkingSpot: string, userId: string, startDate: Date): Promise<void> => {
  if (parkingSpot && startDate) {
    try {
      await axios.post('http://localhost:3000/api/reservations/create', {
        userId,
        parkingSpot,
        startTime: startDate,
        endTime: startDate,
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

export const fetchReservation = async (userId: string, today: Date): Promise<ReservationDTO | undefined> => {
  if (userId) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/reservations/get/${userId}/${today.toISOString()}`);
      return data;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(`Failed to fetch reservation data, ${e.message}`);
      } else if (e instanceof Error) {
        console.log(e.message);
      } else throw e;
    }
  }
};

export const fetchOverviewData = async (userId: string): Promise<OverviewData | undefined> => {
  if (userId) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/reservations/${userId}/overview`);
      return data;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(`Failed to fetch overview data, ${e.message}`);
      } else if (e instanceof Error) {
        console.log(e.message);
      } else throw e;
    }
  }
};

export const fetchUserReservations = async (userId: string): Promise<ReservationDTO[] | undefined> => {
  if (userId) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/reservations/getAll/${userId}`);
      return data;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(`Failed to fetch reservations, ${e.message}`);
      } else if (e instanceof Error) {
        console.log(e.message);
      } else throw e;
    }
  }
};

export const deleteReservation = async (id: string): Promise<void> => {
  if (id) {
    try {
      await axios.delete(`http://localhost:3000/api/reservations/delete/${id}`);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(`Failed to delete reservation, ${e.message}`);
      } else if (e instanceof Error) {
        console.log(e.message);
      } else throw e;
    }
  }
};
