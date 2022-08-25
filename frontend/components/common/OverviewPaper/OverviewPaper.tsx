import React from 'react';
import Paper from '../../ui/Paper/Paper';

interface OverviewPaperProps {
    header: string;
    content: number | string;
}

const OverviewPaper = ({header, content}: OverviewPaperProps) => {
    return (<Paper className='p-4 space-y-4'>
        <h6 className='text-gray-700 text-medium'>{header}</h6>
        <p className='text-3xl font-normal text-gray-500'>{header === 'Wallet' ? <span>&#8358;</span> : null}{content}</p>
    </Paper>)
}

export default OverviewPaper;