import { useForm } from 'react-hook-form';
import * as apiClient from '../network/api-client';
import { toast } from 'react-toastify';

export type ProfileDashboardData = {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

interface ProfileModalProps {
    email: string;
    onDismiss: () => void;
    onPasswordChangeSuccessful: () => void;
}
const ProfileDashboardModal = ({ email, onDismiss }: ProfileModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProfileDashboardData>({
        defaultValues: {
            email
        }
    });

    const onSubmit = async (data: ProfileDashboardData) => {
        try {
            await apiClient.myProfile(data);
            onDismiss();
            toast.success('Password successfully changed!');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unknown error occurred.');
            }
        }
    };
    return (
        <div className="fixed inset-0 bg-slate-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-[300px] bg-ironGray rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
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
                            Dashboard
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="bg-gray-300 border text-slate-900 rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5"
                                    readOnly // Make the email field read-only
                                    {...register('email')}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-gray-200 border text-slate-900 rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5"
                                    {...register('currentPassword', {
                                        required:
                                            'Please enter your current password!'
                                    })}
                                />
                                {errors.currentPassword && (
                                    <span className="text-red-400">
                                        {errors.currentPassword.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-gray-200 border text-slate-900 rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5"
                                    {...register('newPassword', {
                                        required:
                                            'Please enter your new password!'
                                    })}
                                />
                                {errors.newPassword && (
                                    <span className="text-red-400">
                                        {errors.newPassword.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">
                                    Repeat New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-gray-200 border text-slate-900 rounded-lg focus:ring-gray-600 focus:border-primary-600 block w-full p-2.5"
                                    {...register('confirmNewPassword', {
                                        required:
                                            'Please confirm your new password!'
                                    })}
                                />
                                {errors.confirmNewPassword && (
                                    <span className="text-red-400">
                                        {errors.confirmNewPassword.message}
                                    </span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboardModal;
