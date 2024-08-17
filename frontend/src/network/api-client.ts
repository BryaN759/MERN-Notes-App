import { NotesType, UserType } from '../../../backend/src/shared/types';
import { NoteInput } from '../components/AddEditNoteModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchLoggedInUser() {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorRes = await response.json();
        console.error(
            `Failed to fetch user: ${response.status} - ${response.statusText}`
        );
        throw new Error(errorRes.message);
    }
    return response.json();
}
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
        credentials: 'include',
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
        credentials: 'include',
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
        method: 'POST',
        credentials: 'include'
    });
}

export async function fetchNotes(): Promise<NotesType[]> {
    const response = await fetch(`${API_BASE_URL}/api/notes/`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
}

export async function createNote(note: NoteInput): Promise<NotesType> {
    const response = await fetch(`${API_BASE_URL}/api/notes/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

export async function updateNote(
    noteId: string,
    note: NoteInput
): Promise<NotesType> {
    const response = await fetch(`${API_BASE_URL}/api/notes/` + noteId, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetch(`${API_BASE_URL}/api/notes/` + noteId, {
        method: 'DELETE',
        credentials: 'include'
    });
}
