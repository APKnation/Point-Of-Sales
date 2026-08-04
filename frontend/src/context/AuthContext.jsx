import React, { createContext, useState, useEffect } from 'react';
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
