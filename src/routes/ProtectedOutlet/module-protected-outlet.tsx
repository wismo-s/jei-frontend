import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/authStore";

type Props = {
    redirectTo?: string;
};

// Ruta protegida para módulos (sin validación de permisos)
export function ModuleProtectedRoute({ redirectTo = "/login" }: Props) {
    const { isHydrated, isAuthenticated } = useAuthStore((state) => state);

    if (isHydrated && !isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}

// Ruta protegida para submódulos (sin validación de permisos)
export function SubModuleProtectedRoute({ redirectTo = "/login" }: Props) {
    const { isAuthenticated } = useAuthStore((state) => state);

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}
