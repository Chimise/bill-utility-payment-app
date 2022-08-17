import React from 'react';
import AuthLayout from '../components/common/AuthLayout/AuthLayout';

const FaqPage = () => {
    return (<div>
        This is the Frequently asked questions page
    </div>)
}

FaqPage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default FaqPage;