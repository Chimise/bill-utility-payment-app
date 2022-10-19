import { useEffect } from "react";
import useMutation from "./useMutation";
import { handleDataPayment } from "../utils/mutation";
import useDataPurchases from "./useDataPurchases";
import useUI from "./useUI";

const useDataPayment = () => {
    const {data, error, sendRequest} = useMutation(handleDataPayment, true);
    const {mutate} = useDataPurchases();
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

export default useDataPayment;