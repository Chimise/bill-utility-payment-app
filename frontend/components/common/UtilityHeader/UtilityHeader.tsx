import React from 'react';

interface UtilityHeaderProps {
    title: string;
}

const UtilityHeader = ({title}: UtilityHeaderProps) => {
    return <div className='flex h-14'>
        <div className='flex border-t-4 border-slate-700 items-center justify-center px-4 text-md font-medium text-slate-700'>
            {title}
        </div>
        <div className='flex-1 rounded-bl-lg shadow-sm'></div>
    </div>
}

export default UtilityHeader;