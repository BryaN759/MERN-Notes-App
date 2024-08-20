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
import LoadingScreen from '../components/LoadingScreen';
import ProfileDashboardModal from '../components/ProfileDashboardModal';

const Layout = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadLoggedInUser = async () => {
            try {
                // await new Promise((resolve) => setTimeout(resolve, 3000));
                const user = await fetchLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error('Failed to fetch logged-in user:', error);
                navigate('/');
            } finally {
                setIsLoading(false);
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
                onProfileClicked={() => setShowProfileModal(true)}
            />
            <div className="container mx-auto py-10 flex-1">
                {isLoading ? (
                    <LoadingScreen />
                ) : loggedInUser ? (
                    <LoggedInPage />
                ) : (
                    <LoggedOutPage />
                )}
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
            {loggedInUser && showProfileModal && (
                <ProfileDashboardModal
                    email={loggedInUser.email}
                    onDismiss={() => setShowProfileModal(false)}
                    onPasswordChangeSuccessful={() => {}}
                />
            )}

            <Toast />
        </div>
    );
};

export default Layout;
