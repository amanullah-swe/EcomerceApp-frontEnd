import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice';
// eslint-disable-next-line react/prop-types
function Protected({ children }) {
    const userRole = localStorage.getItem("userRole");
    if (!userRole) {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    if (userRole !== "admin") {
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    return (
        <>{children}</>
    )
}

export default Protected;