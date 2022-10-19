import React, { useState, useMemo} from "react";
import { useFormik } from "formik";
import { usePaystackPayment, } from "react-paystack";
import * as Yup from "yup";
import { useRouter } from "next/router";

import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import SelectPaymentMethod from "../../../components/common/SelectPaymentMethod/SelectPaymentMethod";
import FundWalletInput from "../../../components/ui/FundWalletInput/FundWalletInput";
import Button from "../../../components/ui/Button/Button";
import useUser from '../../../hooks/useUser';
import useCharge from '../../../hooks/useCharge';
import usePaymentMethods, {PaymentMethods} from '../../../hooks/usePaymentMethods';
import {getPaymentMethods} from '../../../utils/requests';
import usePayment from '../../../hooks/usePayment';


interface Paystack {
  reference: string,
  message: string,
  transaction: string;
}

interface MethodCharge {
  [key: string]: {
    total: number,
    charge: number;
  }
}

interface FundWalletPageProps {
  methods: Array<PaymentMethods>
}



function FundWalletPage({methods}: FundWalletPageProps) {
  const [selected, setSelected] = useState<PaymentMethods>();
  const [showPayment, setShowPayment] = useState(false);
  const {user} = useUser();
  const {payMethods} = usePaymentMethods(methods);
  const sendRequest = usePayment();
  const router = useRouter();


  const {
    handleBlur,
    handleSubmit,
    handleChange,
    errors,
    touched,
    values: {amount},
    isSubmitting,
  } = useFormik({
    initialValues: {
      amount: "",
    },
    async onSubmit(values, {setFieldError}) {
      if(!selected) { 
        return setFieldError('amount', "Please choose a payment method");

      }
      if(selected.identifier === 'card') {
        handleCreditCardPayment();
      }else {
        router.push(`/dashboard/wallet/dedicated?amount=${values.amount}`)
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .min(200, "The minimum amount is 200")
        .max(100000, "The maximum amount is 100000")
        .required("Enter a valid amount from 200 to 100000"),
    }),
  });

  const {charges} = useCharge(parseInt(amount));

  const modifiedCharges: MethodCharge = useMemo(() => {
    const parsedAmount = parseInt(amount);
    const paymentMethods = payMethods || methods;
    return paymentMethods.reduce<MethodCharge>((acc, next) => {
      const identifier = next.identifier;
      acc[identifier] = {
        total: parsedAmount && charges ? charges[identifier] + parsedAmount : 0,
        charge: charges ? charges[identifier] : 0
      }
      return acc;
    }, {})
    
  }, [payMethods, charges, amount, methods])


  const onCancelPayment = () => {
    setShowPayment(false);
  };

  const onSubmit = async (reference: Paystack) => {
    setShowPayment(false);
    await sendRequest({reference: reference.reference})
  };

  // Get the total price from the selected payment method
  const config = useMemo(() => {
    const identifier = selected ? selected.identifier : ''
    const amount = modifiedCharges[identifier]?.total || 0;
    return {
      email: user ? user.email : '',
      amount: amount * 100,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY ? process.env.NEXT_PUBLIC_PAYSTACK_KEY : ''
    }
  }, [user, modifiedCharges, selected]);
  const initializePayment = usePaystackPayment(config);

  const handleCreditCardPayment = () => {
    if(!user) {
      return;
    }
    setShowPayment(true);
    //Incorrect typing in the package
    //@ts-ignore
    initializePayment(onSubmit, onCancelPayment);
  };

  if(showPayment) {
    return <div className="h-full w-full" />
  }

  return (
    <div className="w-11/12 mx-auto mt-6 mb-8">
      <div className="w-full mx-auto max-w-xl space-y-6">
        <h2 className="text-3xl font-medium">Fund Wallet</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <FundWalletInput
          onChange={handleChange}
          onBlur={handleBlur}
          value={amount}
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
            channels={payMethods || methods}
            charges={modifiedCharges}
          />
        </div>
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-gray-700 hover:bg-gray-800"
        >
          Proceed To Pay
        </Button>
        </form>
      </div>
    </div>
  )
  
}

// Use a different layout, the auth layout
FundWalletPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

FundWalletPage.isAuth = true;

export default FundWalletPage;

export const getStaticProps = async () => {
  const data = await getPaymentMethods();
  return {
    props: {
      methods: data
    }
  }
}
