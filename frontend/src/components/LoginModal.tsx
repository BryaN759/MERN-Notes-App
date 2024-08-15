import { Link } from 'react-router-dom';
import { UserType } from '../../../backend/src/shared/types';
import * as apiClient from '../network/api-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export type LoginFormData = {
    email: string;
    password: string;
};

interface LoginModalProps {
    onDismiss: () => void;
    onLoginSuccessful: (user: UserType) => void;
}
const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const user = await apiClient.login(data);
            onLoginSuccessful(user);
            onDismiss();
            toast.success(`Successfully Logged in!`);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unknown error occurred.');
            }
        }
    });
    return (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-slate-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="flex justify-end px-2 pt-2">
                        <button
                            onClick={onDismiss}
                            className="text-white bg-transparent hover:bg-gray-700 rounded-full p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="pt-0 pb-6 px-6 space-y-4 md:space-y-6 sm:px-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={onSubmit}
                        >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    {...register('email', {
                                        required: 'Please add your email here!'
                                    })}
                                />
                                {errors.email && (
                                    <span className="text-red-400">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('password', {
                                        required: 'Please enter your password!'
                                    })}
                                />
                                {errors.password && (
                                    <span className="text-red-400">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            {/* <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="text-gray-500 dark:text-gray-300">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}
                            <button
                                type="submit"
                                className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-400">
                                Don’t have an account yet?{' '}
                                <Link
                                    to="#"
                                    className="font-medium text-teal-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
