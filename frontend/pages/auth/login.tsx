import React, {Fragment} from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import Input from '../../components/ui/Input/Input';
import InputPassword from '../../components/ui/InputPassword/InputPassword';
import Button from '../../components/ui/Button/Button';
import CopyRight from '../../components/common/Footer/CopyRight';

import LogoImage from '../../assets/Logo.png';

const LogInPage = () => {

  const {values, errors, touched, handleSubmit, handleBlur, handleChange, isSubmitting} = useFormik({initialValues: {email: '', password: '', rememberMe: true}, onSubmit(values, {setSubmitting}){
    setTimeout(() => {
      setSubmitting(false);
    }, 500)
  }, validationSchema: Yup.object({
    email: Yup.string().trim().email('Please enter a valid email').required('Enter your email'),
    password: Yup.string().trim().min(5, 'The password should be at least five characters').required('Enter your password'),
    rememberMe: Yup.boolean().optional()
  }) })

  return (
    <div className='bg-gray-100 flex items-center justify-center w-full min-h-[130vh] md:min-h-[140vh]'>
        <div className='w-full sm:w-[24rem] h-auto'>
            <div className='flex flex-col items-center mb-5'>
              <Link href='/'>
                <a className='block'><Image src={LogoImage} alt='Logo Image' priority width={120} height={40} /></a>
              </Link>
                <h1 className='font-bold text-3xl text-blue-900'>Sign in to your account</h1>
                <div className='text-slate-700'>Or <Link href='/auth/register'>
                  <a className='text-sm text-violet-500 hover:text-violet-700'>get started now</a>
                  </Link></div>
            </div>
            <div className='bg-white p-7'>
              <form noValidate onSubmit={handleSubmit} className='space-y-2'>
                <Input type='email' value={values.email} label='Email address' name='email' onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email} />
                <InputPassword value={values.password} label='Password' name='password' onChange={handleChange} onBlur={handleBlur} error={touched.password && errors.password} />
                <div className='flex justify-between items-end'>
                  <label className='flex items-center space-x-2'><input className='block focus:outline-none text-violet-600 rounded-sm h-4 w-4 border-gray-300 focus:ring-violet-500' type='checkbox' name='rememberMe' onChange={handleChange} onBlur={handleBlur} checked={values.rememberMe} /><span className='text-slate-700 text-sm'>Remember me</span></label>
                  <Link href='/auth/forgot-password'>
                    <a className='text-violet-500 hover:text-violet-700 text-xs'>Forgot your password?</a>
                  </Link>
                </div>
                <div className='py-1'></div>
                <Button type='submit' variant='slim' className='w-full bg-violet-600 hover:bg-violet-800' loading={isSubmitting}>Sign In</Button>
              </form>
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

LogInPage.getLayout = (children: React.ReactNode) => {
  return (<Fragment>
    {children}
    <CopyRight mode='dark' className='bg-gray-100 mt-0' />
  </Fragment>);
}

export default LogInPage;