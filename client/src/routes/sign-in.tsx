import { SignIn } from '@clerk/clerk-react';
import styles from './clerk.module.scss';

export default function SignInPage() {
    return (
        <div className={styles['clerk-auth-wrapper']}>
            <SignIn path="/sign-in" fallbackRedirectUrl="/dashboard" />
        </div>
    );
}
