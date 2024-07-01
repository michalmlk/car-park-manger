import { FC } from 'react';
import { Button } from '../../stories/components/button/Button.tsx';
import { useNavigate } from 'react-router-dom';

const ReservationsOverview: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button label="Create new" primary onClick={() => navigate('/pick-spot')} />
      <h1>Overview</h1>
    </>
  );
};

export default ReservationsOverview;
