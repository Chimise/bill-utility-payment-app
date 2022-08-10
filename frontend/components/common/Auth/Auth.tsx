import React, {useEffect} from 'react';
import router from 'next/router';

import useAuth from '../../../hooks/useAuth';
import Loader from '../../ui/Loader/Loader';

interface AuthProp {
    children: JSX.Element;
}

const Auth = ({children}: AuthProp) => {
    const {token} = useAuth();

    useEffect(() => {
        if(!token) {
            router.replace('/login');
        }
    }, [token])



    if(!token) {
        return <Loader isVisible={!token} />
    }

    return children;
}


export default Auth;