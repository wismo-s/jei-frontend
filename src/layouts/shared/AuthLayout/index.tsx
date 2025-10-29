import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type AuthLayoutProps = {
    children?: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    useEffect(() => {
        document.title = "JEI - ERP";
    }, []);

    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="h-dvh w-dvh flex justify-center items-center p-4 md:p-0">
            {children}
        </main>
    );
}
