import React, {useEffect, useMemo} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Loader from '../../../components/ui/Loader/Loader';
import { fetcher} from '../../../utils';
import { AuthResponse } from '../../../utils/mutation';
import useAuth from '../../../hooks/useAuth';
import useProvider from '../../../hooks/useProvider';
import Input from '../../../components/ui/Input/Input';
import Paper from '../../../components/ui/Paper/Paper';
import Button from '../../../components/ui/Button/Button';
import RegisterLayout from '../../../components/common/RegisterLayout/RegisterLayout';
import useUser from '../../../hooks/useUser';

const ProviderPage = () => {
    const {query, isReady, replace} = useRouter();
    const {loginHandler} = useAuth();
    const sendRequest = useProvider();
    const {user, isLoading} = useUser();

    const hasDetails = useMemo(() => {
        if(user) {
            return user.firstName && user.lastName && user.phoneNo;
        }else {
            return false;
        }
    }, [user]);

    useEffect(() => {
        if(hasDetails) {
            replace('/dashboard');
        }
    }, [hasDetails, replace]);
    

    useEffect(() => {
        if(isReady && query && !query.id_token) {
            replace('/auth/login');
        }
    }, [query, replace, isReady])

    useEffect(() => {
        if(query && query.id_token) {
            const accessToken = query.id_token;
            fetcher(`/auth/google/callback?access_token=${accessToken}`).then((data: AuthResponse) => {
                loginHandler(data.jwt, false);
            }).catch(err => {
                console.log(err);
                replace('/auth/login');
            })
        }

    }, [query, replace, loginHandler]);

    const {values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting} = useFormik({initialValues: {
        firstName: '',
        lastName: '',
        phoneNo: ''
    }, async onSubmit(values) {
        await sendRequest(values);
    }, validationSchema: yup.object({
        firstName: yup.string().required("Please enter your First Name"),
        lastName: yup.string().required("Please enter your Last Name"),
        phoneNo: yup.string().required("Please enter a phone Number").matches(
      new RegExp("(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)"),
      "Enter a valid Nigerian phone number"
    ),
    })})

    return (
    <div className="h-screen w-screen items-center justify-center">
        {isLoading && <Loader isVisible={true} />}
        {user && !hasDetails && <div className="w-full h-full flex items-center p-8 sm:p-0 justify-center bg-slate-100">
            <h2 className='font-medium text-center my-2 bg-violet-700 uppercase'>Complete Your Login</h2>
                <Paper className="p-7 w-full sm:w-[24rem]">
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <Input name="firstName" label="First Name" onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName} value={values.firstName}  />
                        <Input name="lastName" label="Last Name" onChange={handleChange} onBlur={handleBlur} error={touched.lastName && errors.lastName} value={values.lastName} />
                        <Input name="phoneNo" label="Phone Number" onChange={handleChange} onBlur={handleBlur} error={touched.phoneNo && errors.phoneNo} value={values.phoneNo} />
                        <div className='pt-2'>
                        <Button type='submit' variant='slim' className='w-full bg-violet-600 hover:bg-violet-800' disabled={isSubmitting} loading={isSubmitting}>Sign In</Button>
                        </div>
                    </form>
                </Paper>
            </div>}
    </div>
    )
}

ProviderPage.getLayout = (children: React.ReactNode) => (
    <RegisterLayout showCopyRight={false}>
        {children}
    </RegisterLayout>
)

export default ProviderPage;