import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import Paper from "../../components/ui/Paper/Paper";
import InputPassword from "../../components/ui/InputPassword/InputPassword";
import Button from "../../components/ui/Button/Button";
import RegisterLayout from "../../components/common/RegisterLayout/RegisterLayout";
import { sendRequest } from "../../utils";
import useUI from "../../hooks/useUI";

const ForgotPassword = () => {
    const {openToastHandler} = useUI()
    const {query, push} = useRouter();
  const {handleSubmit, values, touched, errors, handleChange, handleBlur, isSubmitting} = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    onSubmit({password, confirmPassword: passwordConfirmation}, {setSubmitting, setFieldError}) {
        if(values.password !== values.confirmPassword) {
            setFieldError('confirmPassword', "Passwords do not match");
            setSubmitting(false);
            return;
        }
        if(!query.code) {
            setSubmitting(false);
            return openToastHandler('warning', "Error occured, please try again");
        }
        sendRequest('/auth/reset-password', {body: {
            password,
            passwordConfirmation,
            code: query.code
        }}).then(() => {
            setSubmitting(false);
            push('/auth/login');
        }).catch(() => {
            openToastHandler('error', "An error occurred, check your email and try again");
            setSubmitting(false);
        })

        
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .trim()
        .min(5, "Password should be at least five characters")
        .required("Enter a new password"),
    confirmPassword: yup.string().trim().min(5).required("Please confirm your password")
    }),
  });
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
      <NextSeo
        title="Reset your Password"
        description="Your password will be reset shortly"
        nofollow
        noindex
      />
      <div className="p-8 sm:p-0 w-full sm:w-[24rem]">
      <h2 className='font-medium text-center text-lg my-4 text-violet-900 uppercase'>Reset Your Password</h2>
        <Paper className="p-7 md:p-10 w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputPassword
              name="password"
              label="New Password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password should be upto 5 characters"
              error={touched.password && errors.password}
              value={values.password}
            />
            <InputPassword
              name="confirmPassword"
              label="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Your Password"
              error={touched.confirmPassword && errors.confirmPassword}
              value={values.confirmPassword}
            />
            <div className="pt-2">
              <Button
                type="submit"
                variant="slim"
                className="w-full bg-violet-600 hover:bg-violet-800"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Reset Password
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
