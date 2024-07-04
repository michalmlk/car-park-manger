import { FC, useEffect, useMemo, useState } from 'react';
import { Button } from '../../stories/components/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../stories/components/page-header/PageHeader.tsx';
import { ArrowBack, DeleteOutline } from '@mui/icons-material';
import { ActiveReservationsWrapper } from './reservations-overview.styles.tsx';
import { PageWrapper } from '../../stories/components/page-wrapper/PageWrapper.tsx';
import { SpotsWrapper } from '../pick-spot/pick-spot.styles.tsx';
import SpotItem from '../../components/spot-item/SpotItem.tsx';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { deleteReservation, fetchUserReservations } from '../../api/reservationsApi.ts';
import { useUser } from '@clerk/clerk-react';
import PickedSpot from '../../components/picked-spot/PickedSpot.tsx';
import { Action } from '../../model/ActionModel.ts';

const ReservationsOverview: FC = () => {
  const navigate = useNavigate();
  const [pickedSpot, pickSpot] = useState<string | undefined>(undefined);
  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  const { user } = useUser();

  const handlePickSpot = (id: string) => {
    if (pickedSpot === id) {
      pickSpot(undefined);
    } else {
      pickSpot(id);
    }
  };

  const handleDeleteReservation = async (id: string): Promise<void> => {
    try {
      console.log(id);
      await deleteReservation(id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserReservations(user!.id).then((data) => data && setReservations(data));
  }, [reservations.length, user]);

  return (
    <PageWrapper>
      <PageHeader
        title="Reservations"
        actions={[
          {
            action: () => navigate('/dashboard'),
            icon: <ArrowBack />,
          },
        ]}
      />
      <ActiveReservationsWrapper>
        <SpotsWrapper>
          {reservations.length ? (
            reservations.map((reservation, idx) => (
              <PickedSpot
                key={idx}
                parkingSpotId={reservation?.parkingSpot}
                startTime={reservation?.startTime}
                endTime={reservation.endTime}
                actions={[
                  {
                    action: () => handleDeleteReservation(reservation._id),
                    icon: <DeleteOutline />,
                  },
                ]}
              />
            ))
          ) : (
            <Spinner label="Fetching places..." />
          )}
        </SpotsWrapper>
        <Button label="Create new" primary onClick={() => navigate('/pick-spot')} />
      </ActiveReservationsWrapper>
    </PageWrapper>
  );
};

export default ReservationsOverview;
