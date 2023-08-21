import React from 'react'
import { useFormik } from 'formik';
import { registerSchema } from '../../../schema/yupValidationSchema';
import { createUserAsync, selectisLoggedInUser } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux'
function Register() {

    const dispatch = useDispatch();
    const { handleChange, handleSubmit, handleBlur, errors, values } = useFormik({
        initialValues: { name: '', email: '', password: '', },
        validationSchema: registerSchema,
        onSubmit: values => {
            dispatch(createUserAsync(values))
            console.log(values);
        },
    });
    return (
        <div><div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name ? <p className='text-red-500'>{errors.name}</p> : null}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                id="email"
                                name="email"
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email ? <p className='text-red-500'>{errors.email}</p> : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                id="password"
                                name="password"
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password ? <p className='text-red-500'>{errors.password}</p> : null}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    I have already account{' '}
                    <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        sign in
                    </a>
                </p>
            </div>
        </div></div>
    )
}

export default Register