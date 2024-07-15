import './index.css';

import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import { AppWrapper } from './App.styles.tsx';
import TopBar from './components/topbar/TopBar.tsx';

export default function App() {
  return (
    <>
      <SignedOut>
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
