import useSWR from "swr";
import { Operator } from "../utils";
import RequestError from "../utils/RequestError";

const useOperators = (initialData?: Operator[]) => {
    const {data: operators, error, mutate} = useSWR<Array<Operator>, RequestError>('/providers', null, {fallbackData: initialData})

    return {
        isLoading: !operators && !error,
        operators,
        error,
        mutate
    }
}

export default useOperators;