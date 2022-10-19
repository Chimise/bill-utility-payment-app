import useSWR from "swr";
import useAuth from "./useAuth";
import {Operator, Db} from '../utils'
import RequestError from "../utils/RequestError";

export interface AirtimePurchase extends Db {
    provider: Operator;
    trans_id: number;
    amount: number;
    recipient: string;
    status: string;
}

const useAirtimePurchases = () => {
    const {token} = useAuth();
    const {data, error, mutate} = useSWR<Array<AirtimePurchase>, RequestError>(token && ['/airtime-purchases?_sort=createdAt:DESC', token]);

    return {
        data,
        error: data && error ? undefined : error,
        mutate,
        isLoading: !data && !error
    }
}

export default useAirtimePurchases;
