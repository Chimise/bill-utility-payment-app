import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';

import BannerImage from '../../../assets/Banner.png';

const Banner = () => {
    return (
        <section className='bg-blue-900 py-10'>
            <Container className='flex flex-row flex-wrap justify-center items-center md:space-x-5 space-y-5'>
            <div className='basis-full md:basis-1/2 flex items-center md:-ml-5'>
                <div className='w-full h-full inline-flex items-center justify-center'>
                <Image src={BannerImage} alt= "A line chart on the uptrend" />
                </div>
            </div>
            <div className='basis-full md:basis-1/2 space-y-4'>
                <h3 className='text-4xl text-slate-50 font-medium'>{"Sell data & Airtime for any network. It's cheaper, faster and reliable"}</h3>
                <p className='text-lg text-gray-300'>How To Get Started?</p>
                <ul className='text-md text-gray-50 ml-4'>
                    <li className='relative before:absolute before:-left-4 before:bottom-2 before:h-2 before:w-2 before:bg-blue-400 before:rotate-45'>Create an account or Login if you already have one.</li>
                    <li className='relative before:absolute before:-left-4 before:bottom-2 before:h-2 before:w-2 before:bg-blue-400 before:rotate-45' >Fund your e-wallet</li>
                    <li className='relative before:absolute before:-left-4 before:bottom-2 before:h-2 before:w-2 before:bg-blue-400 before:rotate-45' >Enjoy Secured and Fast Transactions</li>
                </ul>
                
                <Link href='/register'>
                   <a className='block px-4 py-3 bg-blue-400 text-xl uppercase text-center cursor-pointer text-white font-medium rounded-md hover:bg-slate-100 active:bg-slate-100 hover:text-blue-900'>Begin Now</a>
                </Link>
            </div>
            </Container>
        </section>
    )
}

export default Banner;