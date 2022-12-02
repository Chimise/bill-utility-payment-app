import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NextSeo } from "next-seo";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import DashboardHeader from "../../../components/common/DashboardHeader/DashboardHeader";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import Input from "../../../components/ui/Input/Input";
import SelectProvider from "../../../components/common/SelectProvider/SelectProvider";
import TextArea from "../../../components/ui/TextArea/TextArea";
import Button from "../../../components/ui/Button/Button";
import AnalyzeNumbers from "../../../components/common/AnalyzeNumbers/AnalyzeNumbers";
import DashboardContainer from "../../../components/ui/DashboardContainer/DashboardContainer";
import { filteredNumbers, Operator, getStepperAttr } from "../../../utils";
import usePhoneNumAnalyzer from "../../../hooks/usePhoneNumAnalyzer";
import useOperators from "../../../hooks/useOperators";
import { getOperators } from "../../../utils/requests";
import type { Stepper } from "../../../components/common/AnalyzeNumbers/AnalyzeNumbers";
import useAirtimePayment from "../../../hooks/useAirtimePayment";

interface AirtimePageProps {
  operators: Operator[];
}

const AirtimePage = ({ operators: initialValues }: AirtimePageProps) => {
  const { operators } = useOperators(initialValues);
  const sendRequest = useAirtimePayment();
  const [provider, setProvider] = useState(() =>
    initialValues!.find((op) => op.name === "MTN")
  );
  const {
    values: { numbers, amount },
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: { numbers: "", amount: "" },
    async onSubmit(values, { setFieldError }) {
      if (!provider) {
        setFieldError("numbers", "Please choose a Network Provider");
        return;
      }
      await sendRequest({
        provider: provider.id,
        recipients: validNumbers,
        amount: parseFloat(values.amount),
      });
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Please enter a valid amount")
        .min(50, "Please enter an amount from ₦50"),
      numbers: Yup.string()
        .required("Please enter a valid phone number")
        .test(
          "Test whether the numbers are valid",
          "Please enter a valid phone number",
          (value) => {
            //When the test is called for the first time without any value
            if (!value) {
              return true;
            }
            const { invalidNum } = filteredNumbers(value);
            return invalidNum.length === 0;
          }
        ),
    }),
  });

  const {
    validNumbers,
    invalidNumbers,
    recipients,
    isInValidActive,
    isValidActive,
  } = usePhoneNumAnalyzer(numbers);

  const steppers: Array<Stepper> = useMemo(() => {
    return getStepperAttr(
      parseInt(amount),
      provider,
      recipients,
      isValidActive,
      isInValidActive,
      validNumbers,
      invalidNumbers
    );
  }, [
    amount,
    provider,
    recipients,
    isInValidActive,
    isValidActive,
    validNumbers,
    invalidNumbers,
  ]);

  return (
    <DashboardContainer>
      <NextSeo
        title="Airtime Purchase"
        description="Purchase your VTU airtime at a cheaper rate and enjoy"
        nofollow
        noindex
      />
      <DashboardHeader title="Airtime Topup" />
      <Paper>
        <UtilityHeader title="Purchase Airtime" />
        <div className="my-4 px-4 py-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Recharge Amount (between ₦50 - ₦5000)"
              name="amount"
              borderClass="focus:border-slate-700 focus:ring-slate-700"
              placeholder="500"
              className="w-24"
              onChange={handleChange}
              onBlur={handleBlur}
              value={amount}
              error={touched.amount && errors.amount}
            />
            <SelectProvider
              providers={operators || initialValues}
              onSelect={setProvider}
              selected={provider}
              label="Choose a Network Provider"
            />
            <TextArea
              name="numbers"
              onChange={handleChange}
              onBlur={handleBlur}
              value={numbers}
              error={touched.numbers && errors.numbers}
              label="Phone Numbers  (seperated by a comma, space or newline. Duplicate numbers won't be repeated)"
              borderClass="focus:border-slate-700 focus:ring-slate-700"
            />
            <Button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-800"
              variant="flat"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </form>
        </div>
      </Paper>
      <AnalyzeNumbers label="Preview Airtime Purchase" steppers={steppers} />
    </DashboardContainer>
  );
};

AirtimePage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

AirtimePage.isAuth = true;

export default AirtimePage;

export const getStaticProps = async () => {
  const operators = await getOperators();
  return {
    props: {
      operators,
    },
  };
};
