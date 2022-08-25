import React, {useEffect, useReducer, useCallback} from 'react';


interface UIContext {
    toastIsVisible: boolean;
    message: string;
    status: State['status'];
    openToastHandler: (status: State['status'], message: string) => void;
    closeToastHandler: () => void;

}

interface UIContextProviderProps {
    children: React.ReactNode
}

interface State {
    message: string;
    toastIsVisible: boolean;
    status: 'success' | 'error' | 'info' | 'warning' | null;
}

type Actions = {type: 'SET TOAST', message: string, status: State['status']} | {type: 'DISMISS TOAST'}


const UIContext = React.createContext<UIContext>({toastIsVisible: false, message: '', status: null, openToastHandler: () => {}, closeToastHandler: () => {}});


const uiReducer = (state: State, actions: Actions): State => {
    if(actions.type === 'SET TOAST') {
        return {
            message: actions.message,
            status: actions.status,
            toastIsVisible: true
        }
    }
    if(actions.type === 'DISMISS TOAST') {
        return {
            message: '',
            status: null,
            toastIsVisible: false
        }
    }
  return state;
}

const INITIAL_STATE: State = {
    message: '',
    toastIsVisible: false,
    status: null
}


export const UIContextProvider = ({children}: UIContextProviderProps) => {

    const [state, dispatch] = useReducer<typeof uiReducer, State>(uiReducer, INITIAL_STATE, () => (INITIAL_STATE));

    const toastIsVisible = state.toastIsVisible;

    const openToastHandler = (status: State['status'], message: string) => {
        dispatch({type: 'SET TOAST', message: message, status: status});
    }

    const closeToastHandler = useCallback(() => {
        dispatch({type: 'DISMISS TOAST'});
    }, [dispatch])

    useEffect(() => {
        const identifier = setTimeout(() => {
            if(toastIsVisible) {
                
                closeToastHandler()
            }
        }, 3000)

        return () => {
            clearTimeout(identifier);
        }
    }, [toastIsVisible, closeToastHandler])

    return (<UIContext.Provider value={{...state, openToastHandler, closeToastHandler}}>
        {children}
    </UIContext.Provider>)
}



export default UIContext;