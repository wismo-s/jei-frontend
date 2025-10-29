import { Navigate } from "react-router-dom";

export default function LogoutPage() {
    const authData = localStorage.getItem("authData");
    if (authData) {
        localStorage.removeItem("authData");
    }
    return <Navigate to="/login" replace />;
}
