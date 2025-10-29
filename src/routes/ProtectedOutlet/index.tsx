import { useAuthStore } from "@store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedOutlet() {
    const { isAuthenticated, isHydrated } = useAuthStore((state) => state);

    if (!isAuthenticated && isHydrated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
