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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DateInputsArea, DateSelectorWrapper, StyledDatePicker } from './components/DateSelectorWrapper.styles.tsx';

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
    if (pickedSpot && user && startDate) {
      await handleReserveSpot(pickedSpot, user.id, startDate);
    }
  };

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());

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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateSelectorWrapper isVisible={!!pickedSpot}>
            <h2>Pick date</h2>
            <DateInputsArea>
              {/*<StyledDateTimePicker*/}
              {/*  label="From"*/}
              {/*  defaultValue={dayjs(new Date())}*/}
              {/*  value={startDate}*/}
              {/*  onChange={(newVal) => setStartDate(newVal)}*/}
              {/*/>*/}
              <StyledDatePicker
                label="Date"
                defaultValue={dayjs(new Date())}
                value={startDate}
                onChange={(newVal) => newVal && setStartDate(newVal)}
              />
              {/*will be implemented in next iteration*/}
              {/*<StyledDateTimePicker*/}
              {/*  label="To"*/}
              {/*  defaultValue={dayjs(new Date())}*/}
              {/*  value={endDate}*/}
              {/*  onChange={(newVal) => setEndDate(newVal)}*/}
              {/*/>*/}
            </DateInputsArea>
          </DateSelectorWrapper>
        </LocalizationProvider>
      </PageContent>
      <PageFooter>
        <Button
          className={styles['create-reservation']}
          primary
          size="large"
          label="Create"
          onClick={handleCreateReservation}
          disabled={!pickedSpot || !startDate}
        />
      </PageFooter>
    </PageWrapper>
  );
};

export default PickSpotView;
