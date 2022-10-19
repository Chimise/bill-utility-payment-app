import useSWR from "swr";
import useAuth from './useAuth';
import { Disco } from "./useElectricityBills";
import RequestError from "../utils/RequestError";

const useDiscos = (initialState?: Disco[]) => {
    const {token} = useAuth();
    const {data: discos, error, mutate} = useSWR<Disco[], RequestError>(token && ['/discos', token], null, {fallbackData: initialState});

    return {
        isLoading: !discos && !error,
        error,
        mutate,
        discos

    }
};

export default useDiscos;