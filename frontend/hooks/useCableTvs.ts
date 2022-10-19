import useSWR from "swr";
import useAuth from "./useAuth";
import type { CableTv } from "./useCableTvBills";
import RequestError from "../utils/RequestError";

const useCableTvs = (initialData: CableTv[]) => {
    const {token} = useAuth();
    const {data: cabletvs, error} = useSWR<CableTv[], RequestError>(token && ['/cabletvs'], null, {fallbackData: initialData});
    return {
        cabletvs: cabletvs || initialData,
        error
    }
}

export default useCableTvs;