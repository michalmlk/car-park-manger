import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import styles from './root-layout.module.scss';
import { Button } from '../stories/Button/Button.tsx';
import UserContextProvider from '../context/userContext.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <UserContextProvider>
                <div className={styles['root-content']}>
                    <header className={styles['top-bar']}>
                        <p>Car park</p>
                        <div>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/sign-in" />
                            </SignedIn>
                            <SignedOut>
                                <Button primary>
                                    <Link to="/sign-up">Sign up</Link>
                                </Button>
                            </SignedOut>
                        </div>
                    </header>
                    <main className={styles['page-content']}>
                        <Outlet />
                    </main>
                </div>
            </UserContextProvider>
        </ClerkProvider>
    );
}
