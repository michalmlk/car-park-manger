import styles from './dashboard.module.scss';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../../stories/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PageHeader } from '../../stories/PageHeader/PageHeader.tsx';

interface Reservation {
    _id: string;
    username: string;
    userId: string;
    place: number;
    floor: number;
    date: Date;
}

export default function DashboardPage() {
    const { user } = useUser();
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/reservations/getAll').then(({ data }) => {
            const useReservations = data.filter(
                (reservation: Reservation) => user!.id === reservation.userId
            );
            setReservations(useReservations);
        });
    }, [user]);

    return (
        <div className={styles['page-wrapper']}>
            <PageHeader
                title={`Welcome back${user ? `, ${user.firstName}` : ''} ⚡️`}
                customContent={
                    <Button size="medium">
                        <Link to="/dashboard/create">Create reservation</Link>
                    </Button>
                }
            />
            <div className={styles['reservation-container']}>
                {reservations.length ? (
                    reservations.map((reservation) => (
                        <div key={reservation._id}>
                            {reservation.place}: {user!.fullName}
                        </div>
                    ))
                ) : (
                    <h2 className={styles['info-header']}>
                        There is no reservations for you today
                    </h2>
                )}
            </div>
            <div className={styles['reservation-list']}>
                <h2 className={styles['info-header']}>Your nearest reservations</h2>
            </div>
        </div>
    );
}
