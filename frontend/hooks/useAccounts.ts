import useSWR from "swr";
import { User } from "../utils";
import RequestError from "../utils/RequestError";
import useAuth from './useAuth';

interface Account {
    id: string;
    name: string;
    account_id: string;
    account_number: string;
    user: User;
    bank: string
}

const useAccounts = () => {
    const {token} = useAuth();
    const {data, error, mutate} = useSWR<Account[], RequestError>(token && ['/payments/getDedicatedAccount', token]);

    return {
        isLoading: !data && !error,
        accounts: data,
        error,
        mutate
    }
};

export default useAccounts;