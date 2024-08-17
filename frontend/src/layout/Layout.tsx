import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { UserType } from '../../../backend/src/shared/types';
import Toast from '../components/Toast';
import LoggedInPage from '../pages/LoggedInPage';
import LoggedOutPage from '../pages/LoggedOutPage';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedInUser } from '../network/api-client';

const Layout = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadLoggedInUser = async () => {
            try {
                const user = await fetchLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error('Failed to fetch logged-in user:', error);
                navigate('/login');
            }
        };

        loadLoggedInUser();
    }, [navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-ironGray">
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
