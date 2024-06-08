import { createContext, FC, PropsWithChildren } from 'react';
import { useUser, UseUserReturn } from '@clerk/clerk-react';

export const UserContext = createContext<{ user: UseUserReturn }>({
    user: { isLoaded: false, isSignedIn: false, user: undefined },
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const user = useUser();

    if (!user) {
        throw new Error('Cannot get user from external provider');
    } else {
        return (
            <UserContext.Provider
                value={{
                    user,
                }}
            >
                {children}
            </UserContext.Provider>
        );
    }
};

export default UserContextProvider;
