import React, {useState, Fragment} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import AuthHeader from './AuthHeader';
import NavLink from '../../ui/NavLink/NavLink';
import LogoImage from '../../../assets/White-Logo.png';

import MobileAuthMenu from '../MobileAuthMenu/MobileAuthMenu';


interface AuthLayoutProps {
    children: React.ReactNode;
    isHome?: boolean;
}



interface NavLinks {
    [key: string]: Array<{href: string; label: string, icon: string}>
}


const navLinks:NavLinks = {
    actions: [{href: '/dashboard', label: 'Dashboard', icon: 'dashboard'}, {href: '/dashboard/wallet/fund', label: 'Fund Wallet', icon: 'fund'}],
    orders: [{href: '/dashboard/order/airtime', label: 'Airtime Topup', icon: 'airtime'}, {href: '/dashboard/order/data', label: 'Data Topup', icon: 'data'}],
    bills: [{href: '/dashboard/bills/electricity', label: 'Pay Electricity Bills', icon: 'electricity'}, {href: '/dashboard/bills/cable-tv', label: 'Cable TV Subscriptions', icon: 'cabletv'}],
    faq: [{label: 'FAQs', href: '/dashboard/faq', icon: 'faq'}],
    transactions: [{href: '/dashboard/transactions/wallet', label: 'Wallet Funding History', icon: 'wallet'}, {label: 'Order History', href: '/dashboard/transactions/orders', icon: 'order'}, {label: 'Bill History', href: '/dashboard/transactions/bills', icon: 'bills'}]  
}
const AuthLayout = ({children, isHome = false}: AuthLayoutProps) => {
    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const openMenuHandler = () => {
        setMenuIsVisible(true);
    }

  const closeMenuHandler = () => {
    setMenuIsVisible(false);
  };

    return (
    <Fragment>
    <MobileAuthMenu showMenu={menuIsVisible} onCloseMenu={closeMenuHandler} />
    <div className='lg:flex'>
        <nav className='hidden lg:basis-[250px] lg:shrink-0 lg:block lg:h-screen overflow-y-hidden'>
            <div className='fixed top-0 left-0 w-[250px] h-full lg:bg-slate-800'>
            <div className='h-14 sticky flex bg-slate-900/75 w-full items-center px-5'>
                <Link href='/'>
                <a className='flex w-full h-full items-center mt-1'><Image src={LogoImage} alt='Logo Image' width={130} height={40} /></a>
                </Link>
            </div>
            <div className='flex flex-col w-full divide-y divide-slate-100/25 h-[calc(100vh-56px)] pt-2 pb-5 overflow-auto'>
                {Object.keys(navLinks).map((section) => (
                    <div key={section} className='py-4 px-1 space-y-2'>
                        {navLinks[section].map(link => (
                            <NavLink key={link.icon} href={link.href} icon={link.icon}>{link.label}</NavLink>
                        ))}
                    </div>
                ))}
            </div>
            </div>
        </nav>
        <div className='lg:flex-1'>
            <AuthHeader onOpenMenu={openMenuHandler} isHome={isHome} />
            <main className='bg-slate-50 h-[calc(100vh-56px)] overflow-y-auto'>
                {children}
            </main>
        </div>
    </div>
    
    </Fragment>)
}


export default AuthLayout;