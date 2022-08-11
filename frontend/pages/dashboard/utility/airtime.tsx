import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import Input from '../../../components/ui/Input/Input';
import RadioButton, {Providers} from '../../../components/ui/Radio/RadioButton';
import TextArea from '../../../components/ui/TextArea/TextArea';
import Button from '../../../components/ui/Button/Button';
import AnalyzeNumbers from '../../../components/common/AnalyzeNumbers/AnalyzeNumbers';




const providers: Providers = {
    mtn: 'bg-[#ffc000]',
    airtel: 'bg-white',
    '9mobile': 'bg-green-800',
    glo: 'bg-green-900'
}

const parseNumbersToArray = (enteredNumbers: string) => {
    const numbers = Yup.string().trim().transform((value: string) => value.replace(/(\s|\n|,)+/g, ',')).cast(enteredNumbers);
    if(numbers) {
        return numbers.split(',').filter(val => val.trim() !== '');
    }

    return [];

}

const filteredNumbers = (enteredNumbers: string) => {
    const parsedNumbers = parseNumbersToArray(enteredNumbers);
    return parsedNumbers.reduce((acc, number) => {
        const isValid = number.match(new RegExp('(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)'));
        if(isValid) {
            acc['validNum'] = [...(acc['validNum'] || []), number]
            acc['invalidNum'] = [...(acc['invalidNum'] || [])]

        }else {
            acc['invalidNum'] = [...(acc['invalidNum'] || []), number]
            acc['validNum'] = [...(acc['validNum'] || [])]
        }
        return acc;
    }, {} as {validNum: string[], invalidNum: string[]})
    
}


const AirtimePage = () => {
    const [validNumbers, setValidNumbers] = useState<Array<string>>([]);
    const [invalidNumbers, setInvalidNumbers] = useState<Array<string>>([]);
    const [provider, setProvider] = useState('');
    const {values: {numbers, amount}, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({initialValues: {numbers: '', amount: ''}, async onSubmit(values, {setFieldError}) {
        if(!(provider in providers)) {
            setFieldError('numbers', 'Please choose a Network Provider');
            return;
        }

    }, validationSchema: Yup.object({
        amount: Yup.number().required('Please enter a valid amount').min(50, 'Please enter an amount from ₦50'),
        numbers: Yup.string().required('Please enter a valid phone number').test('Test whether the numbers are valid', 'Please enter a valid phone number', (value) => {
            if(!value) {
                return true;
            }
            const {invalidNum} = filteredNumbers(value);
            return invalidNum.length === 0
        }) 
    })})
    

    useEffect(() => {
        const {invalidNum, validNum} = filteredNumbers(numbers);
        setInvalidNumbers(invalidNum);
        setValidNumbers(validNum);
    }, [numbers])

    return (
        <div>
            <DashboardHeader title="Airtime Topup" />
            <Paper className='w-11/12 mx-auto'>
                <UtilityHeader title="VTU Recharge" />
                <div className='my-4 px-4 py-3'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                    <Input label='Recharge Amount (between ₦50 - ₦5000)' name='amount' borderClass='focus:border-slate-700 focus:ring-slate-700' placeholder='500' className='w-24'  onChange={handleChange} onBlur={handleBlur} value={amount} error={touched.amount && errors.amount}  />
                    <RadioButton providers={providers} onSelect={setProvider} selected={provider} label="Choose a Network Provider"  />
                    <TextArea name='numbers' onChange={handleChange} onBlur={handleBlur} value={numbers} error={touched.numbers && errors.numbers} label="Phone Numbers  (seperated by a comma, space or newline. Duplicate numbers won't be repeated)" borderClass='focus:border-slate-700 focus:ring-slate-700' />
                    <Button type='submit'  className='w-full bg-slate-600 hover:bg-slate-800' variant='flat' loading={isSubmitting}>Submit</Button>
                    </form>
                </div>
            </Paper>
            <AnalyzeNumbers />
        </div>
    )
}



AirtimePage.getLayout = (children: React.ReactNode) => {
    return <AuthLayout>
        {children}
    </AuthLayout>
}

export default AirtimePage;