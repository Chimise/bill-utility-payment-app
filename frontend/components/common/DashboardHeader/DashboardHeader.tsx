import React from 'react';
import cn from 'classnames';

interface DashboardHeaderProps {
    title: string;
    className?: string;
}

const DashboardHeader = ({title, className}: DashboardHeaderProps) => {
    return <div className='py-5 px-3'>
        <h1 className={cn('font-medium text-2xl text-gray-900', className)}>{title}</h1>
    </div>
}

export default DashboardHeader;