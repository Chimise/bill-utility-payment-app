import React, {useEffect} from 'react';
import router from 'next/router';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../ui/Loader/Loader';

interface AuthProp {
    children: JSX.Element;
}

const Auth = ({children}: AuthProp) => {
    const {token, isLoading} = useAuth();

    useEffect(() => {
        if(!token && !isLoading)   {
            router.replace('/auth/login');
        }
    }, [token, isLoading])



    if(!token) {
        return <Loader isVisible={!token} />
    }

    return children;
}


export default Auth;