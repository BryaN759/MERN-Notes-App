import { Link } from 'react-router-dom';

interface NavBarProps {
    // loggedInUser: User | null;
    onSignupClicked: () => void;
    onLoginClicked: () => void;
    // onLogoutSuccessful: () => void;
}

const NavBar = ({ onLoginClicked, onSignupClicked }: NavBarProps) => {
    return (
        <div className="bg-teal-700 py-4">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-slate-300 font-bold tracking-tight">
                    <Link to="/">Notes App</Link>
                </span>
                <span className="flex space-x-2">
                    <button
                        onClick={onLoginClicked}
                        className="flex items-center text-white hover:text-slate-300"
                    >
                        Sign In
                    </button>
                    <span className="text-white relative top-1 text-xl">|</span>
                    <button
                        onClick={onSignupClicked}
                        className="flex items-center text-white hover:text-slate-300"
                    >
                        Sign Up
                    </button>
                </span>
            </div>
        </div>
    );
};

export default NavBar;
