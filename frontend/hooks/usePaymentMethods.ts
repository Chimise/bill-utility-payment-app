import useSWR from 'swr';
import RequestError from '../utils/RequestError';
import useAuth from './useAuth';

export interface PaymentMethods {
    name: string;
    description: string;
    duration: string;
    availability: string;
    badgeText?: string;
    badgeColor?: string,
    identifier: string;
    id: string;

}

const usePaymentMethods = (initialState: PaymentMethods[]) => {
    const {token} = useAuth();
    const {data: payMethods, error, mutate} = useSWR<PaymentMethods[], RequestError>(['/paymentmethods', token],null, {fallbackData: initialState});
    const isLoading = !payMethods && !error
    return {
        isLoading,
        payMethods,
        error,
        mutate
    };
}

export default usePaymentMethods;