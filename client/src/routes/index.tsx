import { Link } from 'react-router-dom';
import { Button } from '../stories/Button/Button.tsx';

export default function IndexPage() {
    return (
        <div>
            <h1>This is the index page</h1>
            <div>
                <ul>
                    <li>
                        <Button primary>
                            <Link to="/sign-up">Sign Up</Link>
                        </Button>
                    </li>
                    <li>
                        <Link to="/sign-in">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
