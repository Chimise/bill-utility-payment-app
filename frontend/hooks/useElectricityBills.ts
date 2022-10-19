import useSWR from "swr";
import useAuth from "./useAuth";
import RequestError from "../utils/RequestError";
import type { Db } from "../utils";

export interface Disco extends Db {
    name: string;
    initial: string;
}

export interface ElectricityPurchase extends Db {
    accountNumber: string;
    amount: number;
    status: string;
    type: string;
    token: string;
    disco: Disco;
    trans_id: string;
}

const useElectricityBills = () => {
    const {token} = useAuth();
    const {data, error, mutate} = useSWR<ElectricityPurchase[], RequestError>(token && ['/electricity-payments?_sort=createdAt:DESC', token]);

    return {
        data,
        error,
        mutate,
        isLoading: !data && !error
    }
};

export default useElectricityBills;