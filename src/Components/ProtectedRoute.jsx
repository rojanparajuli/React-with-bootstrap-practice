import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    console.log(isAuthenticated, "hello")
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
