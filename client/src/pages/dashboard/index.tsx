import { FC, useEffect, useState } from 'react';
import { DashboardWrapper } from './dashboard.styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../stories/components/button/Button.tsx';
import styles from './dashboard.module.scss';
import Overview from '../../components/current-reservation/CurrentReservation.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { fetchReservation } from '../../api/reservationsApi.ts';
import { useUser } from '@clerk/clerk-react';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const handleNavigatePickSpotView = (): void => navigate('/pick-spot');
  const handleNavigateManageReservationsView = (): void => navigate('/manage-reservations');

  const { user } = useUser();
  const [overviewData, setOverviewData] = useState<ReservationDTO | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      const today = new Date();
      fetchReservation(user.id, today).then((data) => {
        if (data) {
          setOverviewData(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    }
  }, [user]);

  return (
    <DashboardWrapper>
      <Overview overviewData={overviewData} isLoading={isLoading} />
      <Button
        className={styles['reservation-button']}
        primary
        size="large"
        label={overviewData ? 'Manage reservations' : 'Create reservation'}
        onClick={overviewData ? handleNavigateManageReservationsView : handleNavigatePickSpotView}
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
