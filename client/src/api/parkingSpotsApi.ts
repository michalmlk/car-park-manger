import axios, { AxiosError, isAxiosError } from 'axios';
import { ParkingSpotDTO } from '../model/ParkingSpotModel.ts';

export const collectFreeParkingSpotsByDate = async (date: Date): Promise<ParkingSpotDTO[] | undefined> => {
  if (date) {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/parkingSpots/availableSpots/${date}`);
      return data;
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        console.log(`Failed to fetch free spots at day ${date}, ${e.message}`);
      } else if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw e;
      }
    }
  }
};

export const fetchParkingSpotById = async (id: string): Promise<ParkingSpotDTO | undefined> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/parkingSpots/getSpot/${id}`);
    if (data) {
      return data;
    }
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      console.log(`Failed to fetch spot, ${e.message}`);
      throw new AxiosError(e.message);
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
};
