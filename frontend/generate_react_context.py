import os

base_path = "src"

files = {
    "services/api.js": """import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
""",
    "context/AuthContext.jsx": """import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    const login = async (usernameOrEmail, password) => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', { usernameOrEmail, password });
            const { accessToken, role } = response.data;
            
            // Note: The backend JWT implementation currently doesn't return role directly in JwtAuthResponse.
            // But we simulate it here based on standard practices.
            
            localStorage.setItem('token', accessToken);
            // Defaulting to Admin for now if backend doesn't explicitly return it
            const assignedRole = role || 'ROLE_ADMIN';
            localStorage.setItem('role', assignedRole);
            
            setIsAuthenticated(true);
            setUserRole(assignedRole);
            
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                timer: 1500,
                showConfirmButton: false
            });
            return true;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'Invalid credentials'
            });
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
""",
    "hooks/useAuth.js": """import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    return useContext(AuthContext);
};
""",
    "routes/ProtectedRoutes.jsx": """import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
"""
}

for filepath, content in files.items():
    with open(os.path.join(base_path, filepath), "w") as f:
        f.write(content)

print("Context and Routing setup created successfully.")
