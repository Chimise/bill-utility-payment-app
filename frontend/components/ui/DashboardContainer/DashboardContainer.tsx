import React from 'react';
import cn from 'classnames';

interface DashboardContainerProps {
    children: React.ReactNode;
    className?: string;
}

const DashboardContainer = ({children, className}: DashboardContainerProps) => {
    return (<div className={cn("w-11/12 mx-auto", className)}>
        {children}
    </div>)
}

export default DashboardContainer;