import Navbar from '../../navBar/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { fetchOrdersByFilterAsync, selectAllOrdersByAdmin, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';
import { Pegination } from '../../../components/Pagination';
import { ITEM_PER_PAGE } from '../../../app/constant';

function AdminOrders() {
    const orders = useSelector(selectAllOrdersByAdmin);
    const totalOrders = useSelector(selectTotalOrders);
    const dispatch = useDispatch();

    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ _order: 'asc', _sort: '' });
    const handleShow = (index) => {
        console.log('show');

    }

    const handelEdite = (index) => {
        setEditableOrderId(index);
    }
    const handleUpdate = (e, order) => {
        dispatch(updateOrderAsync({ ...order, orderStatus: e.target.value }));
        setEditableOrderId(-1);

    }

    const handlePage = (e, page) => {
        e.stopPropagation()
        setPage(page);
    }

    const handleSort = (e) => {
        const filde = e.target.id;
        let newSort;

        // note _sort Is fild name and _order Is value it may assending=asc or descending=desc this server featur
        if (sort._sort === filde) {
            newSort = {
                _sort: filde,
                _order: sort._order === "asc" ? "desc" : "asc"
            }
        } else {
            newSort = {
                ...sort,
                _sort: filde
            }
        }

        setSort(newSort);
        setPage(1);
    }
    useEffect(() => {
        const pagination = {
            _page: page,
            _limit: ITEM_PER_PAGE
        }
        dispatch(fetchOrdersByFilterAsync({ sort, pagination }))
    }, [dispatch, sort, page])
    return (
        <Navbar>
            <section className="bg-white w-full h-full flex items-center">
                <div className="flex flex-wrap w-full  ">
                    <div className="w-full">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="text-center bg-gray-800">
                                    <th
                                        className="w-1/10 text-lg font-semibold  text-white border-l border-transparent "
                                        onClick={handleSort}
                                        id='id'
                                    >
                                        {sort._sort === 'id' && (sort._order === 'asc' ? <ArrowDownIcon className='w-4 m-0 inline' /> : <ArrowUpIcon className='w-4 m-0 inline' />)}Order id
                                    </th>

                                    <th
                                        className="w-1/3 text-lg font-semibold text-white "
                                        onClick={handleSort}
                                        id='items'
                                    >
                                        {sort._sort === 'items' && (sort._order === 'asc' ? <ArrowDownIcon className='w-4 m-0 inline' /> : <ArrowUpIcon className='w-4 m-0 inline' />)}
                                        Items</th>

                                    <th
                                        className="w-1/10 text-lg font-semibold text-white "
                                        onClick={handleSort}
                                        id='totalAmount'
                                    >
                                        {sort._sort === 'totalAmount' && (sort._order === 'asc' ? <ArrowDownIcon className='w-4 m-0 inline' /> : <ArrowUpIcon className='w-4 m-0 inline' />)}
                                        Total amount</th>

                                    <th
                                        className="w-1/3 text-lg font-semibold text-white "
                                        onClick={handleSort}
                                        id='address'
                                    >
                                        {sort._sort === 'address' && (sort._order === 'asc' ? <ArrowDownIcon className='w-4 m-0 inline' /> : <ArrowUpIcon className='w-4 m-0 inline' />)}
                                        shipping address
                                    </th>

                                    <th
                                        className="w-1/10 text-lg font-semibold text-white "
                                        onClick={handleSort}
                                        id='orderStatus'
                                    >
                                        {sort._sort === 'orderStatus' && (sort._order === 'asc' ? <ArrowDownIcon className='w-4 m-0 inline' /> : <ArrowUpIcon className='w-4 m-0 inline' />)}
                                        Status</th>

                                    <th className="w-1/10 text-lg font-semibold text-white  border-l border-transparent ">actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {orders.map((order, index) => {
                                    return <tr key={index}>
                                        <td className="text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]">{order.id}</td>

                                        <td className="text-center text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">{
                                            order.items.map((item, index) => {
                                                return <div key={index} className='flex flex-row mb-2 ml-5'>
                                                    <div><img src={item.thumbnail} alt="" className='w-16 border-solid rounded mr-2' /></div>
                                                    <div className='text-left'>
                                                        <p >{item.title}</p>
                                                        <p className='text-sm text-black-500'>Qty : {item.quantity} ${item.price}</p>
                                                    </div>
                                                </div>
                                            })
                                        }</td>

                                        <td className="text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]">${order.totalAmount}</td>
                                        <td className="text-left text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                            <div className='text-lg text-gray-900'>Name: {order.address.firstName + ' ' + order.address.lastName}</div>
                                            <div className='text-base text-gray-600'>Email: {order.address.email}</div>
                                            <div className='text-base text-gray-600'>Address: {order.address.streetAddress}, {order.address.city},</div>
                                            <div className='text-base text-gray-600'> {order.address.pinCode}, {order.address.region}, {order.address.country}</div>
                                            <div className='text-base text-gray-600'>Phone: {order.address.phone}</div>
                                            {/* "address": {
                                                "email": "sarfarazaman38@gmail.com",
                                            "firstName": "amanullah",
                                            "lastName": "shaikh",
                                            "pinCode": 431001,
                                            "country": "India",
                                            "streetAddress": "aurangabad, sillod",
                                            "city": "aurangabad",
                                            "region": "maharashtra",
                                            "phone": "8767837923"
                                            }, */}
                                        </td>
                                        <td className='text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]'>
                                            {editableOrderId === index ?
                                                <select onChange={(e) => handleUpdate(e, order)}>
                                                    <option value="">choose</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="cancel">Cancell</option>
                                                    <option value="dispatch">Dispatch</option>
                                                    <option value="delivered">Delivered</option>

                                                </select>
                                                : <div>
                                                    {order.orderStatus === 'pending' && <div className="text-purple-700 ">{order.orderStatus} </div>}
                                                    {order.orderStatus === 'delivered' && <div className="text-green-700 ">{order.orderStatus} </div>}
                                                    {order.orderStatus === 'dispatch' && <div className="text-yellow-400 ">{order.orderStatus} </div>}
                                                    {order.orderStatus === 'cancel' && <div className="text-red-600 ">{order.orderStatus} </div>}

                                                </div>
                                            }
                                        </td>
                                        <td className="text-center text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                            <div className='flex items-center justify-center'>
                                                <EyeIcon
                                                    className=' w-6 mr-4 hover:text-purple-400 hover:scale-110 '
                                                    onClick={handleShow} />
                                                <PencilIcon
                                                    className=' w-6  hover:text-purple-400 hover:scale-110'
                                                    onClick={() => handelEdite(index)} />
                                            </div>
                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
            <Pegination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />
        </Navbar>
    )
}

export default AdminOrders