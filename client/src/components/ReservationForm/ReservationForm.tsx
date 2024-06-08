import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import styles from './ReservationForm.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const FLOOR_OPTIONS = [
    {
        value: -1,
        label: '-1',
    },
    {
        value: -2,
        label: '-2',
    },
    {
        value: -3,
        label: '-3',
    },
];

const DAY_OPTIONS = [
    {
        value: 'MON',
        label: 'Monday',
    },
    {
        value: 'TUE',
        label: 'Tuesday',
    },
    {
        value: 'WED',
        label: 'Wednesday',
    },
    {
        value: 'THU',
        label: 'Thursday',
    },
    {
        value: 'FRI',
        label: 'Friday',
    },
];

interface ReservationFormProps {
    userId: string;
}

export default function ReservationForm({ userId }: ReservationFormProps) {
    const [floor, setFloor] = useState(undefined);
    const [place, setPlace] = useState(undefined);
    const [day, setDay] = useState('');
    const [isPlaceSelectionAvailable, setIsPlaceSelectionAvailable] = useState(false);

    useEffect(() => {
        setIsPlaceSelectionAvailable(!!day && floor !== undefined);
    }, [day, floor]);

    const handleCreateReservation = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get<PlaceDTO>(
                `http://localhost:3000/api/places/get/${place}`
            );
            console.log(data);
            if (data) {
                await axios.post(`http://localhost:3000/api/reservations/create`, {
                    floor,
                    day,
                    userId,
                    place: data._id,
                });

                if (!data.reservedOn.includes(day))
                    await axios.put(`http://localhost:3000/api/places/update`, {
                        reservedOn: [...data.reservedOn, day],
                    });
            }
        } catch (e) {
            console.log(`Error while creating reservation, ${e}`);
        }
    };

    interface PlaceDTO {
        _id: string;
        number: number;
        floor: number;
        reservedOn: string[];
    }

    const fetchPlaces = async (): Promise<{ label: string | number; value: number }[]> => {
        try {
            const { data } = await axios.get<PlaceDTO[]>(
                `http://localhost:3000/api/places/availablePlaces/${floor}`
            );
            return data.map((data) => ({
                label: data.number,
                value: data.number,
            }));
        } catch (e) {
            console.error(`Error while fetching places ${e}`);
            return [];
        }
    };

    const handleFloorChange = (e) => setFloor(e.value);
    const handleDayChange = (e) => setDay(e.value);
    const handlePlaceChange = (e) => setPlace(e.value);

    return (
        <form onSubmit={handleCreateReservation} className={styles['reservation-form']}>
            <Select placeholder="Select day" onChange={handleDayChange} options={DAY_OPTIONS} />
            <Select
                placeholder="Select floor"
                onChange={handleFloorChange}
                options={FLOOR_OPTIONS}
                isDisabled={!day}
            />
            <AsyncSelect
                placeholder="Select place"
                isDisabled={!isPlaceSelectionAvailable}
                defaultOptions
                loadOptions={fetchPlaces}
                onChange={handlePlaceChange}
            />
            <Button type="submit">Submit</Button>
        </form>
    );
}
