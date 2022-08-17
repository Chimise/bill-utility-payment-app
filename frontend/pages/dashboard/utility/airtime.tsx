import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import Input from '../../../components/ui/Input/Input';
import SelectProvider from '../../../components/common/SelectProvider/SelectProvider';
import TextArea from '../../../components/ui/TextArea/TextArea';
import Button from '../../../components/ui/Button/Button';
import AnalyzeNumbers from '../../../components/common/AnalyzeNumbers/AnalyzeNumbers';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import { providers, filteredNumbers } from '../../../utils';
import usePhoneNumAnalyzer from '../../../hooks/usePhoneNumAnalyzer';

import type { Stepper } from '../../../components/common/AnalyzeNumbers/AnalyzeNumbers';


const AirtimePage = () => { 

    const [provider, setProvider] = useState('');
    const {values: {numbers, amount}, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({initialValues: {numbers: '', amount: ''}, async onSubmit(values, {setFieldError}) {
        if(!(provider in providers)) {
            setFieldError('numbers', 'Please choose a Network Provider');
            return;
        }

    }, validationSchema: Yup.object({
        amount: Yup.number().required('Please enter a valid amount').min(50, 'Please enter an amount from ₦50'),
        numbers: Yup.string().required('Please enter a valid phone number').test('Test whether the numbers are valid', 'Please enter a valid phone number', (value) => {
            //When the test is called for the first time without any value
            if(!value) {
                return true;
            }
            const {invalidNum} = filteredNumbers(value);
            return invalidNum.length === 0
        }) 
    })})
    

    const {validNumbers, invalidNumbers, recipients, isInValidActive, isValidActive} = usePhoneNumAnalyzer(numbers);

    const parsedAmount = parseInt(amount);
    const isProviderValid = provider !== '';
    const isTotalValid = recipients > 0 && parsedAmount > 0
    const total = isTotalValid ? recipients * parsedAmount : 0;

    const steppers: Array<Stepper> = [{iconName: 'provider', active: isProviderValid, header: 'Provider', content: provider.toUpperCase()}, {iconName: 'validNumbers', active: isValidActive, header: 'Valid Numbers', content: validNumbers}, {iconName: 'invalidNumbers', active: isInValidActive, header: 'Invalid Numbers', content: invalidNumbers}, {iconName: 'recipients', active: isValidActive, header: 'Recipients', content: recipients.toString()}, {iconName: 'total', active: isTotalValid, header: 'Total', content: `₦${total}`}]

    return (
        <DashboardContainer>
            <DashboardHeader title="Airtime Topup" />
            <Paper>
                <UtilityHeader title="Purchase Airtime" />
                <div className='my-4 px-4 py-3'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                    <Input label='Recharge Amount (between ₦50 - ₦5000)' name='amount' borderClass='focus:border-slate-700 focus:ring-slate-700' placeholder='500' className='w-24'  onChange={handleChange} onBlur={handleBlur} value={amount} error={touched.amount && errors.amount}  />
                    <SelectProvider providers={providers} onSelect={setProvider} selected={provider} label="Choose a Network Provider"  />
                    <TextArea name='numbers' onChange={handleChange} onBlur={handleBlur} value={numbers} error={touched.numbers && errors.numbers} label="Phone Numbers  (seperated by a comma, space or newline. Duplicate numbers won't be repeated)" borderClass='focus:border-slate-700 focus:ring-slate-700' />
                    <Button type='submit'  className='w-full bg-slate-600 hover:bg-slate-800' variant='flat' loading={isSubmitting}>Submit</Button>
                    </form>
                </div>
            </Paper>
            <AnalyzeNumbers label="Preview Airtime Purchase" steppers={steppers} />
        </DashboardContainer>
    )
}



AirtimePage.getLayout = (children: React.ReactNode) => {
    return <AuthLayout>
        {children}
    </AuthLayout>
}

export default AirtimePage;