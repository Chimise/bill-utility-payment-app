import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import SelectPaymentMethod, {
  Payment,
} from "../../../components/common/SelectPaymentMethod/SelectPaymentMethod";
import FundWalletInput from "../../../components/ui/FundWalletInput/FundWalletInput";
import Button from "../../../components/ui/Button/Button";

const payments: Array<Payment> = [
  {
    id: 1,
    title: "Dedicated Bank Account",
    charges: 0,
    total: 0,
    duration: "Instant Payment",
    label: { text: "Recommended", color: "success" },
    availability: "24/7",
    meta: "Bank Transfer from any account",
  },
  {
    id: 2,
    title: "Paystack using Debit Card",
    charges: 0,
    total: 0,
    duration: "Instant Payment",
    availability: "24/7",
    meta: "Credit card payment",
  },
  {
    id: 3,
    title: "Bank Transfer",
    charges: 0,
    total: 0,
    duration: "Up to 4 hours",
    availability: "Mon-Friday 8am to 6pm",
    label: { text: "Slowest", color: "warning" },
  },
];

function FundWalletPage() {
  const [selected, setSelected] = useState(payments[0]);
  const [showPayment, setShowPayment] = useState(false);

  const onCancelPayment = () => {
    setShowPayment(false);
  }
  const onSubmit = () => {
    setShowPayment(true);
    
  }

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: {
      amount: "",
    },
    async onSubmit(values, { setSubmitting, setFieldError }) {
      const test: (isValid: boolean) => Promise<string> = (isValid: boolean) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (isValid) {
              resolve("Verified");
            } else {
              reject(new Error("Operation failed"));
            }
          }, 1000);
        });

      try {
        const isVerified = await test(false);
        return isVerified;
      } catch (error) {
        setFieldError(
          "amount",
          error instanceof Error ? error.message : "invalid message"
        );
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .min(200, "The minimum amount is 200")
        .max(20000, "The maximum amount is 20000")
        .required("Enter a valid amount from 200 to 20000"),
    }),
  });

  const submitHandler = () => {
    handleSubmit();
  };

  return (
    <div className="w-11/12 mx-auto mt-6 mb-8">
      <div className="w-full mx-auto max-w-xl space-y-6">
        <h2 className="text-3xl font-medium">Fund Wallet</h2>
        <FundWalletInput
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.amount}
          error={touched.amount && errors.amount ? errors.amount : false}
          placeholder="Enter a valid amount from 100"
          name="amount"
          label="Enter Amount"
        />
        <div>
          <p className="mb-2 text-sm text-gray-700 font-medium">
            Choose a payment method:
          </p>
          <SelectPaymentMethod
            selected={selected}
            onSelect={setSelected}
            channels={payments}
          />
        </div>
        <Button
          type="submit"
          onClick={submitHandler}
          loading={isSubmitting}
          className="w-full bg-gray-700 hover:bg-gray-800"
        >
          Proceed To Pay
        </Button>
      </div>
    </div>
  );
}

// Use a different layout, the auth layout
FundWalletPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default FundWalletPage;
