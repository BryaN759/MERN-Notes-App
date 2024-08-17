import { Link } from 'react-router-dom';
import { UserType } from '../../../backend/src/shared/types';
import * as apiClient from '../network/api-client';
interface NavBarProps {
    loggedInUser: UserType | null;
    onSignupClicked: () => void;
    onLoginClicked: () => void;
    onLogoutSuccessful: () => void;
}

const NavBar = ({
    loggedInUser,
    onLoginClicked,
    onSignupClicked,
    onLogoutSuccessful
}: NavBarProps) => {
    async function logout() {
        try {
            await apiClient.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className="bg-slate-700 py-4">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-slate-300 font-bold tracking-tight">
                    <Link to="/">Notes App</Link>
                </span>
                <span className="flex space-x-2">
                    {loggedInUser ? (
                        <>
                            <span className="flex items-center text-white hover:text-slate-300">
                                Logged in as: {loggedInUser.email}
                            </span>
                            <span className="text-white relative top-1 text-xl">
                                |
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center text-white hover:text-slate-300"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onLoginClicked}
                                className="flex items-center text-white hover:text-slate-300"
                            >
                                Sign In
                            </button>
                            <span className="text-white relative top-1 text-xl">
                                |
                            </span>
                            <button
                                onClick={onSignupClicked}
                                className="flex items-center text-white hover:text-slate-300"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default NavBar;
