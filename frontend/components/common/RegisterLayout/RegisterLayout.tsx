import React, { Fragment } from 'react';

import useUI from '../../../hooks/useUI';
import CopyRight from '../Footer/CopyRight';
import Toast from '../../ui/Toast/Toast';


interface RegisterLayoutProps {
    children: React.ReactNode,
    showCopyRight?: boolean
}

const RegisterLayout = ({children, showCopyRight = true}: RegisterLayoutProps) => {
    const uiContext = useUI();
    return <Fragment>
    <Toast isVisible={uiContext.toastIsVisible} message={uiContext.message} status={uiContext.status} onClose={uiContext.closeToastHandler} />
        {children}
    {showCopyRight && <CopyRight mode='dark' className='bg-gray-100 mt-0' /> }
    </Fragment>
}

export default RegisterLayout;