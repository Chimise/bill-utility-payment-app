import { useEffect } from "react";
import {useRouter} from 'next/router';

import useMutation from "./useMutation"
import useUI from "./useUI";
import useUser from './useUser';
import { provider} from "../utils/mutation";
import type {User} from '../utils'

const useProvider = () => {
    const {mutate} = useUser();
    const {data, error, sendRequest} = useMutation<User>(provider, true);
    const {push} = useRouter();
    const {openToastHandler} = useUI()

    useEffect(() => {
        if(data) {
            mutate(data, true);
            push('/dashboard');
        }
    }, [data, push, mutate])

    useEffect(() => {
        if(error) {
            openToastHandler('error', error.message, 3000);
        }
    }, [error, openToastHandler]);

    
    return sendRequest;
}

export default useProvider;