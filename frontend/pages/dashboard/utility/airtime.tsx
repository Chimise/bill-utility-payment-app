import React, {useState} from 'react';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import Input from '../../../components/ui/Input/Input';
import RadioButton, {Providers} from '../../../components/ui/Radio/RadioButton';
import TextArea from '../../../components/ui/TextArea/TextArea';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/ui/Button/Button';




const providers: Providers = {
    mtn: 'bg-[#ffc000]',
    airtel: 'bg-white',
    '9mobile': 'bg-green-800',
    glo: 'bg-green-900'
}

const parseNumbersToArray = (enteredNumbers: string) => {
    const numbers = Yup.string().trim().transform((value: string) => value.replace(/(\s|\n|,)+/g, ',')).cast(enteredNumbers);
    if(numbers) {
        return numbers.split(',').filter(val => val);
    }

    return [];

}

const filteredNumbers = (enteredNumbers: string) => {
    const parsedNumbers = parseNumbersToArray(enteredNumbers);
    return parsedNumbers.reduce((acc, number) => {
        const isValid = number.match(new RegExp('(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)'));
        if(isValid) {
            acc['valid'] = [...acc['valid'], number]
        }else {
            acc['invalid'] = [...acc['invalid'], number]
        }
        return acc;
    }, {valid: [], invalid: []} as {valid: string[], invalid: string[]})
    
}


const AirtimePage = () => {
    const [validNumbers, setValidNumbers] = useState([]);
    const [invalidNumbers, setInvalidNumbers] = useState([]);
    const [provider, setProvider] = useState('');
    const {values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({initialValues: {numbers: '', amount: ''}, async onSubmit(values, {setFieldError}) {
        const numbersIsValid: boolean = await new Promise(resolve => {
            setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                // const numbers = Yup.string().trim().transform((value: string) => value.replace(/(\s|\n|,)+/g, ',')).cast(values.numbers);
                // console.log(numbers);
                // const isValid = Yup.array().of(Yup.string().trim().matches(new RegExp('(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)'))).ensure().isValid(numbers?.split(',').filter(val => val)); 
                 const {invalid} = filteredNumbers(values.numbers);
                if(invalid.length > 0) {
                    setFieldError('numbers','Please enter valid phone numbers')
                }
                resolve(invalid.length == 0);
            }, 1500)
        });

        if (!numbersIsValid) {
            setFieldError('numbers', 'Please enter valid phone numbers');
        }


    }, validationSchema: Yup.object({
        amount: Yup.number().required('Please enter a valid amount'),
        numbers: Yup.string().required('Please enter a valid phone number')
        //.transform((currentValue: string) => currentValue.replace(/(\s|\n)+/g, ',')).matches(new RegExp('(^(((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}(,?))+$)'), 'Please enter a valid number')
    })})

    return (
        <div>
            <DashboardHeader title="Airtime Topup" />
            <Paper className='w-11/12 mx-auto pb-3'>
                <UtilityHeader title="VTU Recharge" />
                <div className='my-4 p-4'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                    <Input label='Recharge Amount (between ₦50 - ₦5000)' name='amount' borderClass='focus:border-slate-700 focus:ring-slate-700' placeholder='500' className='w-24'  onChange={handleChange} onBlur={handleBlur} value={values.amount} error={touched.amount && errors.amount}  />
                    <RadioButton providers={providers} onSelect={setProvider} selected={provider} label="Choose a Network Provider"  />
                    <TextArea name='numbers' onChange={handleChange} onBlur={handleBlur} value={values.numbers} error={touched.numbers && errors.numbers} label="Phone Numbers  (seperated by a comma, space or newline. Duplicate numbers won't be repeated)" borderClass='focus:border-slate-700 focus:ring-slate-700' />
                    <Button type='submit'  className='w-full bg-slate-600 hover:bg-slate-800' variant='flat' loading={isSubmitting}>Submit</Button>
                    </form>
                </div>
            </Paper>
        </div>
    )
}



AirtimePage.getLayout = (children: React.ReactNode) => {
    return <AuthLayout>
        {children}
    </AuthLayout>
}

export default AirtimePage;