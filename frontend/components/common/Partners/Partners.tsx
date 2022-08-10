import {Fragment} from 'react';
import Image from 'next/image';

import Container from '../../ui/Container/Container';
import Actions from '../Actions/Actions';
import Gotv from '../../../assets/gotv.jpg';
import Startime from '../../../assets/startimes.jpeg';
import Spectranet from '../../../assets/spectranet.png';
import Ikedc from '../../../assets/ikedc.png';
import Ekedc from '../../../assets/ekedc.png';
import Dstv from '../../../assets/dstv.jpg';

const Partners = () => {
    return (
        <Fragment>
        <div className='py-10 bg-slate-100'>
            <Container>
            <h1 className='text-center text-blue-900 text-3xl font-medium mb-8'>Partners</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-8 items-center'>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Gotv} alt='Gotv Logo' width={150} height={80} />
                </div>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Startime} alt='Startime Logo' width={150} height={80}/>
                </div>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Spectranet} alt='Spectranet Logo' width={150} height={80} />
                </div>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Ikedc} alt='Ikedc Logo' width={150} height={80} />
                </div>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Ekedc} alt='Ekedc Logo' width={150} height={80} />
                </div>
                <div className='inline-flex items-center justify-center'>
                    <Image src={Dstv} alt='Dstv Logo' width={150} height={80} />
                </div>

            </div>
            </Container>
        </div>
        <Actions />
        </Fragment>
    )
}


export default Partners;