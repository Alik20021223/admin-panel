import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const cached = localStorage.getItem("auth_check");
            try {
                const parsed = cached ? JSON.parse(cached) : null;
                setAuth(parsed?.status === true);
            } catch {
                setAuth(false);
            }
        };

        checkAuth(); // начальная проверка

        window.addEventListener("auth_check_changed", checkAuth);
        return () => window.removeEventListener("auth_check_changed", checkAuth);
    }, []);

    if (auth === null) return null;
    return auth ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;
