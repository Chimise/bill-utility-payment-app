import React from 'react';
import Link from 'next/link';

interface PricingCardProps {
    provider: string;
    type: string;
    plans: Array<{price: number; value:string; id:number;}>
}

type Classes = {
    [key: string]: string;
    mtn: string;
    airtel: string;
    '9mobile': string;
    glo: string;
}

const PricingCard = ({provider, type, plans}: PricingCardProps) => {
    const classes: Classes = {
        mtn: 'bg-[#ffc000]',
        airtel: 'bg-red-600',
        '9mobile': 'bg-green-800',
        glo: 'bg-gradient-to-r from-green-500 to-green-900'
    }
    return (
        <div className='border border-gray-300 rounded-lg p-5 relative flex flex-col ring-1 transition-colors ring-gray-300/10 justify-between h-[27rem] w-full md:max-w-xs mx-auto hover:ring-gray-300/50'>
            <div className={`absolute -top-3 left-5 flex items-center justify-between uppercase py-1.5 px-4 rounded-full text-slate-100 text-xs font-light tracking-tight ${classes[provider.toLowerCase()]}`}>
                <h5>{provider.toUpperCase()}</h5>
            </div>
            <div className='flex-1'>
                <div className='py-4 text-black/75 text-medium font-semibold'>
                    <h6 className='capitalize'>{type} Plans</h6>
                </div>
                <ul className='ml-4 space-y-2 text-slate-700'>
                    {plans.map((plan) => (
                        <li key={plan.id} className='relative space-x-2 text-slate-600 text-sm before:absolute before:w-2 before:h-2 before:bg-slate-600 before:top-[5px] before:-left-4 before:rotate-45'><span>{plan.value}</span><span></span>|<span>&#8358;{plan.price}</span></li>
                    ))}
                    
                </ul>
            </div>
            <Link href='/register'>
            <a className='block w-full bg-slate-700 rounded-md text-white text-center py-2 px-3 ring ring-slate-900/5 hover:bg-slate-800 hover:ring-slate-600/5 focus:outline-none'>Buy Now</a>
            </Link>
        </div>
    )
}

export default PricingCard;