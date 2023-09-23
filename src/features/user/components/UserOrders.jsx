import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserOrdersAsync, selectUserError, selectUserOrders } from '../userSlice';
import { StarIcon } from '@heroicons/react/24/outline';
import { Navigate } from 'react-router-dom';
function UserOrders() {

    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);
    const userError = useSelector(selectUserError);
    useEffect(() => {
        dispatch(fetchUserOrdersAsync());
    }, [dispatch])
    return (
        <div >
            {userError ? <Navigate to='/login' replace={true}></Navigate> : null}
            {
                orders?.map(order => {
                    {/* orders section  */ }
                    return <>
                        <div className="w-full col-span-2 px-4 mb-4" key={order.id}>
                            <div className="flex  flex-col overflow-y-hidden bg-white shadow-xl">
                                <div className="flex-1 px-2 py-2 sm:px-2">
                                    <div className="flex items-start justify-between flex-col">
                                        <h1 className="text-3xl font-medium text-gray-900 mb-3">order #{order.id}</h1>
                                        <h1 className="text-xl font-medium text-red-900 ml-2">order status : {order.orderStatus}</h1>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {order.items?.map((item) => (
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
                                                                <p className="text-gray-500">Qty {item.quantity}</p>
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
                                        <p>${order.totalAmount}</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900 my-2">
                                        <p>Total items </p>
                                        <p>{order.totalQuantity} items</p>
                                    </div>
                                </div>
                                <h1 className="text-lg font-medium text-black-900 ml-2 mb-2">Payment Method : {order.paymentMethod}</h1>

                                {/* Address section */}
                                <div className="border-b border-gray-900/10">
                                    <div className="mt-0 px-2 ">
                                        <h1 className="text-lg font-medium text-gray-900 mb-2">Shipping Address</h1>
                                        <ul className="divide-y divide-gray-100 my-0  border-gray-300 border-2 mb-2">
                                            <li key={order.address.email} className={`flex justify-between py-3 border-gray-300 border-1 mb-2 mx-2`}>
                                                <div className="flex gap-x-4">
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.address.firstName + '  ' + order.address.lastName}</p>
                                                        <p className="truncate text-xs leading-5 text-gray-500">{order.address.streetAddress}</p>
                                                        <p className="truncate text-xs leading-5 text-gray-500">{order.address.pinCode}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Phone: {order.address.phone}</p>
                                                    <div className="mt-1 flex items-center gap-x-1.5">
                                                        <p className="text-xs leading-5 text-gray-500">{order.address.city}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                })
            }</div>
    )
}

export default UserOrders;