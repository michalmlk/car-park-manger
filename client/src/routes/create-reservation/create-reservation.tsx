import { PageHeader } from '../../stories/PageHeader/PageHeader.tsx';

import { useNavigate } from 'react-router-dom';
import ReservationForm from '../../components/ReservationForm/ReservationForm.tsx';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.tsx';
import { PageContent } from '../../stories/PageContent/PageContent.tsx';

export default function CreateReservationPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <>
            <PageHeader title="Create reservation" onBack={() => navigate('/dashboard')} />
            <PageContent>
                <ReservationForm userId={user.user.id} />
            </PageContent>
        </>
    );
}
