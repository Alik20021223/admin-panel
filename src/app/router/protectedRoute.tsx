import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => {
            const cached = localStorage.getItem("auth_check");
            const parsed = cached ? JSON.parse(cached) : null;
            setAuth(parsed?.status === true);
        };

        check(); // стартовая проверка

        window.addEventListener("auth_check_changed", check);
        return () => window.removeEventListener("auth_check_changed", check);
    }, []);

    if (auth === null) return null;
    return auth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;