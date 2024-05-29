import {Outlet, useNavigate} from 'react-router-dom'
import {ClerkProvider, SignedIn, SignedOut, UserButton} from '@clerk/clerk-react'
import styles from './root-layout.module.scss';
import {Button} from "../stories/Button.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, {replace: true})}
            publishableKey={PUBLISHABLE_KEY}
        >
            <header className={styles.header}>
                <div>
                    <p>Clerk + React + React Router App</p>
                </div>
                <div>
                    <SignedIn>
                        <UserButton afterSignOutUrl='/sign-in'/>
                    </SignedIn>
                    <SignedOut>
                        <Button label="Sign in"/>
                    </SignedOut>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </ClerkProvider>
    )
}