import styles from './dashboard.module.scss';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../../stories/Button/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PageHeader } from '../../stories/PageHeader/PageHeader.tsx';
import ReservationItem from '../../components/ReservationItem/ReservationItem.tsx';
import type { Reservation } from '../../model.ts';
import { Infobox } from '../../stories/Infobox/Infobox.tsx';
import { AddOutlined } from '@mui/icons-material';

export default function DashboardPage() {
    const { user } = useUser();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/api/reservations/getAll/${user!.id}`).then(({ data }) => {
            setReservations(data);
        });
    }, [user]);

    return (
        <div className={styles['page-wrapper']}>
            <PageHeader
                title={`Welcome back${user ? `, ${user.firstName}` : ''} ⚡️`}
                customContent={
                    <Button size="medium" isLink icon={<AddOutlined />}>
                        <Link to="/dashboard/create">Create</Link>
                    </Button>
                }
            />
            {reservations.length ? (
                <div className={styles['reservations-container']}>
                    <h2 className={styles['info-header']}>Your nearest reservations</h2>
                    <div className={styles['reservations-list']}>
                        {reservations.map((reservation) => (
                            <ReservationItem key={reservation._id} reservation={reservation} />
                        ))}
                    </div>
                </div>
            ) : (
                <Infobox
                    title="You do not have any reservations"
                    actionButtonLabel="Create new"
                    onAction={() => navigate('/dashboard/create')}
                ></Infobox>
            )}
        </div>
    );
}
