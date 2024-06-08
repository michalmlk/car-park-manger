import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './index.css';
import './styles/fonts.scss';

// Import the layouts
import RootLayout from './layouts/root-layout';
import DashboardLayout from './layouts/dashboard-layout';

// Import the components
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import DashboardPage from './routes/dashboard/dashboard.tsx';
import CreateReservationPage from './routes/create-reservation/create-reservation.tsx';

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboard" /> },
            { path: '/sign-in/*', element: <SignInPage /> },
            { path: '/sign-up/*', element: <SignUpPage /> },
            {
                element: <DashboardLayout />,
                path: 'dashboard',
                children: [
                    {
                        path: '/dashboard',
                        element: <DashboardPage />,
                    },
                    {
                        path: '/dashboard/create',
                        element: <CreateReservationPage />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
