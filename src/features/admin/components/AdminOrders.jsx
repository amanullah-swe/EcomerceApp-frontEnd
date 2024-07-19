import Navbar from '../../navBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { fetchOrdersByFilterAsync, selectAllOrdersByAdmin, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';
import { Pegination } from '../../../components/Pagination.jsx'
import { ITEM_PER_PAGE } from '../../../app/constant';
import OrderRow from './OrderRow';
import debounce from 'lodash.debounce';

function AdminOrders() {
    const orders = useSelector(selectAllOrdersByAdmin);
    const totalOrders = useSelector(selectTotalOrders);
    const dispatch = useDispatch();

    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ _order: 'asc', _sort: null });

    const handleSort = useCallback(
        debounce((field) => {
            setSort((prevSort) => ({
                _sort: field,
                _order: prevSort._sort === field ? (prevSort._order === 'asc' ? 'desc' : 'asc') : 'asc',
            }));
            setPage(1);
        }, 300),
        []
    );

    const handleUpdate = (e, order) => {
        dispatch(updateOrderAsync({ ...order, orderStatus: e.target.value }));
        setEditableOrderId(-1);
    };

    useEffect(() => {
        const pagination = {
            _page: page,
            _limit: ITEM_PER_PAGE,
        };
        dispatch(fetchOrdersByFilterAsync({ sort, pagination })).catch((error) =>
            console.error('Error fetching orders:', error)
        );
    }, [dispatch, sort, page]);

    return (
        <Navbar>
            <section className="bg-white w-full h-full flex items-center">
                <div className="flex flex-wrap w-full">
                    <div className="w-full">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="text-center bg-gray-800">
                                    {['id', 'items', 'totalAmount', 'address', 'orderStatus'].map((field) => (
                                        <th
                                            key={field}
                                            className="w-1/10 text-lg font-semibold text-white border-l border-transparent"
                                            onClick={() => handleSort(field)}
                                            id={field}
                                        >
                                            {sort._sort === field && (
                                                sort._order === 'asc' ? (
                                                    <ArrowDownIcon className="w-4 m-0 inline" />
                                                ) : (
                                                    <ArrowUpIcon className="w-4 m-0 inline" />
                                                )
                                            )}
                                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </th>
                                    ))}
                                    <th className="w-1/10 text-lg font-semibold text-white border-l border-transparent">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&
                                    orders.map((order, index) => (
                                        <OrderRow
                                            key={order.id}
                                            order={order}
                                            index={index}
                                            editableOrderId={editableOrderId}
                                            setEditableOrderId={setEditableOrderId}
                                            handleUpdate={handleUpdate}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Pegination page={page} setPage={setPage} handlePage={setPage} totalItems={totalOrders} />
        </Navbar>
    );
}

export default AdminOrders;
