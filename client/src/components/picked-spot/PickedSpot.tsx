import { FC, useEffect, useState } from 'react';
import { Card } from '../../stories/components/card/Card.tsx';
import { fetchParkingSpotById } from '../../api/parkingSpotsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';
import { ActionsWrapper, Details } from './PickedSpot.styles.tsx';
import { DetailsRow } from '../details/DetailsRow.tsx';
import { Action } from '../../model/ActionModel.ts';
import { IconButton } from '@mui/material';

interface PickedSpotProps {
  parkingSpotId: string;
  startTime: Date;
  endTime: Date;
  actions?: Action[];
}

const PickedSpot: FC<PickedSpotProps> = ({ parkingSpotId, startTime, endTime, actions }) => {
  const [pickedSpotData, setPickedSpotData] = useState<ParkingSpotDTO>();
  useEffect(() => {
    fetchParkingSpotById(parkingSpotId).then((data) => {
      if (data) {
        setPickedSpotData(data);
      }
    });
  }, [parkingSpotId]);

  return (
    pickedSpotData && (
      <Card>
        <Details>
          <DetailsRow label="From: " value={startTime.toString()} isDate />
          <DetailsRow label="To: " value={endTime.toString()} isDate />
          <DetailsRow label="Level: " value={pickedSpotData.level} />
          <DetailsRow label="Spot: " value={pickedSpotData.number} />
        </Details>
        {actions && (
          <ActionsWrapper>
            {actions.map(({ icon, action }, idx) => (
              <IconButton key={idx} onClick={action}>
                {icon}
              </IconButton>
            ))}
          </ActionsWrapper>
        )}
      </Card>
    )
  );
};
export default PickedSpot;
