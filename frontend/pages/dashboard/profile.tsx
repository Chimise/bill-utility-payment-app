import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from 'yup';

import AuthLayout from "../../components/common/AuthLayout/AuthLayout";
import DashboardContainer from "../../components/ui/DashboardContainer/DashboardContainer";
import DashboardHeader from "../../components/common/DashboardHeader/DashboardHeader";
import Paper from "../../components/ui/Paper/Paper";
import Input from "../../components/ui/Input/Input";
import InputPassword from "../../components/ui/InputPassword/InputPassword";
import Button from "../../components/ui/Button/Button";
import { filteredNumbers } from "../../utils";

const tabHeaders = ["Update Profile", "Change Password"];

const ProfilePage = () => {
  
    const {values: {firstName, lastName, phoneNo}, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({initialValues: {firstName: '', lastName: '', phoneNo: ''}, onSubmit: (values, {setSubmitting}) => {

    }, validationSchema: Yup.object({
        firstName: Yup.string().required('Please provide your first Name'),
        lastName: Yup.string().required('Please provide your last name'),
        phoneNo: Yup.string().required('Please provide your phone number').test('Test phone number', 'Please enter a valid phone number', (value) => {
            if(!value) {
                return true;
            }
            const {invalidNum} = filteredNumbers(value);
            return invalidNum.length === 0;
        }),
    })});

    const {values: {newPassword, confirmPassword}, errors: passwordErrors, touched: passwordTouched, handleBlur: handlePasswordBlur, handleChange: handlePasswordChange, handleSubmit: handlePasswordSubmit, isSubmitting: passwordIsSubmitting} = useFormik({initialValues: {newPassword: '', confirmPassword: ''}, onSubmit: (values, {setSubmitting, setFieldError}) => {
        if(values.newPassword !== values.confirmPassword) {
            setFieldError('confirmPassword', "Entered passwords do not match");
            return;
        }



        console.log(values);
    }, validationSchema: Yup.object({
        newPassword: Yup.string().trim().min(5, 'Your password should be up to 5 characters').required('Please enter a new password'),
        confirmPassword: Yup.string().trim().required('Please reenter your new password')
    })})

  return (
    <DashboardContainer>
      <DashboardHeader title="View or Change Your Profile" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mt-8 mb-10 md:mb-0">
        <Paper>
          <Tab.Group>
            <Tab.List className="flex space-x-2 bg-sky-900/70 p-1">
              {tabHeaders.map((header) => (
                <Tab
                  key={header}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-800",
                      "focus:outline-none",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {header}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "rounded-xl bg-white p-3",
                  "focus:outline-none"
                )}
              >
                <form onSubmit={handleSubmit} className="py-5 px-7 space-y-3">
                  <Input label="First Name" name="firstName" value={firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName}  />
                  <Input label="Last Name" name="lastName" value={lastName} onChange={handleChange} onBlur={handleBlur} error={touched.lastName && errors.lastName} />
                  <Input label="Phone Number" name="phoneNo" value={phoneNo} onChange={handleChange} onBlur={handleBlur} error={touched.phoneNo && errors.phoneNo} />
                  <div className="flex justify-end">
                    <Button variant="slim" className="bg-sky-700 hover:bg-sky-900" type="submit" loading={isSubmitting}>Update Profile</Button>
                  </div>
                </form>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "rounded-xl bg-white p-3",
                "focus:outline-none"
                )}
              >
                <form onSubmit={handlePasswordSubmit} className="p-7 space-y-3">
                    <InputPassword label="New Password" placeholder="Enter a new password" name="newPassword" value={newPassword} onChange={handlePasswordChange} onBlur={handlePasswordBlur} error={passwordTouched.newPassword && passwordErrors.newPassword} />
                    <InputPassword label="Confirm Password" placeholder="Confirm your password" name="confirmPassword" value={confirmPassword} onChange={handlePasswordChange} onBlur={handlePasswordBlur} error={passwordTouched.confirmPassword && passwordErrors.confirmPassword} />
                    <div className="flex justify-end py-3">
                    <Button variant="slim" className="bg-sky-700 hover:bg-sky-900" type="submit" loading={passwordIsSubmitting}>Update Password</Button>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Paper>
        <Paper>
        <div className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">First Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Margot</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Promise</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">chimisepro@gmail.com</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">08036623453</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Balance</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
          </div>
          </dl>
      </div>
    </div>
        </Paper>
      </div>
    </DashboardContainer>
  );
};

ProfilePage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default ProfilePage;
