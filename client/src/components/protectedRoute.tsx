import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './checkIfAuth';
import Loading from './loading';

interface ProtectedRouteProps {
    children?: React.ReactNode;  // Make children optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch();
    const [isLoggedin, SetisLoggedIn] = useState(false);
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuth = await checkAuth(dispatch);
            if (!isAuth) {
                setShouldRedirect(true);
            }
        };

        verifyAuth();
        SetisLoggedIn(true);
    }, [dispatch, location]);

    if (shouldRedirect) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!isLoggedin) {
        return <Loading />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;