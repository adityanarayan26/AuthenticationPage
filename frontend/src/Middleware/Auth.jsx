import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};


const UnauthRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export { AuthRoute, UnauthRoute };
