import { useDispatch, useSelector } from "react-redux"
import { fetchLoddInUserAsync, selectUserError, selectUserInfo, updateUserAsync } from "../userSlice";
import { addressFormSchema } from "../../../schema/yupValidationSchema";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

function UserProfile() {
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const userError = useSelector(selectUserError);

    const [showForm, setShowForm] = useState(-2);
    useEffect(() => {
        dispatch(fetchLoddInUserAsync());
    }, [dispatch]);

    const { handleChange, handleReset, handleBlur, resetForm, setValues, handleSubmit, errors, touched, values } = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            pinCode: '',
            country: '',
            streetAddress: '',
            city: '',
            region: '',
            phone: ''
        },
        validationSchema: addressFormSchema,
        onSubmit: values => {
            if (showForm >= 0) {
                let newAddresses = [...user.addresses];
                newAddresses[showForm] = { ...values };
                dispatch(updateUserAsync({ ...user, addresses: newAddresses }));
                handleReset();
            } else if (showForm == -1) {
                let newAddresses = [...user.addresses];
                newAddresses.push(values);
                dispatch(updateUserAsync({ ...user, addresses: newAddresses }));
                AddedAddressSucces();
            } else {
                console.log('some thing wrong');
            }
            resetForm();
        },
    });
    const handleEditeAddress = (e, index) => {
        e.preventDefault()
        e.stopPropagation();
        setShowForm(index);
        const address = user.addresses[index];
        setValues(address);
    }

    const handleRemoveAddress = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let newAddresses = [...user.addresses];
        newAddresses.splice(showForm, 1);
        console.log(newAddresses);
        dispatch(updateUserAsync({ ...user, addresses: newAddresses }));
        removeAddressSucces();
    }

    const removeAddressSucces = () => toast.success('Removed Succesfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
    });

    const AddedAddressSucces = () => toast.success('Added Succesfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
    });
    return (
        <>
            {/* Shopping Cart Section */}
            {userError ? <Navigate to='/login' replace={true}></Navigate> : null}
            <div className="w-full col-span-2 px-3">
                <ToastContainer />
                <div className="flex  flex-col overflow-y-hidden bg-white shadow-xl px-4">
                    <div className="flex-1 overflow-y-auto px-0 py-6 sm:px-2">
                        <div className="flex items-start justify-between">
                            <h1 className="text-3xl font-medium text-gray-900">My profile</h1>
                        </div>

                        <div className="mt-8">
                            <h1 className="text-lg font-medium text-gray-900">Name : {user.name}</h1>
                            <h1 className="text-lg font-medium text-gray-900">Email : {user.email}</h1>
                            {user.role === "admin" && <h1 className="text-base font-medium text-gray-900">Role : {user.role}</h1>}
                        </div>
                    </div>
                    {/* form section  */}
                    {showForm > -2 && <form onSubmit={handleSubmit}>
                        {/* Personal Information Fields */}
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.firstName}
                                                onBlur={handleBlur}
                                                type="text"
                                                name="firstName"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.firstName && touched.firstName ? errors.firstName : null}</p>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.lastName}
                                                onBlur={handleBlur}
                                                type="text"
                                                name="lastName"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.lastName && touched.lastName ? errors.lastName : null}</p>

                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.email && touched.email ? errors.email : null}</p>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.phone}
                                                onBlur={handleBlur}
                                                id="phone"
                                                name="phone"
                                                type="phone"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.phone && touched.phone ? errors.phone : null}</p>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                onChange={handleChange}
                                                value={values.country}
                                                onBlur={handleBlur}
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                                <option>India</option>
                                                <option>United Kingdom</option>
                                            </select>
                                        </div>
                                        <p className='text-red-500'>{errors.country && touched.country ? errors.country : null}</p>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.streetAddress}
                                                onBlur={handleBlur}
                                                type="text"
                                                name="streetAddress"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.streetAddress && touched.streetAddress ? errors.streetAddress : null}</p>

                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.city}
                                                onBlur={handleBlur}
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.city && touched.city ? errors.city : null}</p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.region}
                                                onBlur={handleBlur}
                                                type="text"
                                                name="region"
                                                id="region"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.region && touched.region ? errors.region : null}</p>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                            Pin code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                onChange={handleChange}
                                                value={values.pinCode}
                                                onBlur={handleBlur}
                                                type="number"
                                                name="pinCode"
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <p className='text-red-500'>{errors.pinCode && touched.pinCode ? errors.pinCode : null}</p>
                                    </div>
                                </div>

                                <div className="mt-14 flex items-center justify-end gap-x-6 ">
                                    <button type="button"
                                        onClick={() => { handleReset(); setShowForm(-2) }}
                                        className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                    }
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {showForm == -2 && <button className="mt-4 mb-10 cursor-pointer"
                            onClick={() => setShowForm(-1)}>
                            <div
                                className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                            >
                                Add Addresses
                            </div>
                        </button>
                        }
                        {/* Address Selection Section */}
                        <div className="border-b border-gray-900/10 pb-0" >
                            <h1 className="text-2xl font-semibold leading-7 text-gray-900">Addresses</h1>
                            <div className="mt-5 space-y-10">
                                <ul className="divide-y divide-gray-100 my-2">
                                    {user.addresses && user.addresses.map((address, index) => (
                                        <li key={index} className={`flex justify-between py-5 border-gray-300 border-1 px-2 mb-2`}>
                                            <div className="flex gap-x-4">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName + '  ' + address.lastName}</p>
                                                    <p className="truncate text-xs leading-5 text-gray-500">{address.streetAddress}</p>
                                                    <p className="truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                </div>
                                            </div>
                                            <div className=" shrink-0 sm:flex sm:flex-row gap-4 ">
                                                <div>
                                                    <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                                                    <div className="mt-1 flex items-center gap-x-1.5">
                                                        <p className="text-xs leading-5 text-gray-500">{address.city}, {address.country}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={(e) => handleRemoveAddress(e, index)}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500 mb-3"
                                                    >
                                                        Remove
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleEditeAddress(e, index)}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile