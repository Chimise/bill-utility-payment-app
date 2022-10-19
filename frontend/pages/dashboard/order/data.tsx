import React, {useState, useMemo} from "react";
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
import { filteredNumbers, Operator, Plan, getStepperAttr } from "../../../utils";
import useOperators from "../../../hooks/useOperators";
import usePlans from "../../../hooks/usePlans";
import Error from "../../../components/ui/Error/Error";
import Spinner from "../../../components/ui/Spinner/Spinner";
import useDataPayment from "../../../hooks/useDataPayment";



import usePhoneNumAnalyzer from "../../../hooks/usePhoneNumAnalyzer";
import type { Stepper } from "../../../components/common/AnalyzeNumbers/AnalyzeNumbers";
import { getOperators } from "../../../utils/requests";

interface DataPageProps {
  operators: Array<Operator>
}

const DataPage = ({operators: initialValues}: DataPageProps) => {
    const sendRequest = useDataPayment();
    const {operators: providers} = useOperators(initialValues);
    const [provider, setProvider] = useState<Operator | undefined>(() => initialValues.find(values => values.name === 'MTN'));
    const {plans, error, isLoading, mutate} = usePlans(provider? provider.id : undefined);
    const [selectedPlan, setSelectedPlan] = useState<null | Plan>(null);
    const {values: {numbers}, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({initialValues: {numbers: ''}, async onSubmit(_values, {setFieldError}) {
        if(!provider) {
            setFieldError('numbers', 'Please choose a Network Provider');
            return;
        }
        if(!selectedPlan) {
          setFieldError('numbers', "Please choose a plan");
          return;
        }

        await sendRequest({recipients: validNumbers}, selectedPlan.id);

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
    
    const amount = selectedPlan ? selectedPlan.selling_price : 0;

    const steppers: Array<Stepper> = useMemo(() => {
      return getStepperAttr(amount, provider, recipients, isValidActive, isInValidActive, validNumbers, invalidNumbers)
    }, [amount, provider, recipients, isInValidActive, isValidActive, validNumbers, invalidNumbers])
    
    

  return (
    <DashboardContainer>
      <DashboardHeader title="Data Topup"></DashboardHeader>
      <Paper>
         <UtilityHeader title="Purchase Data" />
         <div className="my-3 px-4 py-3 space-y-3">
            <SelectProvider onSelect={setProvider} providers={providers || initialValues} selected={provider} label="Choose a Network Provider" />
            {plans && <SelectDataPlan onSelect={setSelectedPlan} dataPlans={plans} selected={selectedPlan} label="Please select a plan" />}
            {error && <Error error={error.message} className='p-8' onRetry={() => mutate()} /> }
            {isLoading && <Spinner className="h-[40vh] md:h-[20vh]" />}
            <form onSubmit={handleSubmit}>
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

DataPage.isAuth = true;

export default DataPage;

export const getStaticProps = async () => {
  const operators = await getOperators();

  return {
    props: {
      operators
    }
  }
}
