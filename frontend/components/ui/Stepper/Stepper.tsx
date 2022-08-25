import React, {SVGAttributes, forwardRef} from 'react';
import cn from 'classnames';

interface StepperProps {
    active: boolean;
    Icon: React.JSXElementConstructor<SVGAttributes<SVGElement>>;
    children: React.ReactNode;
    className?: string;
    activeClass?: string;
    inactiveClass?: string;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(({active,  Icon, children, className, activeClass, inactiveClass,}, ref) => {
    return <div ref={ref} className={cn('flex space-x-2 items-start my-2 group h-14 last:h-auto', className)}>
        <div className='flex items-center space-y-1.5 flex-col h-full shrink-0'>
        <span className={cn({[activeClass ? activeClass: 'bg-slate-900']: active, [inactiveClass ? inactiveClass: 'bg-slate-400']: !active}, 'shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-colors text-white')}>
            <Icon className='w-6 h-6' />
        </span>
        <span className='flex-1 w-0.5 bg-gray-200 group-last:hidden'></span>
    </div>
    <div className='mt-1.5 text-neutral-800 text-sm'>
        {children}
    </div>
    </div>
})

Stepper.displayName = 'Stepper';

export default Stepper;