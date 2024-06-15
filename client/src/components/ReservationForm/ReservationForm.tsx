import AsyncSelect from 'react-select/async';
import Select, { ActionMeta, SingleValue } from 'react-select';
import styles from './ReservationForm.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../stories/Button/Button';
import { PlaceDTO } from '../../model.ts';
import { FLOOR_OPTIONS, DAY_OPTIONS } from '../../config.ts';
import { useNavigate } from 'react-router-dom';
import { AddOutlined } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface ReservationFormProps {
    userId: string;
}

interface ReservationFormState {
    floor: number | null;
    place: number | null;
    day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | null;
}

interface SelectOption {
    label: string;
    value: string | number | undefined;
}

const initialFormState = {
    floor: null,
    place: null,
    day: null,
};

export default function ReservationForm({ userId }: ReservationFormProps) {
    const [isPlaceSelectionAvailable, setIsPlaceSelectionAvailable] = useState(false);
    const [formData, setFormData] = useState<ReservationFormState>(initialFormState);
    const navigate = useNavigate();

    const handleChange = (
        option: SingleValue<SelectOption> | null,
        actionMeta: ActionMeta<SelectOption>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [`${actionMeta.name}`]: option?.value,
        }));
    };

    const { day, place, floor } = formData;

    useEffect(() => {
        setIsPlaceSelectionAvailable(!!day && !!floor);
    }, [day, floor]);

    const handleCreateReservation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.get<PlaceDTO>(
                `http://localhost:3000/api/places/get/${place}/${day}`
            );
            if (data) {
                await axios.post(`http://localhost:3000/api/reservations/create`, {
                    floor,
                    day,
                    userId,
                    place: data._id,
                });
                await axios.put(`http://localhost:3000/api/places/update/${data._id}`, {
                    reservedOn: [...data.reservedOn, day],
                });
            }
            navigate('/dashboard');
        } catch (e) {
            console.log(`Error while creating reservation, ${e}`);
        }
    };

    const mapTemplateResponseToSelectOptions = (response: PlaceDTO[]): SelectOption[] => {
        return response.map((r) => ({
            label: `${r.number}`,
            value: r.number,
        }));
    };

    const fetchPlaces = async (inputValue = ''): Promise<SelectOption[]> => {
        return axios
            .get<PlaceDTO[]>(`http://localhost:3000/api/places/availablePlaces/${floor}/${day}`)
            .then(({ data }) => [
                {
                    label: 'Please select place',
                    value: undefined,
                },
                ...mapTemplateResponseToSelectOptions(data),
            ])
            .then((data) =>
                data.filter((opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()))
            );
    };

    const [dateValue, setDateValue] = useState<Dayjs | null>();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleCreateReservation} className={styles['reservation-form']}>
                <Select
                    placeholder="Select day"
                    name="day"
                    onChange={handleChange}
                    options={DAY_OPTIONS}
                />
                <DatePicker
                    label="Select date"
                    value={dateValue}
                    onChange={(newVal) => setDateValue(newVal)}
                />
                <Select
                    placeholder="Select floor"
                    onChange={handleChange}
                    options={FLOOR_OPTIONS}
                    isDisabled={!day}
                    name="floor"
                />
                <AsyncSelect
                    placeholder="Select place"
                    isDisabled={!isPlaceSelectionAvailable}
                    defaultOptions
                    loadOptions={fetchPlaces}
                    onChange={handleChange}
                    name="place"
                />
                <Button
                    type="submit"
                    primary
                    className={styles['reservation-form-button']}
                    label="Create"
                    icon={<AddOutlined />}
                />
            </form>
        </LocalizationProvider>
    );
}
