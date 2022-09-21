import RequestError from './RequestError';
import {Fetcher} from '../hooks/useMutation';
import { sendRequest } from './index';

interface User {
    id: string,
    email: string
}

interface AuthResponse {
    jwt: string,
    user: User
}

export const registerUser: Fetcher<AuthResponse> = async (values) => {
    const authData = await sendRequest<AuthResponse>('/auth/local/register', {body: values});
    return authData;

}

export const loginUser: Fetcher<AuthResponse> = async (values) => {
    const authData = await sendRequest<AuthResponse>('/auth/local', {body: values});
    return authData;
}
