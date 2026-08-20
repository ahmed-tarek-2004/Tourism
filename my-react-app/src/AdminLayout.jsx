import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: '"Cairo", "Tajawal", sans-serif', direction: 'rtl' }}>
            
            <div style={{ backgroundColor: '#1a472a', padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
                <div 
                    onClick={() => navigate('/admin/trips')}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff', cursor: 'pointer' }}
                >
                    <i className="fa-solid fa-kaaba" style={{ color: '#d4af37', fontSize: '24px' }}></i>
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>إدارة الحج والعمرة</h1>
                </div>
                
                <button 
                    onClick={logout} 
                    style={{ backgroundColor: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.target.style.backgroundColor = '#d4af37'; e.target.style.color = '#1a472a'; }}
                    onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#d4af37'; }}
                >
                    تسجيل الخروج <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>

            <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Outlet />
            </div>

        </div>
    );
};

export default AdminLayout;