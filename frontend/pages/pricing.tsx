import useSWR from "swr";

import Pricing from "../components/common/Pricing/Pricing";
import {getBackendUri, Operator} from '../utils'
import RequestError from "../utils/RequestError";


interface PricingPageProps{
    operators: Array<Operator>
}

const PricingPage = ({operators}: PricingPageProps) => {

    return (
        <Pricing operators={operators}  />
    )
}


export const getStaticProps = async () => {
    const response = await fetch(getBackendUri('/providers'));
    if(!response.ok) {
        const error = new RequestError({message: "An error occured", code: response.status});
        throw error;
    }
    const data = await response.json();
    return {
        props: {
            operators: data
        }
    }
}


export default PricingPage;