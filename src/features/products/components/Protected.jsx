import React from 'react'
import { selectisLoggedInUser } from '../../auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Protected({ children }) {
    const user = useSelector(selectisLoggedInUser);
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    return (
        <>{children}</>
    )
}

export default Protected;