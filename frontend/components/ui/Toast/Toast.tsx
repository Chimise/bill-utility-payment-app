import React from 'react';
import {Transition} from '@headlessui/react';
import cn from 'classnames';
import {CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon, XIcon} from '@heroicons/react/outline';

const icons = {
    success: CheckCircleIcon,
    error: ExclamationCircleIcon,
    warning: ExclamationIcon,
    info: InformationCircleIcon
}

const classes = {
    success: 'bg-green-800',
    error: 'bg-red-700',
    warning: 'bg-orange-500',
    info: 'bg-sky-800'
}



interface ToastProps {
    isVisible: boolean;
    message: string;
    status: 'success' | 'error' | 'info' | 'warning' | null;
    onClose: () => void
}


const Toast = ({isVisible, message, status, onClose}: ToastProps) => {
    let Icon = CheckCircleIcon;
    let className = classes['success'];
    if(status) {
        Icon = icons[status];
        className = classes[status];
    }
    return (<Transition show={isVisible} enter='transition-opacity duration-150' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity duration-100 ease-in-out' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className={cn('fixed top-[20vh] w-[86vw] left-[7vw] sm:w-[70vw] sm:left-[15vw] md:w-[60vw] md:left-[20vw] lg:w-[50vw] lg:left-[25vw] flex p-4 rounded-md text-white items-center justify-between shadow-md', className)}>
                <div className='flex-1 flex space-x-3'><Icon className='w-6 h-6' /><p className='truncate'>{message}</p></div><div className='shrink-0 cursor-pointer' onClick={onClose}><XIcon className='w-6 h-6' /></div>
            </div>
    </Transition>)
}

export default Toast;