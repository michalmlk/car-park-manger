import { FC } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { TopBarWrapper } from './TopBar.styles.tsx';

const TopBar: FC = () => {
  return (
    <TopBarWrapper>
      <h2>Car park</h2>
      <UserButton />
    </TopBarWrapper>
  );
};
export default TopBar;
