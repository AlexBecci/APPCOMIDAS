import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkSession } from '../../auth/CheckSession';

export function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verifySession = async () => {
            const sessionValid = await checkSession();
            setIsAuthenticated(sessionValid);
        };
        verifySession();
    }, []);

    if (isAuthenticated === null) {
        // Puedes mostrar un loader mientras se verifica la sesión
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
