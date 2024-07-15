import { FC } from 'react';
import { DashboardWrapper } from './dashboard.styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../stories/components/button/Button.tsx';
import styles from './dashboard.module.scss';
import Overview from '../../components/overview/Overview.tsx';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const handleNavigatePickSpotView = (): void => {
    navigate('/pick-spot');
  };
  return (
    <DashboardWrapper>
      <Overview />
      <Button
        className={styles['reservation-button']}
        primary
        size="large"
        label="Create reservation"
        onClick={handleNavigatePickSpotView}
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
