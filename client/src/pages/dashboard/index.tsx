import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../stories/components/button/Button.tsx';
import { ReservationDTO } from '../../model/ReservationModel.ts';
import { fetchOverviewData } from '../../api/reservationsApi.ts';
import { useUser } from '@clerk/clerk-react';
import { PageHeader } from '../../stories/components/page-header/PageHeader.tsx';
import { PageWrapper } from '../../stories/components/page-wrapper/PageWrapper.tsx';
import { Spinner } from '../../stories/components/loaders/Loaders.tsx';
import { PageContent } from '../../stories/components/page-content/PageContent.tsx';
import { OverviewWrapper } from './dashboard.styles.tsx';
import { ManageSearch } from '@mui/icons-material';
import CurrentReservation from '../../components/current-reservation/CurrentReservation.tsx';
import NearestReservations from '../../components/nearest-reservations/NearestReservations.tsx';
import { PageFooter } from '../../stories/components/page-footer/PageFooter.tsx';

export interface OverviewData {
  nearest: ReservationDTO[] | undefined;
  today: ReservationDTO | undefined;
}

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const handleNavigatePickSpotView = (): void => navigate('/pick-spot');
  const handleNavigateManageReservationsView = (): void => navigate('/manage-reservations');
  const [overviewData, setOverviewData] = useState<OverviewData | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchOverviewData(user.id).then((data) => {
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
    <PageWrapper>
      {overviewData && (
        <PageHeader
          title="Dashboard"
          actions={[
            {
              action: handleNavigateManageReservationsView,
              icon: <ManageSearch />,
              disabled: !overviewData?.nearest?.length && !overviewData.today,
              tooltipText: 'Reservations overview',
            },
          ]}
        />
      )}
      <PageContent>
        <OverviewWrapper>
          {!isLoading ? <CurrentReservation overviewData={overviewData?.today} isLoading={isLoading} /> : <Spinner />}
          {!isLoading && <NearestReservations nearestReservations={overviewData?.nearest} />}
        </OverviewWrapper>
      </PageContent>
      <PageFooter rightArea={<Button label="Create new" primary onClick={handleNavigatePickSpotView} />} />
    </PageWrapper>
  );
};

export default Dashboard;
