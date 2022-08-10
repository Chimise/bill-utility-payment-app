import {useReducer, useCallback} from 'react';
import RequestError from '../utils/RequestError';

interface State<Data = any> {
    data: Data | null;
    error: RequestError | null;
    isLoading: boolean;
}

type Actions<Data = any> = {type: 'SET_DATA', data: Data} | {type: 'SET_ERROR', error: RequestError} | {type: 'RESET_DATA'} | {type: 'START_REQUEST'};


export type Fetcher<T = any, B = any> = (
    options: FetcherOptions<B>,
    ...others: any[]
  ) => T | Promise<T>
  
  export type FetcherOptions<Body = any> = {
    url?: string
    method?: string
    headers?: {[key: string]: string}
    variables?: any
    body?: Body
  }

const initialState: State = {
    data: null,
    error: null,
    isLoading: false
}




function reducer<Data = any>(state: State<Data>, action: Actions<Data>): State<Data>{
    if(action.type === 'START_REQUEST') {
        return {
            data: null,
            error: null,
            isLoading: true
        }
    }
    if(action.type === 'SET_DATA') {
        return {
            isLoading: false,
            error: null,
            data: action.data
        }
    }

    if(action.type === 'SET_ERROR') {
        return {
            data: null,
            isLoading: false,
            error: action.error

        }
    }

    if(action.type === 'RESET_DATA') {
        return initialState;
    }
    return state;
}


function useMutation<Data>(fetcher: Fetcher<Data>, loadOnStart:boolean = false) {
    const [requestData, dispatch] = useReducer<typeof reducer, State<Data>>(reducer, {...initialState, isLoading: loadOnStart}, () => ({...initialState, isLoading: loadOnStart}));

    const sendRequest = useCallback(async (...args: Parameters<Fetcher<Data>>) => {
        dispatch({type: 'START_REQUEST'})
        try {
            const data = await fetcher(...args);
            dispatch({type: 'SET_DATA', data: data});
        } catch (error: any) {
            
            const formattedError = new RequestError({message: error.message || 'Sending Request failed', code: error.code || 500});
            dispatch({type: 'SET_ERROR', error: formattedError});
        }
    }, [fetcher]);

    return {
        ...requestData,
        sendRequest
    }
    
}


export default useMutation;