import React from 'react';

interface DashboardHeaderProps {
    title: string;
}

const DashboardHeader = ({title}: DashboardHeaderProps) => {
    return <div className='p-5'>
        <h1 className='font-medium text-2xl text-gray-900'>{title}</h1>
    </div>
}

export default DashboardHeader;