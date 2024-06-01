import React from 'react';
import { Box } from '../../stories/Box/Box.tsx';

interface ReservationItemProps {
    place: number;
    floor: number;
    date: Date;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ place, floor, date }) => {
    return (
        <Box>
            {place} {floor} {date.toDateString()}
        </Box>
    );
};

export default ReservationItem;
