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

            // التحقق من نجاح الطلب بناءً على الـ Response الخاص بك
            if (response.ok && result.succeeded && result.data) {
                
                // (اختياري) التأكد من أن المستخدم يحمل رتبة admin
                if (result.data.role !== 'admin') {
                    setError('عذراً، هذا الحساب لا يملك صلاحيات الإدارة.');
                    setIsLoading(false);
                    return;
                }

                // تمرير الـ accessToken لدالة الـ login
                login(result.data.accessToken);

            } else {
                // التعامل مع الأخطاء (مثل الرد الخاص بـ Validation Failed)
                setError(result.detail || result.message || 'بيانات الدخول غير صحيحة.');
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال بالخادم.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>تسجيل الدخول للإدارة</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" 
                    placeholder="البريد الإلكتروني" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="password" 
                    placeholder="كلمة المرور" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {error && <p style={{ color: 'red', fontSize: '14px', margin: '0' }}>{error}</p>}
                
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: isLoading ? '#ccc' : '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isLoading ? 'جاري الدخول...' : 'دخول'}
                </button>
            </form>
        </div>
    );
};

export default Login;