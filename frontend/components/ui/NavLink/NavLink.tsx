import React, { JSXElementConstructor } from 'react';
import {useRouter} from 'next/router';
import Link, {LinkProps} from 'next/link';
import cn from 'classnames';

import {HomeIcon, CashIcon, DesktopComputerIcon, DocumentReportIcon, GlobeAltIcon, LightBulbIcon, DocumentSearchIcon, PresentationChartBarIcon, PresentationChartLineIcon, CalendarIcon} from '@heroicons/react/outline';

interface NavLinkProps extends LinkProps{
    onClick?: (event: React.MouseEvent<any>) => void;
    children: React.ReactNode;
    className?: string;
    icon: string;
}

const icons:{[key: string]: JSXElementConstructor<React.ComponentProps<'svg'>>} = {
    dashboard:  HomeIcon,
    fund: CashIcon,
    airtime: DocumentReportIcon,
    data: GlobeAltIcon,
    electricity: LightBulbIcon,
    cabletv: DesktopComputerIcon,
    faq: DocumentSearchIcon,
    wallet: CalendarIcon,
    order: PresentationChartBarIcon,
    bills: PresentationChartLineIcon
}


const NavLink = ({href, onClick, children, icon, className}:NavLinkProps) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    const Icon = icons[icon] || HomeIcon;

    const clickHandler = (event: React.MouseEvent<any>) => {
        if(onClick) {
            onClick(event);
        }
    }

    return (<Link href={href}>
        <a className={cn('inline-flex w-full px-3 py-2 space-x-2 rounded-sm text-sm hover:bg-slate-600/50 hover:text-white items-center', {'bg-slate-600/50 text-white': isActive, 'text-slate-100': !isActive}, className )} onClick={clickHandler}><span><Icon className='w-6 h-6' /></span><span>{children}</span></a>
    </Link>)

}


export default NavLink; 