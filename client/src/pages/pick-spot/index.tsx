import { FC, useEffect, useState } from 'react';
import SpotItem from '../../components/spot-item/SpotItem.tsx';
import { PageContent, PageFooter, PageSubtitle, PageTitle, PageWrapper, SpotsWrapper } from './pick-spot.styles.tsx';
import { Button } from '../../stories/components/button/Button.tsx';
import styles from '../dashboard/dashboard.module.scss';
import { useUser } from '@clerk/clerk-react';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { fetchParkingSpots } from '../../api/parkingSpotsApi.ts';
import { handleReserveSpot } from '../../api/reservationsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';

const PickSpotView: FC = () => {
  const [freeSpots, setFreeSpots] = useState<ParkingSpotDTO[]>([]);
  const [pickedSpot, pickSpot] = useState<string | undefined>(undefined);
  const { user } = useUser();

  useEffect(() => {
    fetchParkingSpots().then((data) => {
      if (data) {
        setFreeSpots(data);
      }
    });
  }, []);

  const handlePickSpot = (id: string) => {
    if (pickedSpot === id) {
      pickSpot(undefined);
    } else {
      pickSpot(id);
    }
  };

  const handleCreateReservation = async (): Promise<void> => {
    if (pickedSpot && user) {
      await handleReserveSpot(pickedSpot, user.id);
    }
  };

  return (
    <PageWrapper>
      <PageTitle>Pick Place</PageTitle>
      <PageSubtitle>Available places</PageSubtitle>
      <PageContent>
        <SpotsWrapper>
          {freeSpots.length ? (
            freeSpots.map((spot, idx) => (
              <SpotItem
                onClick={() => handlePickSpot(spot._id)}
                key={idx}
                spot={spot}
                selected={pickedSpot === spot._id}
              />
            ))
          ) : (
            <Spinner label="Fetching places..." />
          )}
        </SpotsWrapper>
      </PageContent>
      <PageFooter>
        <Button
          className={styles['create-reservation']}
          primary
          size="large"
          label="Create"
          onClick={handleCreateReservation}
          disabled={!pickedSpot}
        />
      </PageFooter>
    </PageWrapper>
  );
};

export default PickSpotView;
