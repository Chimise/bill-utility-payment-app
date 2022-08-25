import Container from "../../ui/Container/Container";
import {PhoneIcon, MailIcon} from '@heroicons/react/outline';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea/TextArea";
import Button from "../../ui/Button/Button";
import useUI from "../../../hooks/useUI";


const ContactUs = () => {

    const context = useUI();

    const {values, errors, touched, handleBlur, handleSubmit, handleChange, isSubmitting} = useFormik({initialValues: {firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''}, onSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            context.openToastHandler('success', 'Message Sent Successfully');
            setSubmitting(false);
        }, 800)
    }, validationSchema: Yup.object({
        firstName: Yup.string().trim().max(20, 'Must be 20 characters or less').required('Required'),
        lastName: Yup.string().trim().max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().trim().email('Invalid email address').required('Required'),
        phone: Yup.string().trim().optional(),
        subject: Yup.string().trim().required('Required'),
        message: Yup.string().trim().min(15, 'Must be 15 characters or more').required('Required')
    })})

    return (<section className="h-auto lg:min-h-[100vh] bg-gray-50 pb-10">
        <Container className="lg:grid lg:grid-cols-3 lg:gap-x-2">
        <div className="lg:col-span-1 py-10 space-y-3">
            <h1 className="font-bold text-3xl text-slate-900">Contact Us</h1>
            <ul className="space-y-3">
                <li><address className="inline not-italic text-slate-500">
                  Nigeria Army Post service <br/> Housing estate opposite Lasu Gate
                  Ojo,<br/> Lagos State.
                </address></li>
                <li className="flex space-x-2 items-center text-slate-500">
                <span><PhoneIcon className="w-4 h-4" /></span>
                <a href="tel:+2349046165168" className="hover:text-slate-600" >+2349046165168</a>
                </li>
                <li className="flex space-x-2 items-center text-slate-500">
                <span><MailIcon className="w-4 h-4" /></span>
                <a href="mailto:support@nccommtech.com" className="hover:text-slate-600">
                  support@nccommtech.com
                </a>
                </li>
            </ul>
        </div>
        <div className="lg:col-span-2 bg-white py-5 lg:pt-14 lg:pb-6 px-6 lg:px-10">
            <h4 className="text-slate-600 font-medium text-sm">Send us a message</h4>
            <form onSubmit={handleSubmit} noValidate>
            <div className="mt-5 grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-5">
                <div>
                    <Input label='First Name' type='text' name='firstName' onChange={handleChange} value={values.firstName} onBlur={handleBlur} error={touched.firstName && errors.firstName} />
                </div>
                <div>
                <Input label='Last Name' type='text' name='lastName' onChange={handleChange} onBlur={handleBlur} value={values.lastName} error={touched.lastName && errors.lastName} />
                </div>
                <div>
                <Input label='Email Address' type='email' name='email' onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && errors.email} />
                </div>
                <div>
                <Input label="Phone Number" type='tel' name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} error={touched.phone && errors.phone} />
                </div>
                <div className="md:col-span-2">
                <Input label="Subject" type='text' name='subject' onChange={handleChange} onBlur={handleBlur} value={values.subject} error={touched.subject && errors.subject} />
                </div>
                <div className="md:col-span-2">
                <TextArea label="Message" name='message' onChange={handleChange} onBlur={handleBlur} value={values.message} error={touched.message && errors.message} />
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <Button type='submit' variant="slim" loading={isSubmitting} >Submit</Button>
                </div>
            </div>
            </form>
        </div>
        </Container>
    </section>)
}

export default ContactUs;