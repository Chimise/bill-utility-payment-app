import React from 'react';
import AuthLayout from '../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../components/ui/DashboardContainer/DashboardContainer';

const ProfilePage = () => {
    return (<DashboardContainer>
        User Profile Page
    </DashboardContainer>)
}

ProfilePage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}



export default ProfilePage;