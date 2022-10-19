import { useEffect } from "react";

import useMutation from "./useMutation";
import useUI from "./useUI";
import useUser from "./useUser";
import usePayments from "./usePayments";

import { handlePayment } from "../utils/mutation";

const usePayment = () => {
    const {data, error, sendRequest} = useMutation(handlePayment, true);
    const {openToastHandler} = useUI()
    const {mutate} = useUser()
    const {mutate: mutatePayments} = usePayments();
    useEffect(() => {
        if(data) {
            openToastHandler("success", "Payment Successful");
            mutate(data.user, true);
            mutatePayments((payments => ([data, ...(payments || [])])), true);
        }
        if(error) {
            openToastHandler("error", error.message);
        }
    }, [data, error, openToastHandler, mutate, mutatePayments])

    return sendRequest;
}

export default usePayment;