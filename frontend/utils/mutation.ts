import RequestError from './RequestError';
import {Fetcher} from '../hooks/useMutation';
import { sendRequest, User} from './index';

export interface AuthResponse {
    jwt: string;
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

export const provider: Fetcher<User> = async (values, token) => {
    const userData = await sendRequest<User>('/provider/user', {body: values}, token);
    return userData;
}
