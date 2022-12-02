import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/solid'

const NotFoundPage = () => {
    return (<div className='max-w-sm space-y-2 md:space-y-0 md:flex md:space-x-4'>
        <Head>
            <title>404: Page Not Found</title>
        </Head>
        <div className='text-3xl text-slate-700 font-semibold'>
            404
        </div>
        <div className='flex flex-col'>
            <h1 className='text-3xl text-gray-800 font-semibold'>Page not found</h1>
            <p className='text-sm text-gray-500 font-light mt-1'>Sorry, we couldn&apos;t find the page you are looking for.</p>
            <Link href="/">
            <a className='inline-flex items-center text-slate-800 mt-4 text-sm space-x-2'><span>Go back home </span><ArrowRightIcon className='w-4 stroke-2 h-4' /></a>
            </Link>
            
        </div>
    </div>)
}

NotFoundPage.getLayout = (children: React.ReactNode) => {
    return <main className='w-screen h-screen flex items-center justify-center'>
        {children}
    </main>
}

export default NotFoundPage;
