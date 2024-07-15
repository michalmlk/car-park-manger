import { FC } from 'react';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { NearestReservationsScrollContainer, NearestReservationsWrapper } from './NearestReservations.styles.tsx';
import PickedSpot from '../picked-spot/PickedSpot.tsx';

interface NearestReservationsProps {
  nearestReservations: ReservationDTO[] | undefined;
}

const NearestReservations: FC<NearestReservationsProps> = ({ nearestReservations }) => {
  return (
    <NearestReservationsWrapper>
      {nearestReservations?.length ? (
        <>
          <h3>Your nearest reservations</h3>
          <NearestReservationsScrollContainer>
            {nearestReservations!.map((r, idx) => (
              <PickedSpot key={idx} parkingSpotId={r.parkingSpot} startTime={r.startTime} endTime={r.endTime} />
            ))}
          </NearestReservationsScrollContainer>
        </>
      ) : (
        <></>
      )}
    </NearestReservationsWrapper>
  );
};

export default NearestReservations;
