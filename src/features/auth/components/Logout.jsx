import { useDispatch, useSelector } from 'react-redux'
import { selectisLoggedInUser, setIsLoggedInUserNull } from '../authSlice';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function Logout() {
    const user = useSelector(selectisLoggedInUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoggedInUserNull());
    }, [dispatch])

    return (
        <div>{
            user ? <p>pleas waite</p> : <Navigate to={'/login'} replace={true}></Navigate>
        }
        </div>
    )
}

export default Logout