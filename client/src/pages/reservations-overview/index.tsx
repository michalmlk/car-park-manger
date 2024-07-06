import { FC, useEffect, useState } from 'react';
import { Button } from '../../stories/components/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../stories/components/page-header/PageHeader.tsx';
import { DeleteOutline } from '@mui/icons-material';
import { PageWrapper } from '../../stories/components/page-wrapper/PageWrapper.tsx';
import { SpotsWrapper } from '../pick-spot/pick-spot.styles.tsx';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { deleteReservation, fetchUserReservations } from '../../api/reservationsApi.ts';
import { useUser } from '@clerk/clerk-react';
import PickedSpot from '../../components/picked-spot/PickedSpot.tsx';
import { PageContent } from '../../stories/components/page-content/PageContent.tsx';
import { PageFooter } from '../../stories/components/page-footer/PageFooter.tsx';
import { useSnackbar } from '../../hooks/useSnackbar.tsx';

const ReservationsOverview: FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  const { user } = useUser();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSnackbarInvoke, renderSnackbar } = useSnackbar({
    successMessage: 'Reservation deleted successfully',
    errorMessage: 'Failed to delete reservation',
    isError,
  });

  const handleDeleteReservation = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((reservation) => reservation._id !== id));
      handleSnackbarInvoke();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsError(true);
      handleSnackbarInvoke();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReservations(user!.id).then((data) => data && setReservations(data));
  }, [navigate, reservations.length, user]);

  return (
    <PageWrapper>
      <PageHeader title="Your current reservations" />
      <PageContent>
        {renderSnackbar}
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
            <></>
          )}
          {isLoading && <Spinner label="Fetching places..." />}
        </SpotsWrapper>
      </PageContent>
      <PageFooter leftArea={<Button label="Back" onClick={() => navigate('/dashboard')} />} />
    </PageWrapper>
  );
};

export default ReservationsOverview;
