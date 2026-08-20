import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://sunsharm.runasp.net/api/Account/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok && result.succeeded && result.data) {
                if (result.data.role !== 'admin') {
                    setError('عذراً، هذا الحساب لا يملك صلاحيات الإدارة.');
                    setIsLoading(false);
                    return;
                }
                login(result.data.accessToken);
            } else {
                setError(result.detail || result.message || 'بيانات الدخول غير صحيحة.');
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال بالخادم. تأكد من اتصالك بالإنترنت.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: 'linear-gradient(rgba(17, 34, 25, 0.75), rgba(17, 34, 25, 0.85)), url("https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
            fontFamily: '"Cairo", "Tajawal", "Segoe UI", sans-serif', direction: 'rtl'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.97)', padding: '40px 35px', borderRadius: '16px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)', width: '100%', maxWidth: '420px',
                borderTop: '6px solid #d4af37', backdropFilter: 'blur(10px)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ width: '70px', height: '70px', backgroundColor: '#1a472a', color: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '30px', boxShadow: '0 4px 10px rgba(26, 71, 42, 0.3)' }}>
                        <i className="fa-solid fa-kaaba"></i>
                    </div>
                    <h2 style={{ color: '#1a472a', margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>إدارة الحج والعمرة</h2>
                    <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>سجل دخولك للوصول إلى لوحة تحكم الرحلات</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#1a472a', fontWeight: 'bold', fontSize: '14px' }}>البريد الإلكتروني</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fa-solid fa-envelope" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0a0a0' }}></i>
                            <input type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px 40px 12px 15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '15px', boxSizing: 'border-box', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#1a472a'} onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: '#1a472a', fontWeight: 'bold', fontSize: '14px' }}>كلمة المرور</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fa-solid fa-lock" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0a0a0' }}></i>
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px 40px 12px 15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '15px', boxSizing: 'border-box', transition: 'border-color 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#1a472a'} onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                        </div>
                    </div>

                    {error && (
                        <div style={{ backgroundColor: '#fff3f3', color: '#d32f2f', padding: '10px', borderRadius: '8px', fontSize: '13px', border: '1px solid #ffcdd2', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-circle-exclamation"></i> {error}
                        </div>
                    )}
                    
                    <button type="submit" disabled={isLoading} style={{ padding: '14px', backgroundColor: '#1a472a', color: '#d4af37', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', opacity: isLoading ? 0.8 : 1, boxShadow: '0 4px 15px rgba(26, 71, 42, 0.4)' }}>
                        {isLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> جاري الدخول...</> : <><i className="fa-solid fa-arrow-left"></i> تسجيل الدخول</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;