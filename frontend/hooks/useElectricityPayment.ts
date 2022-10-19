import { useEffect } from 'react';
import useMutation from './useMutation';
import useElectricityBills from './useElectricityBills';
import { handleElectricityPayment } from '../utils/mutation';
import useUI from './useUI';

const useElectricityPayments = () => {
    const {sendRequest, data, error} = useMutation(handleElectricityPayment, true);
    const {mutate} = useElectricityBills();
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

export default useElectricityPayments;