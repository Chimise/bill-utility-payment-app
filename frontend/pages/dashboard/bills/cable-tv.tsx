import React, {useMemo} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NextSeo } from 'next-seo';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtitityHeader from '../../../components/common/UtilityHeader/UtilityHeader'
import Select from '../../../components/ui/Select/Select';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import { getCableTvs } from '../../../utils/requests';
import type { CableTv } from '../../../hooks/useCableTvBills';
import useCableTvs from '../../../hooks/useCableTvs';
import useCableTvPlans from '../../../hooks/useCableTvPlans';
import useCableTvPayments from '../../../hooks/useCableTvPayment';


const BORDER_CLASS = 'focus:ring-slate-700 focus:border-slate-700';

interface CableTvBillsPageProps {
    cabletvs: CableTv[]
}


const CableTvBillsPage = ({cabletvs: initialData}: CableTvBillsPageProps) => {
const {cabletvs} = useCableTvs(initialData);
const sendRequest = useCableTvPayments()
const {values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({initialValues: {cableTv: '', smartCardNo: '', package: ''}, onSubmit: async (values) => {
        await sendRequest({id: values.package, customerAccountId: values.smartCardNo});
    }, validationSchema: Yup.object({
        cableTv: Yup.string().required('Please choose your Cable Tv Type').oneOf(cabletvs.map(cab => cab.id)),
        smartCardNo: Yup.number().required("Please enter your SmartCard Number"),
        package: Yup.string().required("Please select a package")
    })})

const planId = values.package;

const {plans} = useCableTvPlans(values.cableTv);
const amount = useMemo(() => {
    if(!plans) {
        return '';
    }
    const plan = plans.find(plan => plan.id === planId);
    return plan ? plan.selling_price.toString() : '';
}, [plans, planId])

    return (
        <DashboardContainer>
            <NextSeo
        title="CableTv Topup"
        description="Top up your Dstv, Gotv and Startime without any charge"
        nofollow
        noindex
      />
            <DashboardHeader title="Pay your Utility Bills (DSTV, GOTV, STARTIME)" />
            <Paper className='mt-4 mb-10 md:mb-4'>
                <UtitityHeader title="Cable TVs" />
                <form className='p-4 my-4 grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={handleSubmit}>
                    <Select borderClass={BORDER_CLASS} name="cableTv" label="Cable Tv" value={values.cableTv} onChange={handleChange} onBlur={handleBlur} error={touched.cableTv && errors.cableTv}>
                        <option value="">Select Cable Tv</option>
                        {cabletvs.map(cabletv => (
                            <option key={cabletv.id} value={cabletv.id}>{cabletv.name}</option>
                        ))}
                    </Select>
                    <Input borderClass={BORDER_CLASS} name="smartCardNo" label="SmartCard/IUC No" value={values.smartCardNo} onChange={handleChange} onBlur={handleBlur} error={touched.smartCardNo && errors.smartCardNo}  />
                    <Select borderClass={BORDER_CLASS} name="package" label="Package" value={values.package} onChange={handleChange} onBlur={handleBlur} error={touched.package && errors.package}>
                        <option value="">Select Package</option>
                        {plans && plans.map(plan => (
                            <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                        ))}
                    </Select>
                    <Input borderClass={BORDER_CLASS} name="amount" label="Amount" value={amount} onChange={() => {}} readOnly disabled />
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

CableTvBillsPage.isAuth = true;

export default CableTvBillsPage;


export const getStaticProps = async () => {
    const cabletvs = await getCableTvs();
    return {
        props: {
            cabletvs
        }
    }
}