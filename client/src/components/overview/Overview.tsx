import { FC, useEffect, useState } from 'react';
import { StyledOverviewWrapper } from './Overview.styles.tsx';
import axios, { isAxiosError } from 'axios';
import { useUser } from '@clerk/clerk-react';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import PickedSpot from '../picked-spot/PickedSpot.tsx';

const Overview: FC = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/parkingSpots/availableSpots')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const fetchReservation = async (userId: string): Promise<ReservationDTO | undefined> => {
    if (userId) {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/reservations/get/${userId}`);
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

  const { user } = useUser();
  const [overviewData, setOverviewData] = useState<ReservationDTO>();
  useEffect(() => {
    if (user) {
      fetchReservation(user.id).then((data) => {
        if (data) {
          setOverviewData(data);
          console.log(data);
        }
      });
    }
  }, [user]);

  return (
    <StyledOverviewWrapper>
      {overviewData ? (
        <PickedSpot
          parkingSpotId={overviewData?.parkingSpot}
          startTime={overviewData?.startTime}
          endTime={overviewData?.endTime}
        />
      ) : (
        <Spinner />
      )}
    </StyledOverviewWrapper>
  );
};

export default Overview;
