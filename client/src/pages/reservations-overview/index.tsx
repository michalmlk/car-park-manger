import { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useModal } from '../../hooks/useModal.tsx';
import { Modal } from '../../stories/components/modal/Modal.tsx';

const ReservationsOverview: FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationDTO[]>([]);
  const { user } = useUser();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState<string>('');

  const { handleSnackbarInvoke, renderSnackbar } = useSnackbar({
    successMessage: 'Reservation deleted successfully',
    errorMessage: 'Failed to delete reservation',
    isError,
  });

  const { isOpen: isDeleteModalOpen, toggleModal: toggleDeleteModal } = useModal();
  const { isOpen: isEditModalOpen, toggleModal: toggleEditModal } = useModal();

  const handleDeleteReservation = useCallback(
    async (id: string): Promise<void> => {
      setIsLoading(true);
      try {
        await deleteReservation(id);
        setReservations((prev) => prev.filter((reservation) => reservation._id !== id));
      } catch (e) {
        console.log(e);
        setIsError(true);
      } finally {
        handleSnackbarInvoke();
        setIsLoading(false);
        toggleDeleteModal();
      }
    },
    [handleSnackbarInvoke, toggleDeleteModal],
  );

  const handleEditReservation = useCallback((id: string): void => {
    console.log(`TODO ${id}`);
  }, []);

  const DeleteConfirmationModal = useMemo(
    () => (
      <Modal
        onClose={toggleDeleteModal}
        onConfirm={() => handleDeleteReservation(reservation)}
        onConfirmLabel="Delete"
        onCancelLabel="Cancel"
        title="Are you sure you want to delete reservation?"
      />
    ),
    [handleDeleteReservation, reservation, toggleDeleteModal],
  );

  const EditModal = useMemo(
    () => (
      <Modal
        onClose={toggleEditModal}
        onConfirm={() => handleEditReservation(reservation)}
        onConfirmLabel="Confirm"
        onCancelLabel="Cancel"
        title="Edit reservation"
      ></Modal>
    ),
    [handleEditReservation, reservation, toggleEditModal],
  );

  useEffect(() => {
    fetchUserReservations(user!.id).then((data) => data && setReservations(data));
  }, [navigate, reservations.length, user]);

  return (
    <PageWrapper>
      <PageHeader title="Active reservations" />
      {isDeleteModalOpen && DeleteConfirmationModal}
      {isEditModalOpen && EditModal}
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
                    action: () => {
                      setReservation(reservation._id);
                      toggleDeleteModal();
                    },
                    icon: <DeleteOutline />,
                    tooltipText: 'Delete reservation',
                  },
                  //TODO make reservation editable
                  // {
                  //   action: () => {
                  //     setReservation(reservation._id);
                  //     toggleEditModal();
                  //   },
                  //   icon: <EditOutlined />,
                  // },
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
