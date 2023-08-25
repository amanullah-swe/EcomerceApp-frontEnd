import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { deleteCartItemByIdAsync, selectCartItems, updateCartItemByIdAsync } from '../features/cart/cartSlice';
import { StarIcon } from '@heroicons/react/24/outline';

import { useFormik } from 'formik';
import { addressFormSchema } from '../schema/yupValidationSchema';
import { useState } from 'react';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';




export default function CheckoutPage() {
    // shoping cart
    const items = useSelector(selectCartItems);
    const totalAmount = items.reduce((totalAmount, item) => (item.quantity * item.price + totalAmount), 0);
    const totalQuantity = items.reduce((Quantity, item) => (item.quantity + Quantity), 0);
    const currentOrder = useSelector(selectCurrentOrder);

    const dispatch = useDispatch();

    const handleQuantity = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        const quantity = +e.target.value;
        dispatch(updateCartItemByIdAsync({ ...item, quantity }))
    }

    const handleRemoveCartItem = (e, itemId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteCartItemByIdAsync(itemId));
    }

    // checkout logic

    const user = useSelector(selectUserInfo);

    const [addressSelected, setAddressSelected] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleAdresses = (e, address) => {
        e.stopPropagation();
        setAddressSelected(address);
    };
    const handlePayments = (e) => {
        e.stopPropagation();
        setPaymentMethod(e.target.id)
    }
    const { handleChange, handleReset, handleBlur, handleSubmit, errors, touched, values } = useFormik({
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
            console.log(values, "HI");
            let addresses;
            if (user.addresses) {
                addresses = [...user.addresses];
                addresses.push(values);
            } else {
                addresses = [values]
            }

            dispatch(updateUserAsync({ ...user, addresses }));

        },
    });
    const handleOrder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (paymentMethod && addressSelected) {
            const order = { items, totalQuantity, totalAmount, user, paymentMethod, address: addressSelected, orderStatus: 'pendding' };
            dispatch(createOrderAsync(order));

        }
        else {
            console.log('select Adress and payment method');
        }

        // TODO
        // change the stock in the backend
        // 3 clear cart
    }

    return (
        <>   {!items.length ? <Navigate to='/' replace={true}></Navigate> : null}
            {currentOrder ? <Navigate to='/order-succes' replace={true}></Navigate> : null}
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-5 grid-flow-row gap-3">
                    {/* Personal Information Section */}
                    <div className="w-full col-span-3 bg-white p-4 sm:width-100 shadow-xl">
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information Fields */}
                            <div className="space-y-12">


                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                                            onClick={handleReset}
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
                        {/* Address Selection Section */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Adress</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Choose one Adress for delivery
                            </p>
                            <div className="mt-10 space-y-10">
                                <ul className="divide-y divide-gray-100 my-2">
                                    {user.addresses && user.addresses.map((address, index) => (
                                        <li key={index} className={`flex justify-between py-5 border-gray-300 border-1 px-2 mb-2`}>
                                            <div className="flex gap-x-4">
                                                <div>
                                                    <input
                                                        onChange={(e) => handleAdresses(e, address)}
                                                        id={address.email}
                                                        name="adresses"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.firstName + '  ' + address.lastName}</p>
                                                    <p className="truncate text-xs leading-5 text-gray-500">{address.streetAddress}</p>
                                                    <p className="truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <p className="text-xs leading-5 text-gray-500">{address.city}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Payment Method Selection */}
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">Choose Payment Method</legend>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="cash"
                                                name="PaymentMethods"
                                                onChange={handlePayments}
                                                defaultChecked={paymentMethod === 'cash'}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="card"
                                                name="PaymentMethods"
                                                onChange={handlePayments}
                                                defaultChecked={paymentMethod === 'card'}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                Card
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="upi"
                                                name="PaymentMethods"
                                                onChange={handlePayments}
                                                defaultChecked={paymentMethod === 'upi'}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="upi" className="block text-sm font-medium leading-6 text-gray-900">
                                                UPI
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    {/* Shopping Cart Section */}
                    <div className="w-full col-span-2 px-3">
                        <div className="flex  flex-col overflow-y-hidden bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-0 py-6 sm:px-2">
                                <div className="flex items-start justify-between">
                                    <h1 className="text-lg font-medium text-gray-900">Summary</h1>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {items.map((item) => (
                                                <li key={item.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={item.href}>{item.title}</a>
                                                                </h3>
                                                                <p className="ml-4">$ {item.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500"><StarIcon className='w-4 inline mr-1' />{item.rating}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty
                                                                <select name="" id="" className='p-1' onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                                    <option id="1" className='p-2'>1</option>
                                                                    <option id="2" className='p-2'>2</option>
                                                                    <option id="3" className='p-2'>3</option>
                                                                    <option id="4" className='p-2'>4</option>
                                                                    <option id="5" className='p-2'>5</option>
                                                                </select></p>
                                                            <div className="flex">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={(e) => handleRemoveCartItem(e, item.id)}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                                    <p>Total items </p>
                                    <p>{totalQuantity} items</p>
                                </div>

                                {/* <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                                <div className="mt-6 cursor-pointer">
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Payment and Order
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <Link to={'/'}>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}  
