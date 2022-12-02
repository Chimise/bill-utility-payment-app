import { Fragment } from 'react';
import Container from '../../ui/Container/Container';
import Background from '../../../assets/background.jpg';
import Actions from '../Actions/Actions';


const Company = () => {
    return (
        <Fragment>
            <section style={{backgroundImage: `url("${Background.src}")`}} className="relative min-h-[70vh] bg-slate-300 bg-cover bg-no-repeat bg-center bg-fixed" >
                <div className='absolute inset-0 bg-black/75 py-7'>
                    <Container>
                        <div className='w-full md:w-1/2 p-3 space-y-4'>
                            <h2 className='text-4xl md:text-5xl font-semibold text-slate-400 tracking-wide'>What is Nccommtech?</h2>
                            <p className='text-md leading-relaxed text-slate-100 text-justify'>Nccommtech is a web platform where users can purchase internet Data Bundles, VTU Airtime, Bulk SMS, Pay Electricity Bills, TV Subscription, and more. It is an online platform to pay bills in Nigeria and get rewarded at the same time. We have designed our website to accommodate all. Providing users on our platform the opportunity to save cost, make fast, secured, efficient and rewarding purchases.</p>
                        </div>
                    </Container>
                </div>
            </section>
            <Actions />
        </Fragment>
    )
}


export default Company;