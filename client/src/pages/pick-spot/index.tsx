import { FC, useEffect, useState } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';
import SpotItem from '../../components/spot-item/SpotItem.tsx';
import { PageContent, PageFooter, PageSubtitle, PageTitle, PageWrapper, SpotsWrapper } from './pick-spot.styles.tsx';
import { Button } from '../../stories/components/button/Button.tsx';
import styles from '../dashboard/dashboard.module.scss';

const fetchParkingSpots = async (): Promise<ParkingSpotDTO[] | undefined> => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/parkingSpots/availableSpots');
    if (data) {
      return data;
    }
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      console.log(`Failed to fetch spots, ${e.message}`);
      throw new AxiosError(e.message);
    } else if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
};

interface ParkingSpotDTO {
  _id: string;
  number: number;
  level: number;
  status: 'free' | 'reserved';
  lastReservation: string | undefined;
}

const PickSpotView: FC = () => {
  const [freeSpots, setFreeSpots] = useState<ParkingSpotDTO[]>([]);
  useEffect(() => {
    fetchParkingSpots().then((data) => {
      if (data) {
        setFreeSpots(data);
      }
    });
  }, []);
  const [pickedSpot, pickSpot] = useState<string | undefined>(undefined);
  console.log(pickedSpot);

  const handlePickSpot = (id: string) => {
    if (pickedSpot === id) {
      pickSpot(undefined);
    } else {
      pickSpot(id);
    }
  };

  return (
    <PageWrapper>
      <PageTitle>Pick Place</PageTitle>
      <PageSubtitle>Available places</PageSubtitle>
      <PageContent>
        <SpotsWrapper>
          {freeSpots &&
            freeSpots.map((spot, idx) => (
              <SpotItem
                onClick={() => handlePickSpot(spot._id)}
                key={idx}
                spot={spot}
                selected={pickedSpot === spot._id}
              />
            ))}
        </SpotsWrapper>
      </PageContent>
      <PageFooter>
        <Button
          className={styles['create-reservation']}
          primary
          size="large"
          label="Create"
          onClick={() => alert('ok')}
        />
      </PageFooter>
    </PageWrapper>
  );
};

export default PickSpotView;
