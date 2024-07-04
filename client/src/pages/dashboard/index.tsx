import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../stories/components/button/Button.tsx';
import styles from './dashboard.module.scss';
import Overview from '../../components/current-reservation/CurrentReservation.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { fetchReservation } from '../../api/reservationsApi.ts';
import { useUser } from '@clerk/clerk-react';
import { PageHeader } from '../../stories/components/page-header/PageHeader.tsx';
import { PageWrapper } from '../../stories/components/page-wrapper/PageWrapper.tsx';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const handleNavigatePickSpotView = (): void => navigate('/pick-spot');
  const handleNavigateManageReservationsView = (): void => navigate('/manage-reservations');

  const { user } = useUser();
  const [overviewData, setOverviewData] = useState<ReservationDTO | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [user, overviewData?.status]);

  return (
    <PageWrapper>
      <PageHeader title={`Welcome back ${user?.fullName} ⚡`} />
      {!isLoading ? <Overview overviewData={overviewData} isLoading={isLoading} /> : <Spinner />}
      <Button
        className={styles['reservation-button']}
        primary
        size="large"
        label={overviewData ? 'Manage reservations' : 'Create reservation'}
        onClick={overviewData ? handleNavigateManageReservationsView : handleNavigatePickSpotView}
      />
    </PageWrapper>
  );
};

export default Dashboard;
