import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const apiCalling = `https://sunsharm.runasp.net/api`
const AdminTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [tripToDelete, setTripToDelete] = useState(null);    
    const [pageMessage, setPageMessage] = useState({ text: "", type: "" }); 
    
    const navigate = useNavigate();
    const { token } = useAuth();

    const fetchTrips = () => {
        setIsLoading(true);
        fetch(`${apiCalling}/Trip/all`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(result => {
            if (result.succeeded) {
                setTrips(result.data);
            }
        })
        .catch(err => console.error("Error fetching trips:", err))
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchTrips();
    }, [token]);

    const handleDeleteClick = (id) => {
        setTripToDelete(id);
    };

    const confirmDelete = async () => {
        if (!tripToDelete) return;
        
        const id = tripToDelete;
        setTripToDelete(null);
        setPageMessage({ text: "", type: "" }); 

        try {
            const response = await fetch(`${apiCalling}/Trip/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
                setPageMessage({ text: "تم حذف الرحلة بنجاح.", type: "success" });
                
                setTimeout(() => {
                    setPageMessage({ text: "", type: "" });
                }, 3000);
            } else {
                setPageMessage({ text: "حدث خطأ أثناء محاولة حذف الرحلة.", type: "error" });
            }
        } catch (error) {
            setPageMessage({ text: "فشل الاتصال بالخادم. تأكد من الإنترنت.", type: "error" });
        }
    };

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#1a472a' }}>
                <i className="fa-solid fa-kaaba fa-bounce" style={{ fontSize: '40px', marginBottom: '15px', color: '#d4af37' }}></i>
                <h2>جاري تحميل الرحلات...</h2>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            
            {tripToDelete && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
                        width: '90%', maxWidth: '400px', textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)', borderTop: '5px solid #d32f2f'
                    }}>
                        <i className="fa-solid fa-circle-exclamation" style={{ fontSize: '50px', color: '#d32f2f', marginBottom: '15px' }}></i>
                        <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '20px' }}>تأكيد الحذف</h3>
                        <p style={{ color: '#666', marginBottom: '25px', fontSize: '15px', lineHeight: '1.5' }}>
                            هل أنت متأكد من أنك تريد حذف هذه الرحلة؟ لن تتمكن من التراجع عن هذا الإجراء.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button 
                                onClick={confirmDelete} 
                                style={{ flex: 1, padding: '12px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                            >
                                نعم، احذف الرحلة
                            </button>
                            <button 
                                onClick={() => setTripToDelete(null)} 
                                style={{ flex: 1, padding: '12px', backgroundColor: '#f0f0f0', color: '#444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <h2 style={{ color: '#1a472a', margin: '0 0 5px 0', fontSize: '28px', fontWeight: 'bold' }}>
                        <i className="fa-solid fa-plane-departure" style={{ color: '#d4af37', marginLeft: '10px' }}></i>
                        إدارة الرحلات
                    </h2>
                    <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>عرض وإدارة جميع برامج الحج والعمرة المتاحة في النظام</p>
                </div>
                
                <button 
                    onClick={() => navigate('/admin/add-trip')}
                    style={{ backgroundColor: '#1a472a', color: '#d4af37', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(26, 71, 42, 0.3)', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#13351f'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1a472a'; }}
                >
                    <i className="fa-solid fa-plus"></i> إضافة رحلة جديدة
                </button>
            </div>

            {pageMessage.text && (
                <div style={{
                    padding: "15px 20px", marginBottom: "25px", borderRadius: "8px", display: 'flex', alignItems: 'center', gap: '10px',
                    backgroundColor: pageMessage.type === "success" ? "#e8f5e9" : "#ffebee",
                    color: pageMessage.type === "success" ? "#2e7d32" : "#c62828",
                    border: `1px solid ${pageMessage.type === "success" ? "#a5d6a7" : "#ef9a9a"}`
                }}>
                    <i className={`fa-solid ${pageMessage.type === "success" ? 'fa-check-circle' : 'fa-triangle-exclamation'}`} style={{ fontSize: '18px' }}></i>
                    <strong style={{ fontSize: '15px' }}>{pageMessage.text}</strong>
                </div>
            )}

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        
                        <thead>
                            <tr style={{ backgroundColor: '#1a472a', color: '#fff' }}>
                                <th style={{ padding: '18px 20px', borderBottom: '4px solid #d4af37', fontWeight: 'bold', fontSize: '15px' }}>الصورة</th>
                                <th style={{ padding: '18px 20px', borderBottom: '4px solid #d4af37', fontWeight: 'bold', fontSize: '15px' }}>اسم الرحلة</th>
                                <th style={{ padding: '18px 20px', borderBottom: '4px solid #d4af37', fontWeight: 'bold', fontSize: '15px' }}>التاريخ</th>
                                <th style={{ padding: '18px 20px', borderBottom: '4px solid #d4af37', fontWeight: 'bold', fontSize: '15px' }}>المدة</th>
                                <th style={{ padding: '18px 20px', borderBottom: '4px solid #d4af37', fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>الإجراءات</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {trips.length > 0 ? trips.map((trip, index) => (
                                <tr 
                                    key={trip.id || index} 
                                    style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.2s', backgroundColor: index % 2 === 0 ? '#fff' : '#fcfcfc' }} 
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f8f4'} 
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#fcfcfc'}
                                >
                                    <td style={{ padding: '15px 20px', verticalAlign: 'middle' }}>
                                        <img 
                                            src={trip.imageUrl || "https://via.placeholder.com/80"} 
                                            alt={trip.name} 
                                            style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }}
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=No+Image" }}
                                        />
                                    </td>
                                    
                                    <td style={{ padding: '15px 20px', verticalAlign: 'middle', fontWeight: 'bold', color: '#1a472a', fontSize: '15px' }}>
                                        {trip.name}
                                    </td>
                                    
                                    <td style={{ padding: '15px 20px', verticalAlign: 'middle', color: '#555', fontWeight: '500' }}>
                                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString('ar-EG') : "غير محدد"}
                                    </td>
                                    
                                    <td style={{ padding: '15px 20px', verticalAlign: 'middle' }}>
                                        <span style={{ backgroundColor: '#f0f4f1', color: '#1a472a', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #d4ebd9' }}>
                                            {trip.durationDays} يوم
                                        </span>
                                    </td>
                                    
                                    <td style={{ padding: '15px 20px', verticalAlign: 'middle', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                            <button 
                                                onClick={() => navigate(`/admin/edit-trip/${trip.id}`)}
                                                style={{ backgroundColor: '#fcf6e3', color: '#b58500', border: '1px solid #f0e0b3', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f0e0b3'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcf6e3'; }}
                                            >
                                                <i className="fa-solid fa-pen"></i> تعديل
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleDeleteClick(trip.id)}
                                                style={{ backgroundColor: '#fceaea', color: '#d32f2f', border: '1px solid #fad4d4', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fad4d4'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fceaea'; }}
                                            >
                                                <i className="fa-solid fa-trash"></i> حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '50px', textAlign: 'center', color: '#888', fontSize: '16px' }}>
                                        <i className="fa-solid fa-folder-open" style={{ fontSize: '40px', color: '#ddd', display: 'block', marginBottom: '15px' }}></i>
                                        لا توجد رحلات مسجلة حالياً. قم بإضافة رحلة جديدة للبدء.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminTrips;