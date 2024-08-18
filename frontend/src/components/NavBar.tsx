import { Link } from 'react-router-dom';
import { UserType } from '../../../backend/src/shared/types';
import * as apiClient from '../network/api-client';
import { useState } from 'react';
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-slate-700 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-slate-300 font-bold tracking-tight">
                    <Link to="/">Notes App</Link>
                </span>

                {/* Hamburger Icon for Smaller Screens */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Items for Larger Screens */}
                <div className="hidden md:flex space-x-2">
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
                </div>

                {/* Dropdown Menu for Smaller Screens */}
                {isMenuOpen && (
                    <div className="absolute top-16 right-0 w-full bg-slate-700 md:hidden">
                        <div className="flex flex-col space-y-2 p-4">
                            {loggedInUser ? (
                                <>
                                    <span className="text-white hover:text-slate-300">
                                        Logged in as: {loggedInUser.email}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="text-white hover:text-slate-300"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={onLoginClicked}
                                        className="text-white hover:text-slate-300"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={onSignupClicked}
                                        className="text-white hover:text-slate-300"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
