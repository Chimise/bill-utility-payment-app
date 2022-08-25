import React, {Fragment, useState} from 'react';
import { Transition } from '@headlessui/react';
import cn from 'classnames';

interface ToolTipProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

interface Position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}


const Tooltip = ({title, children, className}: ToolTipProps) => {

    const [position, setPosition] = useState<Position | null>(null)
    const [showToolTip, setShowToolTip] = useState(false);

    const showToolTipHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const pos = event.currentTarget.getBoundingClientRect()
        setPosition({top: Math.round(pos.top), left: Math.round(pos.left), right: Math.round(pos.right), bottom: Math.round(pos.bottom)});
        setShowToolTip(true);
    }

    const hideToolTipHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setShowToolTip(false);
    } 


    const rootClassName = cn(`cursor-pointer`, className)

    

    return (
        <Fragment>
            <span className={rootClassName} onMouseEnter={showToolTipHandler} onMouseLeave={hideToolTipHandler} data-content={title}>
            {children}
        </span>
        <Transition show={showToolTip} enter='transition-opacity duration-200' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity duration-150' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='absolute px-2 py-1 rounded-sm bg-black text-white text-sm font-light text-center w-max' style={{top: position ? position.bottom + 5 : undefined, left: position ? position.left -5 : undefined}}>
                {title}
            </div>
        </Transition>
        </Fragment>
        
    )
}

export default Tooltip;