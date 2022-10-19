import useSWR from 'swr';
import useAuth from './useAuth';
import {User, Plan, Db, Operator} from '../utils';
import RequestError from '../utils/RequestError';

export interface DataPurchase extends Db {
    trans_id: number;
    buyer: User;
    plan: Plan;
    provider: Operator;
    status: string;
    recipient: string;
}

const useDataPurchases = () => {
    const {token} = useAuth();
    const {data, error, mutate} = useSWR<Array<DataPurchase>, RequestError>(token && ['/data-purchases?_sort=createdAt:DESC', token]);
    return {
        isLoading: !data && !error,
        data,
        error: data && error ? undefined : error,
        mutate
    }
}

export default useDataPurchases;