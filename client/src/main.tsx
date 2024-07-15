import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import PickSpotView from './pages/pick-spot';
import ReservationsOverview from './pages/reservations-overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/pick-spot',
        element: <PickSpotView />,
      },
      {
        path: '/manage-reservations',
        element: <ReservationsOverview />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('PUBLISHABLE_KEY is missing');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInForceRedirectUrl="/dashboard">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
