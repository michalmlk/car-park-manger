import React, { useEffect, useState } from 'react';
import styles from './ReservationItem.module.scss';
import { Reservation } from '../../routes/dashboard/dashboard.tsx';
import axios from 'axios';
import type { Day, PlaceDTO } from '../../model.ts';
import { IconButton } from '@mui/material';
import { Deblur, DeleteOutline, EditOutlined } from '@mui/icons-material';

interface ReservationItemProps {
    reservation: Reservation;
}

const ReservationItem: React.FC<ReservationItemProps> = ({ reservation }) => {
    const { place: placeId, day } = reservation;
    const [place, setPlace] = useState<PlaceDTO>();

    const getFullDay = (day: Day): string => {
        switch (day) {
            case 'MON':
                return 'Monday';
            case 'TUE':
                return 'Tuesday';
            case 'WED':
                return 'Wednesday';
            case 'THU':
                return 'Thursday';
            case 'FRI':
                return 'Friday';
        }
    };

    const getPlace = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/places/getById/${placeId}`);
            if (!data) {
                return;
            }
            return data;
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getPlace().then((data) => {
            setPlace(data);
        });
    }, []);

    return (
        <div className={styles['reservation-wrapper']}>
            <div className={styles['place-number']}>{place?.number}</div>
            <div className={styles['place-floor']}>
                Floor <span>{place?.floor}</span>
            </div>
            <div className={styles['reservation-actions']}>
                <div className={styles['reservation-day']}>{getFullDay(day)}</div>
                <div className={styles['reservation-buttons']}>
                    <IconButton>
                        <EditOutlined />
                    </IconButton>
                    <IconButton>
                        <DeleteOutline />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ReservationItem;
