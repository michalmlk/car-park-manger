import { FC } from 'react';
import { CurrentReservationWrapper } from './CurrentReservation.styles.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import PickedSpot from '../picked-spot/PickedSpot.tsx';

const CurrentReservation: FC<{ overviewData: ReservationDTO | undefined; isLoading: boolean }> = ({ overviewData }) => {
  return (
    <CurrentReservationWrapper>
      {overviewData && Object.keys(overviewData).length ? (
        <PickedSpot
          parkingSpotId={overviewData?.parkingSpot}
          startTime={overviewData?.startTime}
          endTime={overviewData?.endTime}
        />
      ) : (
        <h1>No reservation found</h1>
      )}
    </CurrentReservationWrapper>
  );
};

export default CurrentReservation;
