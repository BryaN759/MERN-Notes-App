import { useState } from 'react';
import NavBar from '../components/NavBar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { UserType } from '../../../backend/src/shared/types';
import Toast from '../components/Toast';
import LoggedInPage from '../pages/LoggedInPage';
import LoggedOutPage from '../pages/LoggedOutPage';

// interface Props {
//     children: React.ReactNode;
// }

const Layout = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-slate-600">
            <NavBar
                loggedInUser={loggedInUser}
                onLoginClicked={() => setShowLoginModal(true)}
                onSignupClicked={() => setShowRegisterModal(true)}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <div className="container mx-auto py-10 flex-1">
                {loggedInUser ? <LoggedInPage /> : <LoggedOutPage />}
            </div>

            {showLoginModal && (
                <LoginModal
                    onDismiss={() => setShowLoginModal(false)}
                    onLoginSuccessful={(user) => setLoggedInUser(user)}
                />
            )}
            {showRegisterModal && (
                <RegisterModal
                    onDismiss={() => setShowRegisterModal(false)}
                    onRegisterSuccessful={(user) => setLoggedInUser(user)}
                />
            )}
            <Toast />
        </div>
    );
};

export default Layout;
