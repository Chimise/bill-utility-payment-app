import useSWR from 'swr';
import { Plan } from '../utils';
import RequestError from '../utils/RequestError';

const usePlans = (providerId?: string) => {
    const {data: plans, error, mutate} = useSWR<Array<Plan>, RequestError>(providerId && `/plans?provider=${providerId}&_sort=value:ASC`);
    
    return {
        plans,
        error,
        mutate,
        isLoading: !plans && !error
    }
};

export default usePlans;