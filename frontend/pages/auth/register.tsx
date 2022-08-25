import React, {Fragment} from 'react';
import Link from 'next/link';
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import Input from '../../components/ui/Input/Input';
import InputPassword from '../../components/ui/InputPassword/InputPassword';
import Button from '../../components/ui/Button/Button';
import CopyRight from '../../components/common/Footer/CopyRight';

import LogoImage from '../../assets/Logo.png';

const RegisterPage = () => {

  const {values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting} = useFormik({initialValues: {email: '', password: '', firstName: '', lastName: '', phone: ''}, onSubmit(values, {setSubmitting}){
    setTimeout(() => {
      console.log(values);
      const schema = Yup.string().transform((value: string) => {
        return value.replace(new RegExp('(^\\+?234)'), '0');
      });
      console.log(schema.cast(values.phone));
      setSubmitting(false);
    }, 500)
  }, validationSchema: Yup.object({
    email: Yup.string().trim().email('Please enter a valid email').required('Enter your email'),
    password: Yup.string().trim().min(5, 'The password should be at least five characters').required('Enter your password'),
    phone: Yup.string().required('Enter your phone number').matches(new RegExp('(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)'), 'Enter a valid Nigerian phone number'),
    firstName: Yup.string().required('Enter your first name'),
    lastName: Yup.string().required('Enter your last name')
  }) })

  return (
    <div className='bg-gray-100 flex items-center justify-center w-full min-h-[150vh] md:min-h-[160vh]'>
        <div className='w-full sm:w-[24rem] h-auto'>
            <div className='flex flex-col items-center mb-5'>
              <Link href='/'>
                <a className='block'><Image src={LogoImage} alt='Logo Image' priority width={120} height={40} /></a>
              </Link>
                <h1 className='font-bold text-xl lg:text-3xl text-blue-900'>Get Started</h1>
                <h6 className='text-sm text-slate-700'>Create An Account</h6>
            </div>
            <div className='bg-white p-7'>
              <form noValidate onSubmit={handleSubmit} className='space-y-2'>
              <Input type='text' value={values.firstName} label='First Name' name='firstName' onChange={handleChange} onBlur={handleBlur} error={touched.firstName && errors.firstName} />
                <Input type='text' value={values.lastName} label='Last Name' name='lastName' onChange={handleChange} onBlur={handleBlur} error={touched.lastName && errors.lastName} />
                <Input type='email' value={values.email} label='Email address' name='email' onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />
                <Input type='tel' value={values.phone} label='Phone Number' name='phone' onChange={handleChange} onBlur={handleBlur} error={touched.phone && errors.phone} />
                <InputPassword value={values.password} label='Password' name='password' onChange={handleChange} onBlur={handleBlur} error={touched.password && errors.password} />
                <div className='py-1'></div>
                <Button type='submit' variant='slim' className='w-full bg-violet-600 hover:bg-violet-800 mt-4' loading={isSubmitting}>Create Account</Button>
              </form>
              <div className='mt-4 text-sm text-slate-500 font-light'>
                <span>Already have an account?</span>
                <Link href='/auth/login'>
                  <a className='ml-2 font-medium text-violet-500 hover:underline hover:text-violet-600'>Sign in</a>
                </Link>
              </div>
              <div className='flex space-x-2 items-center my-4'>
                  <hr className='flex-1 bg-slate-600' /><span className='text-slate-500 text-sm'>Or</span><hr className='flex-1 bg-slate-600' />
              </div>
              <div className='space-x-3'>
                <a href="http://backend.com" className='w-full border border-slate-500 bg-slate-500 flex hover:bg-slate-700 hover:border-slate-700 rounded-sm'>
                  <span className='shrink-0 flex justify-center items-center text-green-600 bg-white w-8'><FontAwesomeIcon icon={['fab', 'google']} size='lg' /></span>
                  <span className='flex-1 text-sm text-center text-white py-2'>Log in with google</span>
                </a>
              </div>
                
            </div>
        </div>
    </div>
  )
}

RegisterPage.getLayout = (children: React.ReactNode) => {
  return (<Fragment>
    {children}
    <CopyRight mode='dark' className='bg-gray-100 mt-0' />
  </Fragment>);
}

export default RegisterPage;