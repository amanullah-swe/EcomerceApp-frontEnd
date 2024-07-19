import React from 'react';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

function OrderRow({ order, index, editableOrderId, setEditableOrderId, handleUpdate }) {
    const handleEdit = () => {
        setEditableOrderId(index);
    };

    const handleShow = () => {
        console.log('show');
    };

    return (
        <tr>
            <td className="text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]">
                {order.id}
            </td>
            <td className="text-center text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-row mb-2 ml-5">
                        <div>
                            <img src={item.thumbnail} alt="" className="w-16 border-solid rounded mr-2" />
                        </div>
                        <div className="text-left">
                            <p>{item.title}</p>
                            <p className="text-sm text-black-500">
                                Qty: {item.quantity} ${item.price}
                            </p>
                        </div>
                    </div>
                ))}
            </td>
            <td className="text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]">
                ${order.totalAmount}
            </td>
            <td className="text-left text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                <div className="text-lg text-gray-900">
                    Name: {order.address.firstName + ' ' + order.address.lastName}
                </div>
                <div className="text-base text-gray-600">Email: {order.address.email}</div>
                <div className="text-base text-gray-600">
                    Address: {order.address.streetAddress}, {order.address.city},
                </div>
                <div className="text-base text-gray-600">
                    {order.address.pinCode}, {order.address.region}, {order.address.country}
                </div>
                <div className="text-base text-gray-600">Phone: {order.address.phone}</div>
            </td>
            <td className="text-center text-dark font-medium text-base py-5 bg-white border-b border-[#E8E8E8]">
                {editableOrderId === index ? (
                    <select onChange={(e) => handleUpdate(e, order)} defaultValue={order.orderStatus}>
                        <option value="">Choose</option>
                        <option value="pending">Pending</option>
                        <option value="cancel">Cancel</option>
                        <option value="dispatch">Dispatch</option>
                        <option value="delivered">Delivered</option>
                    </select>
                ) : (
                    <div>
                        {order.orderStatus === 'pending' && (
                            <div className="text-purple-700">{order.orderStatus}</div>
                        )}
                        {order.orderStatus === 'delivered' && (
                            <div className="text-green-700">{order.orderStatus}</div>
                        )}
                        {order.orderStatus === 'dispatch' && (
                            <div className="text-yellow-400">{order.orderStatus}</div>
                        )}
                        {order.orderStatus === 'cancel' && (
                            <div className="text-red-600">{order.orderStatus}</div>
                        )}
                    </div>
                )}
            </td>
            <td className="text-center text-dark font-medium text-base py-5 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                <div className="flex items-center justify-center">
                    <EyeIcon
                        className="w-6 mr-4 hover:text-purple-400 hover:scale-110 cursor-pointer"
                        onClick={handleShow}
                    />
                    <PencilIcon
                        className="w-6 hover:text-purple-400 hover:scale-110 cursor-pointer"
                        onClick={handleEdit}
                    />
                </div>
            </td>
        </tr>
    );
}

export default OrderRow;
