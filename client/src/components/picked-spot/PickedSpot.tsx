import { FC, useEffect, useState } from 'react';
import { Card } from '../../stories/components/card/Card.tsx';
import { fetchParkingSpotById } from '../../api/parkingSpotsApi.ts';
import { ParkingSpotDTO } from '../../model/ParkingSpotModel.ts';
import { ActionsWrapper, Details, DateWrapper, PlaceWrapper } from './PickedSpot.styles.tsx';
import { Action } from '../../model/ActionModel.ts';
import { IconButton, Tooltip } from '@mui/material';
import { format } from 'date-fns';

interface PickedSpotProps {
  parkingSpotId: string;
  startTime: string;
  endTime: string;
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
          <DateWrapper>{format(new Date(startTime), 'dd MMM yyyy')}</DateWrapper>
          <PlaceWrapper>
            <span>{pickedSpotData.level}</span>
            &nbsp;/&nbsp;
            <span>{pickedSpotData.number}</span>
          </PlaceWrapper>
          {actions && (
            <ActionsWrapper>
              {actions.map(({ icon, action, tooltipText }, idx) => (
                <Tooltip key={idx} title={tooltipText}>
                  <IconButton onClick={action}>{icon}</IconButton>
                </Tooltip>
              ))}
            </ActionsWrapper>
          )}
        </Details>
      </Card>
    )
  );
};
export default PickedSpot;
