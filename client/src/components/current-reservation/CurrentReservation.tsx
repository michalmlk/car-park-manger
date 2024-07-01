import { FC } from 'react';
import { CurrentReservationWrapper } from './CurrentReservation.styles.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import PickedSpot from '../picked-spot/PickedSpot.tsx';

const CurrentReservation: FC<{ overviewData: ReservationDTO | undefined; isLoading: boolean }> = ({
  overviewData,
  isLoading,
}) => {
  return (
    <CurrentReservationWrapper>
      {overviewData && !isLoading && (
        <PickedSpot
          parkingSpotId={overviewData?.parkingSpot}
          startTime={overviewData?.startTime}
          endTime={overviewData?.endTime}
        />
      )}
      {isLoading && !overviewData && <Spinner />}
      {!Object.keys(!!overviewData) && <h1>No reservation found</h1>}
    </CurrentReservationWrapper>
  );
};

export default CurrentReservation;
