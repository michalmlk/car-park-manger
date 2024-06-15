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
import { AddOutlined, EditOutlined } from '@mui/icons-material';
import carImage from '../../../assets/car-photo.png';

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
            <PageHeader title={`Welcome back${user ? `, ${user.firstName}` : ''} ⚡️`} />
            {reservations.length ? (
                <div className={styles['reservations-container']}>
                    <div className={styles['reservations-container__header']}>
                        <h2 className={styles['info-header']}>Your nearest reservations</h2>
                        <Button size="medium" icon={<EditOutlined />} label="Manage" />
                    </div>
                    <div className={styles['reservations-list']}>
                        {reservations.map((reservation) => (
                            <ReservationItem key={reservation._id} reservation={reservation} />
                        ))}
                    </div>
                </div>
            ) : (
                <Infobox title="You do not have any reservations"></Infobox>
            )}
            <div className={styles['dashboard-footer']}>
                <Button
                    size="large"
                    isLink
                    icon={<AddOutlined />}
                    primary
                    className={styles['root-footer-btn']}
                >
                    <Link to="/dashboard/create">Create reservation</Link>
                </Button>
            </div>
            <div className={styles['background-image']}>
                <img alt="car" src={carImage} />
            </div>
        </div>
    );
}
