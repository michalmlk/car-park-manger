import './index.css';

import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import { AppWrapper } from './App.styles.tsx';
import TopBar from './components/topbar/TopBar.tsx';
import { DirectionsCar } from '@mui/icons-material';
import { LoginPageHeader } from './components/ui/LoginPageHeader.styles.tsx';

export default function App() {
  return (
    <>
      <SignedOut>
        <LoginPageHeader>
          <h2>Car park manager</h2>
          <DirectionsCar fontSize="large" />
        </LoginPageHeader>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <AppWrapper>
          <TopBar />
          <Outlet />
        </AppWrapper>
      </SignedIn>
    </>
  );
}
