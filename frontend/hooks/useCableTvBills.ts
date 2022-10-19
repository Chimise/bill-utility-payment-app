import useSWR from "swr";
import useAuth from "./useAuth";
import RequestError from "../utils/RequestError";
import type { Db } from "../utils";

export interface CableTv {
    id: string;
    name: string;
}

export interface CableTvPlan {
    id: string;
    name: string;
    selling_price: number;
    cabletv: CableTv
}

export interface CableTvPurchase extends Db {
    cardNo: string;
    status: string;
    trans_id: number;
    plan: CableTvPlan,
}

const useCableTvBills = () => {
    const {token} = useAuth()
    const {data, error, mutate} = useSWR<CableTvPurchase[], RequestError>(token && ['/cabletv-payments?_sort=createdAt:DESC', token]);

    return {
        data,
        error,
        mutate,
        isLoading: !data && !error
    }

}

export default useCableTvBills;