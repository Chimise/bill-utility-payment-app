import useSWR from "swr";
import useAuth from "./useAuth";
import { PaymentData } from "../utils/mutation";
import RequestError from "../utils/RequestError";

const usePayments = () => {
    const {token} = useAuth();
    const {data: payments, error, mutate} = useSWR<Array<PaymentData>, RequestError>(token && ['/payments?_sort=createdBy:DESC', token]);
    
    return {
        isLoading: !payments && !error, 
        error: payments && error ? undefined : error,
        payments,
        mutate
    }
}

export default usePayments;