import useSWR from "swr";
import useAuth from './useAuth';
import { fetcher } from "../utils";
import { CableTvPlan } from "./useCableTvBills";
import RequestError from "../utils/RequestError";

const useCableTvPlans = (id: string) => {
    const {token} = useAuth();
    const {data: plans, error, mutate} = useSWR<CableTvPlan[], RequestError>(token && id && [`/cabletv-plans?cabletv=${id}&_sort=name:ASC`]);

    return {
        plans,
        isLoading: !plans && !error,
        error,
        mutate
    }
}

export default useCableTvPlans;