import React from 'react';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import Select from '../../../components/ui/Select/Select';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

import { distributionCompanies } from '../../../utils';

const BORDER_CLASS = 'focus:ring-slate-700 focus:border-slate-700';


const allValues = distributionCompanies.map(distro => distro.initial);
const meterTypes = ['Prepaid', 'Postpaid']

const ElectricityBillsPage = () => {
    const {values: {disco, meterNo, meterType, amount}, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({initialValues: {disco: '', meterNo: '', meterType: '', amount: ''}, onSubmit: (values, {setStatus}) => {
        console.log(values);
    }, validationSchema: Yup.object({
        disco: Yup.string().oneOf(allValues).required("Please choose a distribution company"),
        meterNo: Yup.number().required('Enter your meter no'),
        meterType: Yup.string().oneOf(meterTypes).required("Please choose your meter type"),
        amount: Yup.number().required("Please enter the amount you want to recharge").min(300, "The minimum amount is 300"),
    })});

    return (
        <DashboardContainer>
            <DashboardHeader title="Pay your Electricity Bills" />
            <Paper className='mt-4 mb-10 md:mb-4'>
                <UtilityHeader title="Electricity" />
                <form onSubmit={handleSubmit} className='grid my-4 grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                    <Select borderClass={BORDER_CLASS} value={disco} label="Disco" name="disco" onChange={handleChange} onBlur={handleBlur} error={touched.disco && errors.disco}>
                        <option value="" key={0}>Select Disco</option>
                        {distributionCompanies.map(disComp => (
                            <option value={disComp.initial} key={disComp.id}>
                                {disComp.name}{" "}({disComp.initial})
                            </option>
                        ))}
                    </Select>
                    <Input value={meterNo} placeholder="Enter your Meter Number" borderClass={BORDER_CLASS} name="meterNo" onChange={handleChange} label="Meter No" error={touched.meterNo && errors.meterNo} onBlur={handleBlur} />
                    <Select borderClass={BORDER_CLASS} name="meterType" label="Meter Type" value={meterType} onChange={handleChange} onBlur={handleBlur} error={touched.meterType && errors.meterType}>
                        <option className='capitalize' value="">Select Meter Type</option>
                        {meterTypes.map(meterType => (
                            <option className='capitalize' key={meterType} value={meterType}>
                                {meterType}
                            </option>
                        ))}
                    </Select>
                    <Input value={amount} placeholder="Enter your amount" borderClass={BORDER_CLASS} name="amount" onChange={handleChange} label="Amount" error={touched.amount && errors.amount} onBlur={handleBlur} />
                    <div className="flex justify-end md:col-span-2">
                            <Button type='submit' className='w-full sm:w-auto bg-cyan-600 hover:bg-cyan-800' loading={isSubmitting}>Submit</Button>
                    </div>

                </form>
            </Paper>
        </DashboardContainer>
    )
}

ElectricityBillsPage.getLayout = (children: React.ReactNode) => {
    return (<AuthLayout>
        {children}
    </AuthLayout>)
}



export default ElectricityBillsPage;