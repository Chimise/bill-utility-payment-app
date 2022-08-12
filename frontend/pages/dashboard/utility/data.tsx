import React from 'react';

import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';

const DataPage = () => {
    return <div>
        The Data Page
    </div>
}

DataPage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default DataPage;