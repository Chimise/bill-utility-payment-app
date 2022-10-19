import { useEffect } from "react";
import useMutation from "./useMutation";
import useCableTvBills from "./useCableTvBills";
import useUI from "./useUI";
import { handleCableTvPayment } from "../utils/mutation";

const useCableTvPayments = () => {
    const {data, error, sendRequest} = useMutation(handleCableTvPayment, true);
    const {mutate} = useCableTvBills();
    const {openToastHandler} = useUI();
    useEffect(() => {
        if(data) {
            mutate(purchases => ([data, ...(purchases || [])]), false);
            openToastHandler('success', "Payment Successful");
        }else if(error) {
            openToastHandler('error', error.message, 3000);
        }
    }, [data, error, openToastHandler, mutate])


    return sendRequest;
}

export default useCableTvPayments;