import { FC } from 'react';
import { Card } from '../../stories/components/card/Card.tsx';
import { SpotItemContent } from './SpotItem.styles.tsx';

export interface ParkingSpotDTO {
  _id: string;
  number: number;
  level: number;
  status: 'free' | 'reserved';
  lastReservation: string | undefined;
}

interface SpotItemProps {
  spot: ParkingSpotDTO;
  onClick: () => void;
  selected?: boolean;
}

const SpotItem: FC<SpotItemProps> = ({ spot, onClick, selected = false }) => {
  return (
    <Card width={600} onClick={onClick} selected={selected} canBeSelected>
      <SpotItemContent>
        <h2>Level {spot.level}</h2>
        <p>Place: {spot.number}</p>
      </SpotItemContent>
    </Card>
  );
};

export default SpotItem;
