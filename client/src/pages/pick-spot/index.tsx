import { FC, useEffect, useState } from 'react';
import SpotItem from '../../components/spot-item/SpotItem.tsx';
import { PageWrapper } from '../../stories/components/page-wrapper/PageWrapper.tsx';
import { SpotsWrapper } from './pick-spot.styles.tsx';
import { PageFooter } from '../../stories/components/page-footer/PageFooter.tsx';
import { PageContent } from '../../stories/components/page-content/PageContent.tsx';
import { Button } from '../../stories/components/button/Button.tsx';
import { useUser } from '@clerk/clerk-react';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { collectFreeParkingSpotsByDate } from '../../api/parkingSpotsApi.ts';
import { handleReserveSpot } from '../../api/reservationsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { DateInputsArea, DateSelectorWrapper, StyledDatePicker } from './components/DateSelectorWrapper.styles.tsx';
import { PageHeader } from '../../stories/components/page-header/PageHeader.tsx';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/useSnackbar.tsx';

const PickSpotView: FC = () => {
  const [freeSpots, setFreeSpots] = useState<ParkingSpotDTO[]>([]);
  const [pickedSpot, pickSpot] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    collectFreeParkingSpotsByDate(startDate).then((data) => {
      if (data) {
        console.log(data);
        setFreeSpots(data);
      }
    });
  }, [startDate]);

  const handlePickSpot = (id: string) => {
    if (pickedSpot === id) {
      pickSpot(undefined);
    } else {
      pickSpot(id);
    }
  };

  const [isError, setIsError] = useState(false);

  const { handleSnackbarInvoke, renderSnackbar } = useSnackbar({
    successMessage: 'Reservation created successfully',
    errorMessage: 'Failed to create reservation',
    isError,
  });

  const handleCreateReservation = async (): Promise<void> => {
    if (pickedSpot && user && startDate) {
      try {
        await handleReserveSpot(pickedSpot, user.id, startDate.toDate());
        setFreeSpots((prev) => prev.filter((spot) => spot._id !== pickedSpot));
        pickSpot(undefined);
        handleSnackbarInvoke();
      } catch (e) {
        setIsError(true);
        handleSnackbarInvoke();
        console.log(e);
      }
    }
  };

  return (
    <PageWrapper>
      <PageHeader title="Select place" />
      <PageContent>
        {renderSnackbar}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateSelectorWrapper>
            <h2>Pick date</h2>
            <DateInputsArea>
              <StyledDatePicker
                label="Date"
                defaultValue={null}
                value={startDate}
                onChange={(newVal) => newVal && setStartDate(newVal)}
              />
            </DateInputsArea>
          </DateSelectorWrapper>
        </LocalizationProvider>
        <SpotsWrapper isVisible={!!startDate}>
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
      <PageFooter
        leftArea={<Button size="large" label="Back" onClick={() => navigate('/dashboard')} />}
        rightArea={
          <Button
            primary
            size="large"
            label="Create"
            onClick={handleCreateReservation}
            disabled={!pickedSpot || !startDate}
          />
        }
      />
    </PageWrapper>
  );
};

export default PickSpotView;
