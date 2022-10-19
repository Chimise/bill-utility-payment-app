import useSWR from "swr";
import { fetcher } from "../utils";
import RequestError from '../utils/RequestError';
import useAuth from "./useAuth";

interface Charges {
    [key: string]: number
}

const useCharge = (amount: number) => {
    const {token} = useAuth();

    const {data: charges, error} = useSWR<Charges, RequestError>(amount ? ['/payments/get_charge', amount, token] : null, async (url: string, amount: number, token: string | null) => {
        const response = await fetcher(`${url}?amount=${amount}`, token ? token : undefined);
        return response;

    });

    return {
        isLoading: !charges || !error,
        charges,
        error
    }
};

export default useCharge;