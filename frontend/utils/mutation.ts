import RequestError from './RequestError';
import {Fetcher} from '../hooks/useMutation';
import { sendRequest, User} from './index';
import {ElectricityPurchase} from '../hooks/useElectricityBills';
import type { CableTvPurchase } from '../hooks/useCableTvBills';
import { AirtimePurchase } from '../hooks/useAirtimePurchases';
import { DataPurchase } from '../hooks/useDataPurchases';
export interface AuthResponse {
    jwt: string;
    user: User
}

export interface PaymentData {
    id: string;
    amount: number;
    reference: string;
    prevBal: number;
    currentBal: number;
    method: string;
    createdAt: string;
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

export const handlePayment: Fetcher<PaymentData> = async (values, token) => {
    const data = await sendRequest<PaymentData>('/payments/verify', {
        body: values
    }, token);
    return data;
}

export const handleElectricityPayment: Fetcher<ElectricityPurchase> = async (values, token, id: string) => {
    const data = await sendRequest<ElectricityPurchase>(`/discos/${id}/payment`, {
        body: values
    }, token);

    return data;
}

export const handleCableTvPayment: Fetcher<CableTvPurchase> = async (values, token) => {
    const data = await sendRequest<CableTvPurchase>('/cabletv-plans/purchase', {
        body: values
    }, token);

    return data;
}

export const handleAirtimePayment: Fetcher<AirtimePurchase[]> = async (values, token) => {
    const data = await sendRequest<AirtimePurchase[]>('/airtime-purchases/purchase', {
        body: values
    }, token);
    return data;
}

export const handleDataPayment: Fetcher<DataPurchase[]> = async (values, token, planId: string) => {
    const data = await sendRequest<DataPurchase[]>(`/plans/${planId}/purchase`, {
        body: values
    }, token);

    return data;
}
