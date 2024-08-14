import { useState } from 'react';
import NavBar from '../components/NavBar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { UserType } from '../../../backend/src/shared/types';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-slate-600">
            <NavBar
                loggedInUser={loggedInUser}
                onLoginClicked={() => setShowLoginModal(true)}
                onSignupClicked={() => setShowRegisterModal(true)}
            />
            <div className="container mx-auto py-10 flex-1">{children}</div>
            {showLoginModal && (
                <LoginModal onDismiss={() => setShowLoginModal(false)} />
            )}
            {showRegisterModal && (
                <RegisterModal
                    onDismiss={() => setShowRegisterModal(false)}
                    onRegisterSuccessful={(user) => setLoggedInUser(user)}
                />
            )}
        </div>
    );
};

export default Layout;
