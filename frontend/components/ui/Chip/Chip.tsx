import React from 'react';
import cn from 'classnames';

interface Classes {
    success: string;
    error: string;
    warning: string;
    info: string;
}

interface ChipProps {
    color: keyof Classes;
    className?: string;
    children: React.ReactNode

}



const classes: Classes = {
    success: 'bg-green-800/50 text-green-800',
    error: 'bg-red-700/50 text-red-700',
    warning: 'bg-orange-500/50 text-orange-500',
    info: 'bg-sky-800/50 text-sky-800'
}


const Chip = ({color, className, children}: ChipProps) => {
    const rootClassName = cn(classes[color], 'px-2 py-1 rounded-full text-xs font-semibold', className);
    return (
        <span className={rootClassName}>
            {children}
        </span>
    )
}


export default Chip;