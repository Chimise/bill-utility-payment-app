import React, {useEffect, useReducer, useCallback} from 'react';


interface UIContext {
    toastIsVisible: boolean;
    message: string;
    status: State['status'];
    openToastHandler: (status: State['status'], message: string, duration?: number) => void;
    closeToastHandler: () => void;

}

interface UIContextProviderProps {
    children: React.ReactNode
}

interface State {
    message: string;
    toastIsVisible: boolean;
    status: 'success' | 'error' | 'info' | 'warning' | null;
    duration: number;
}

type Actions = {type: 'SET TOAST', message: string, status: State['status'], duration: number} | {type: 'DISMISS TOAST'}


const UIContext = React.createContext<UIContext>({toastIsVisible: false, message: '', status: null, openToastHandler: () => {}, closeToastHandler: () => {}});


const uiReducer = (state: State, actions: Actions): State => {
    if(actions.type === 'SET TOAST') {
        return {
            message: actions.message,
            status: actions.status,
            toastIsVisible: true,
            duration: actions.duration
        }
    }
    if(actions.type === 'DISMISS TOAST') {
        return {
            message: '',
            status: state.status,
            toastIsVisible: false,
            duration: 3000
        }
    }
  return state;
}

const INITIAL_STATE: State = {
    message: '',
    toastIsVisible: false,
    status: null,
    duration: 3000
}


export const UIContextProvider = ({children}: UIContextProviderProps) => {

    const [state, dispatch] = useReducer<typeof uiReducer, State>(uiReducer, INITIAL_STATE, () => (INITIAL_STATE));

    const toastIsVisible = state.toastIsVisible;
    const duration = state.duration;

    const openToastHandler = useCallback((status: State['status'], message: string, duration: number = 3000) => {
        dispatch({type: 'SET TOAST', message: message, status: status, duration});
    }, [dispatch]);

    const closeToastHandler = useCallback(() => {
        dispatch({type: 'DISMISS TOAST'});
    }, [dispatch])

    useEffect(() => {
        const identifier = setTimeout(() => {
            if(toastIsVisible) {
                
                closeToastHandler()
            }
        }, duration)

        return () => {
            clearTimeout(identifier);
        }
    }, [toastIsVisible, closeToastHandler, duration])

    return (<UIContext.Provider value={{...state, openToastHandler, closeToastHandler}}>
        {children}
    </UIContext.Provider>)
}



export default UIContext;