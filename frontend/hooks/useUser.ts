import useSWR from "swr";
import useAuth from "./useAuth";
import type {User} from '../utils'
import type RequestError from "../utils/RequestError";

function useUser()  {
    const {token} = useAuth();
    const {data: user, error, mutate} = useSWR<User, RequestError>(token && ['/users/me', token]);

    return {
        isLoading: !user && !error,
        user,
        error,
        mutate
    }

}

export default useUser;