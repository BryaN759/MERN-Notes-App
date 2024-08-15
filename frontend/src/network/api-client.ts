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
        const errorRes = await response.json();
        console.error(
            `Failed to register user: ${response.status} - ${response.statusText}`
        );
        throw new Error(errorRes.message);
    }
    return response.json();
}
export interface LoginCredentials {
    email: string;
    password: string;
}

export async function login(credentials: LoginCredentials): Promise<UserType> {
    const response = await fetch(`${API_BASE_URL}/api/user/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        const errorRes = await response.json();
        console.error(
            `Failed to login user: ${response.status} - ${response.statusText}`
        );
        throw new Error(errorRes.message);
    }
    return response.json();
}

export async function logout() {
    await fetch(`${API_BASE_URL}/api/user/log-out`, {
        method: 'POST'
    });
}
