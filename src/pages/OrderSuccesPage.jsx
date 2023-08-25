import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { selectCurrentOrder, setCurrentOrderNull } from "../features/order/orderSlice"
import { deleteCartAllItemsAsync } from "../features/cart/cartSlice";
import { selectUserInfo } from "../features/user/userSlice";

function OrderSuccesPage() {
    const currentOrder = useSelector(selectCurrentOrder);
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    useEffect(() => {
        dispatch(deleteCartAllItemsAsync(user.id));
        return () => {
            dispatch(setCurrentOrderNull());
        }
    }, [dispatch, user])
    return (
        <>{currentOrder?.id ?
            <main className="grid min-h-screen  place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Order succesfully placed</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Id #{currentOrder.id}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Go to My account / My orders to see orders</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
            :
            <Navigate to={'/'} replace={true}></Navigate>}
        </>
    )
}

export default OrderSuccesPage