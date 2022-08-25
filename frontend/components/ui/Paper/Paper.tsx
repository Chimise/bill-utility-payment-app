import React from 'react';
import cn from 'classnames';

interface PaperProps {
    children: React.ReactNode;
    className?: string;
}


const Paper = ({children, className}: PaperProps) => {
    return (<div className={cn('bg-white rounded-md shadow-sm', className)}>
        {children}
    </div>)
}

export default Paper;