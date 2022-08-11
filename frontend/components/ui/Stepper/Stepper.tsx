import React, {SVGAttributes} from 'react';
import cn from 'classnames';

interface StepperProps {
    active: boolean;
    Icon: React.JSXElementConstructor<SVGAttributes<SVGElement>>;
    children: React.ReactNode;
    className?: string;
    activeClass?: string;
    inactiveClass?: string;
}

const Stepper = ({active, Icon, children, className, activeClass, inactiveClass}: StepperProps) => {
    return <div className={cn('flex space-x-2 items-start my-2 group h-20', className)}>
        <div className='flex items-center space-y-2 flex-col h-full shrink-0'>
        <span className={cn({[activeClass ? activeClass: 'bg-gray-400']: !active, [inactiveClass ? inactiveClass: 'bg-slate-900']: active}, 'shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-colors text-white')}>
            <Icon className='w-6 h-6' />
        </span>
        <span className='flex-1 w-0.5 bg-gray-200 group-last:hidden'></span>
    </div>
    <div className='mt-1.5'>
        {children}
    </div>
    </div>
}

export default Stepper;