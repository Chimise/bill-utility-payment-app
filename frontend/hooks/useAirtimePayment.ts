import { useEffect } from "react";
import useMutation from "./useMutation";
import { handleAirtimePayment } from "../utils/mutation";
import useAirtimePurchases from "./useAirtimePurchases";
import useUI from "./useUI";

const useAirtimePayment = () => {
    const {data, error, sendRequest} = useMutation(handleAirtimePayment, true);
    const {mutate} = useAirtimePurchases();
    const {openToastHandler} = useUI();
    useEffect(() => {
        if(data) {
            mutate(purchases => ([...data, ...(purchases || [])]), false);
            openToastHandler('success', "Payment Successful");
        }else if(error) {
            openToastHandler('error', error.message, 3000);
        }
    }, [data, error, openToastHandler, mutate])


    return sendRequest;
}

export default useAirtimePayment;