import { FC, useEffect, useState } from 'react';
import { Card } from '../../stories/components/card/Card.tsx';
import { fetchParkingSpotById } from '../../api/parkingSpotsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';
import { Details } from './PickedSpot.styles.tsx';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { DetailsRow } from '../details/DetailsRow.tsx';

interface PickedSpotProps {
  parkingSpotId: string;
  startTime: Date;
  endTime: Date;
}

const PickedSpot: FC<PickedSpotProps> = ({ parkingSpotId, startTime, endTime }) => {
  const [pickedSpotData, setPickedSpotData] = useState<ParkingSpotDTO>();
  useEffect(() => {
    fetchParkingSpotById(parkingSpotId).then((data) => {
      if (data) {
        setPickedSpotData(data);
      }
    });
  }, []);

  return (
    <Card>
      {pickedSpotData ? (
        <Details>
          <DetailsRow label="From: " value={startTime.toString()} isDate />
          <DetailsRow label="To: " value={endTime.toString()} isDate />
          <DetailsRow label="Level: " value={pickedSpotData.level} />
          <DetailsRow label="Spot: " value={pickedSpotData.number} />
        </Details>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
export default PickedSpot;
