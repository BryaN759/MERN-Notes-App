import { UserType } from '../../../backend/src/shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface RegisterCredentials {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function register(
    credentials: RegisterCredentials
): Promise<UserType> {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error('Failed to Sign register user');
    }
    return response.json();
}
