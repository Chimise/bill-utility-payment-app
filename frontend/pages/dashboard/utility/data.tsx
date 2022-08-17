import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import DashboardContainer from "../../../components/ui/DashboardContainer/DashboardContainer";
import DashboardHeader from "../../../components/common/DashboardHeader/DashboardHeader";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import SelectProvider from "../../../components/common/SelectProvider/SelectProvider";
import SelectDataPlan from "../../../components/common/SelectDataPlan/SelectDataPlan";
import TextArea from "../../../components/ui/TextArea/TextArea";
import Button from "../../../components/ui/Button/Button";
import AnalyzeNumbers from "../../../components/common/AnalyzeNumbers/AnalyzeNumbers";
import { providers, pricingData, PricingData, filteredNumbers } from "../../../utils";


import usePhoneNumAnalyzer from "../../../hooks/usePhoneNumAnalyzer";
import type { Stepper } from "../../../components/common/AnalyzeNumbers/AnalyzeNumbers";
const DataPage = () => {
    const [provider, setProvider] = useState('mtn');
    const [dataPlans, setDataPlans] = useState<Array<PricingData>>([]);
    const [selectedPlan, setSelectedPlan] = useState<null | PricingData>(null);
    const {values: {numbers}, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({initialValues: {numbers: ''}, async onSubmit(values, {setFieldError}) {
        if(!(provider in providers)) {
            setFieldError('numbers', 'Please choose a Network Provider');
            return;
        }

    }, validationSchema: Yup.object({
        numbers: Yup.string().required('Please enter a valid phone number').test('Test whether the numbers are valid', 'Please enter a valid phone number', (value) => {
            //When the test is called for the first time without any value
            if(!value) {
                return true;
            }
            const {invalidNum} = filteredNumbers(value);
            return invalidNum.length === 0
        }) 
    })})
    

    const {recipients, isInValidActive, isValidActive, validNumbers, invalidNumbers} = usePhoneNumAnalyzer(numbers);
    

    const parsedAmount = selectedPlan ? selectedPlan.price : 0;
    const isProviderValid = provider !== '';
    const isTotalValid = recipients > 0 && parsedAmount > 0;
    const total = isTotalValid ? recipients * parsedAmount : 0;

    const steppers: Array<Stepper> = [{iconName: 'provider', active: isProviderValid, header: 'Provider', content: provider.toUpperCase()}, {iconName: 'validNumbers', active: isValidActive, header: 'Valid Numbers', content: validNumbers}, {iconName: 'invalidNumbers', active: isInValidActive, header: 'Invalid Numbers', content: invalidNumbers}, {iconName: 'recipients', active: isValidActive, header: 'Recipients', content: recipients.toString()}, {iconName: 'total', active: isTotalValid, header: 'Total', content: `₦${total}`}]

    useEffect(() => {
        const filteredData = pricingData.filter(dataPlan => dataPlan.provider === provider);
        setDataPlans(filteredData);
    }, [provider]);
  return (
    <DashboardContainer>
      <DashboardHeader title="Data Topup"></DashboardHeader>
      <Paper>
         <UtilityHeader title="Purchase Data" />
         <div className="my-3 px-4 py-3 space-y-3">
            <SelectProvider onSelect={setProvider} providers={providers} selected={provider} label="Choose a Network Provider" />
            <SelectDataPlan onSelect={setSelectedPlan} dataPlans={dataPlans} selected={selectedPlan} label="Please select a plan" />
            <form>
            <TextArea name='numbers' onChange={handleChange} onBlur={handleBlur} value={numbers} error={touched.numbers && errors.numbers} label="Phone Numbers  (seperated by a comma, space or newline. Duplicate numbers won't be repeated)" borderClass='focus:border-slate-700 focus:ring-slate-700' />
            <Button type='submit'  className='w-full bg-slate-600 hover:bg-slate-800' variant='flat' loading={isSubmitting}>Submit</Button>
            </form>
         </div>
      </Paper>
      <AnalyzeNumbers label="Preview Data Purchase" steppers={steppers} />
    </DashboardContainer>
  );
};

DataPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default DataPage;
