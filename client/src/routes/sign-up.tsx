import { SignUp } from '@clerk/clerk-react';
import styles from './clerk.module.scss';

export default function SignUpPage() {
    return (
        <div className={styles['clerk-auth-wrapper']}>
            <SignUp path="/sign-in" fallbackRedirectUrl="/dashboard" />
        </div>
    );
}
