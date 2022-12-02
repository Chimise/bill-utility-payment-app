import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { NextSeo } from "next-seo";
import Paper from "../../components/ui/Paper/Paper";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import RegisterLayout from "../../components/common/RegisterLayout/RegisterLayout";
import { sendRequest } from "../../utils";
import useUI from "../../hooks/useUI";

const ForgotPassword = () => {
    const {openToastHandler} = useUI()
  const {handleSubmit, values, touched, errors, handleChange, handleBlur, isSubmitting} = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit(values, {setSubmitting}) {
        sendRequest('/auth/forgot-password', {body: values}).then(() => {
            openToastHandler('success', "Email sent successfully", 5000);
            setSubmitting(false);
        }).catch(() => {
            openToastHandler('error', "An error occurred, check your email and try again");
            setSubmitting(false);
        })

        
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
    }),
  });
  return (
    <div className="h-screen w-screen items-center justify-center">
      <NextSeo
        title="Forgot Password"
        description="Enter your email to reset your password"
        nofollow
        noindex
      />
      <div className="w-full h-full flex items-center p-8 sm:p-0 justify-center bg-slate-100">
        <Paper className="p-7 w-full sm:w-[24rem]">
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              name="email"
              label="Email Address"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Email"
              error={touched.email && errors.email}
              value={values.email}
            />
            <div className="pt-2">
              <Button
                type="submit"
                variant="slim"
                className="w-full bg-violet-600 hover:bg-violet-800"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Verify Email
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

ForgotPassword.getLayout = (children: React.ReactNode) => (
    <RegisterLayout showCopyRight={false}>
        {children}
    </RegisterLayout>
)

export default ForgotPassword;
