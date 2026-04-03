import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {
    const token = localStorage.getItem("token")

    // Agar user login hai → dashboard redirect
    if (token) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default PublicRoute