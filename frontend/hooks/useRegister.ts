import { useEffect } from "react";
import { useRouter } from "next/router";
import useMutation from "./useMutation"
import useAuth from "./useAuth";
import useUI from "./useUI";
import { registerUser, AuthResponse} from "../utils/mutation"

const useRegister = (redirectTo?: string) => {
    const {loginHandler} = useAuth();
    const {data, error, sendRequest} = useMutation<AuthResponse>(registerUser);
    const {openToastHandler} = useUI()

    useEffect(() => {
        if(data) {
            loginHandler(data.jwt, true, redirectTo);
            
        }
    }, [data, loginHandler, redirectTo])

    useEffect(() => {
        if(error) {
            openToastHandler('error', error.message, 5000);
        }
    }, [error, openToastHandler]);

    
    return sendRequest;
}

export default useRegister;