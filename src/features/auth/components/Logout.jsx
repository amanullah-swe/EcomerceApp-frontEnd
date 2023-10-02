import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectAuthMessage, selectisLoggedInUser, setIsLoggedInUserNull } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';




function Logout() {
    const user = useSelector(selectisLoggedInUser);
    const message = useSelector(selectAuthMessage);
    const [cookies, removeCookie] = useCookies(['token']);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoggedInUserNull());
        dispatch(logoutUserAsync());
        if (message?.success) {
            window.location.href = '/'
        }
    }, [dispatch, message])

    return (
        <div>
            <p>pleas waite</p>
        </div >
    )
}

export default Logout