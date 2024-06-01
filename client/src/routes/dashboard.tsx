import styles from './dashboard.module.scss';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../stories/Button/Button.tsx';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const { user } = useUser();
    return (
        <div className={styles['page-wrapper']}>
            <div className={styles['page-header']}>
                {user && <h1 className={styles['header']}>Welcome back, {user.firstName} ⚡️</h1>}
                <Button size="large">
                    <Link to="/dashboard/create">Create reservation</Link>
                </Button>
            </div>
            <div className={styles['reservation-container']}>
                <h2 className={styles['info-header']}>There is no reservations for you today</h2>
            </div>
            <div className={styles['reservation-list']}>
                <h2 className={styles['info-header']}>Your nearest reservations</h2>
            </div>
        </div>
    );
}
