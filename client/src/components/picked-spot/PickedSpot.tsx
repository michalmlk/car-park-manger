import { FC, useEffect, useState } from 'react';
import { Card } from '../../stories/components/card/Card.tsx';
import { fetchParkingSpotById } from '../../api/parkingSpotsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';
import { ActionsWrapper, Details, DateWrapper, PlaceWrapper } from './PickedSpot.styles.tsx';
import { Action } from '../../model/ActionModel.ts';
import { IconButton } from '@mui/material';
import { format } from 'date-fns/format';

interface PickedSpotProps {
  parkingSpotId: string;
  startTime: Date;
  endTime: Date;
  actions?: Action[];
}

const PickedSpot: FC<PickedSpotProps> = ({ parkingSpotId, startTime, actions }) => {
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
          <DateWrapper>{format(new Date(startTime), 'dd MMM yyyy')} </DateWrapper>
          <PlaceWrapper>
            <span>{pickedSpotData.level}</span>
            &nbsp;/&nbsp;
            <span>{pickedSpotData.number}</span>
          </PlaceWrapper>
          {actions && (
            <ActionsWrapper>
              {actions.map(({ icon, action }, idx) => (
                <IconButton key={idx} onClick={action}>
                  {icon}
                </IconButton>
              ))}
            </ActionsWrapper>
          )}
        </Details>
      </Card>
    )
  );
};
export default PickedSpot;
