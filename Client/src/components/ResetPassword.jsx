import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';//to use user input value
import { resetPasswordValidation } from '../Helper/Validate';
import styles from '../Styles/Username.module.css';


const ResetPassword = () => {

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: ''
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values)
        }
    })

    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder='false'></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'> Reset Password </h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Enter New Password.
                        </span>
                    </div>
                    <form className='py-20' onSubmit={formik.handleSubmit}>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('password')} type='password' className={styles.textbox} placeholder='New Password' />
                            <input {...formik.getFieldProps('confirmpassword')} type='password' className={styles.textbox} placeholder='Confirm Password' />
                            <button className={styles.btn} type='submit'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword