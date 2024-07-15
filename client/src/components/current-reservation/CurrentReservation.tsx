import { FC } from 'react';
import { CurrentReservationWrapper, TextWrapper } from './CurrentReservation.styles.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import PickedSpot from '../picked-spot/PickedSpot.tsx';

const CurrentReservation: FC<{ overviewData: ReservationDTO | undefined; isLoading: boolean }> = ({ overviewData }) => {
  return (
    <CurrentReservationWrapper>
      {overviewData && Object.keys(overviewData).length ? (
        <>
          <h3>Reserved for today</h3>
          <PickedSpot
            parkingSpotId={overviewData?.parkingSpot}
            startTime={overviewData?.startTime}
            endTime={overviewData?.endTime}
          />
        </>
      ) : (
        <TextWrapper>
          <h1>No reservation found today</h1>
          <p>Pick your first place</p>
        </TextWrapper>
      )}
    </CurrentReservationWrapper>
  );
};

export default CurrentReservation;
