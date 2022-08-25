import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtitityHeader from '../../../components/common/UtilityHeader/UtilityHeader'
import Select from '../../../components/ui/Select/Select';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

const cableTvs = ["STARTIMES", "GOTV", "DSTV"];
const packages = ["1 months", "3 months", "6 months"];
const BORDER_CLASS = 'focus:ring-slate-700 focus:border-slate-700';


const CableTvBillsPage = () => {

    const {values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({initialValues: {cableTv: '', smartCardNo: '', package: '', amount: ''}, onSubmit: (values, {setSubmitting}) => {
        console.log(values);
    }, validationSchema: Yup.object({
        cableTv: Yup.string().required('Please choose your Cable Tv Type').oneOf(cableTvs),
        smartCardNo: Yup.number().required("Please enter your SmartCard Number"),
        package: Yup.string().required("Please select a package").oneOf(packages),
        amount: Yup.number().required("Please enter an amount")
    })})

    return (
        <DashboardContainer>
            <DashboardHeader title="Pay your Utility Bills (DSTV, GOTV, STARTIME)" />
            <Paper className='mt-4 mb-10 md:mb-4'>
                <UtitityHeader title="Cable TVs" />
                <form className='p-4 my-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Select borderClass={BORDER_CLASS} name="cableTv" label="Cable Tv" value={values.cableTv} onChange={handleChange} onBlur={handleBlur} error={touched.cableTv && errors.cableTv}>
                        <option value="">Select Cable Tv</option>
                        {cableTvs.map(cableTv => (
                            <option key={cableTv} value={cableTv}>{cableTv}</option>
                        ))}
                    </Select>
                    <Input borderClass={BORDER_CLASS} name="smartCardNo" label="SmartCard/IUC No" value={values.smartCardNo} onChange={handleChange} onBlur={handleBlur} error={touched.smartCardNo && errors.smartCardNo}  />
                    <Select borderClass={BORDER_CLASS} name="package" label="Package" value={values.package} onChange={handleChange} onBlur={handleBlur} error={touched.package && errors.package}>
                        <option value="">Select Package</option>
                        {packages.map(_package => (
                            <option key={_package} value={_package}>{_package}</option>
                        ))}
                    </Select>
                    <Input borderClass={BORDER_CLASS} name="amount" label="Amount" value={values.amount} onChange={handleChange} onBlur={handleBlur} error={touched.amount && errors.amount}  />
                    <div className="flex justify-end md:col-span-2">
                            <Button type="submit" className='w-full sm:w-auto bg-cyan-600 hover:bg-cyan-800' loading={isSubmitting}>Submit</Button>
                    </div>
                </form>
            </Paper>
        </DashboardContainer>
    )
}

CableTvBillsPage.getLayout = (children: React.ReactNode) => {
    return (<AuthLayout>
        {children}
    </AuthLayout>)
}



export default CableTvBillsPage;