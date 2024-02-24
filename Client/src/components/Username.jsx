import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';//to use user input value
import { usernameValidate } from '../Helper/Validate';
import styles from '../Styles/Username.module.css';


const Username = () => {

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: usernameValidate,
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
                        <h4 className='text-5xl font-bold'> helo </h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Explore More By Connecting with us.
                        </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avatar} className={styles.profile_img} alt='avatar-img' />
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('username')} type='text' className={styles.textbox} placeholder='Username' />
                            <button className={styles.btn} type='submit'>Let's Go</button>
                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>Not a Member <Link className='text-red-500' to='/Register'>Register Now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Username