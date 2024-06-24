import { FC, useEffect } from 'react';
import { StyledOverviewWrapper } from './Overview.styles.tsx';

const Overview: FC = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/parkingSpots/availableSpots')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <StyledOverviewWrapper>
      <h1>overview</h1>
    </StyledOverviewWrapper>
  );
};

export default Overview;
