import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { loginSchema } from '../../../schema/yupValidationSchema';
import { checkUserAsync, selectError, selectisLoggedInUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCartItemsByUserIdAsync } from '../../cart/cartSlice';
import { fetchLoddInUserAsync } from '../../user/userSlice';


function Login() {
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    // const params = useParams();
    // const { email, password } = params;
    const email = query.get("email");
    const password = query.get("password")
    console.log("checking for the params =====", query);
    const error = useSelector(selectError);
    const user = useSelector(selectisLoggedInUser);
    const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
        initialValues: { email: email ? email : "", password: password ? password : "" },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(checkUserAsync(values));
            error && loginError();
        },
    });

    useEffect(() => {
        return () => {
            dispatch(fetchCartItemsByUserIdAsync());
            dispatch(fetchLoddInUserAsync());
        }
    }, [])
    const loginError = () => toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
    });
    return (
        <div>
            {user ? <Navigate to='/'></Navigate> : null}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <ToastContainer limit={1} />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2 ">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && touched.email ? <p className='text-red-500'>{errors.email}</p> : null}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.password && touched.password ? <p className='text-red-500'>{errors.password}</p> : null}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        New to site{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login