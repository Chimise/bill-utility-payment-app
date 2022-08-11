import React from 'react';
import Stepper from '../../ui/Stepper/Stepper';
import Paper from '../../ui/Paper/Paper';
import {CashIcon, GlobeIcon, PhoneIcon, XIcon, UserGroupIcon} from '@heroicons/react/outline';

interface AnalyzeNumbersProps {
    classNames?: string;
}

const icons = {
    total: CashIcon,
    provider: GlobeIcon,
    validNumbers: PhoneIcon,
    invalidNumbers: XIcon,
    recipients: UserGroupIcon
}


const AnalyzeNumbers = () => {
    return <Paper className='my-4 p-3 mx-auto w-11/12'>
        <h6>Analysis</h6>
        <Stepper Icon={icons['total']} active={false}>The total is 20</Stepper>
        <Stepper Icon={icons['provider']} active={true}>The total is 20</Stepper>
        <Stepper Icon={icons['validNumbers']} active={false}>The total is 20</Stepper>
    </ Paper>
}

export default AnalyzeNumbers;