import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    const navigate = useNavigate();

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('adminToken', newToken);
        navigate('/admin/trips'); 
    };

    const logout = async () => {
        if (token) {
            try {
                await fetch('https://sunsharm.runasp.net/api/Account/logout', {
                    method: 'POST', 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error("فشل الاتصال بالخادم أثناء تسجيل الخروج:", error);
            }
        }

        setToken(null);
        localStorage.removeItem('adminToken');
        navigate('/admin/login'); 
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);