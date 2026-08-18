import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminTrips = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, tripId: null });
  const [actionMessage, setActionMessage] = useState({ text: "", type: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('https://sunsharm.runasp.net/api/Trip/all');
      const result = await response.json();
      if (result.succeeded && result.data) {
        setTrips(result.data);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerDelete = (id) => {
    setDeleteModal({ isOpen: true, tripId: id });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, tripId: null });
  };

  const confirmDelete = async () => {
    const id = deleteModal.tripId;
    setIsDeleting(true);
    setActionMessage({ text: "", type: "" });

    try {
      const response = await fetch(`https://sunsharm.runasp.net/api/Trip/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTrips(trips.filter(trip => trip.id !== id));
        setActionMessage({ text: "تم حذف الرحلة بنجاح.", type: "success" });
        setDeleteModal({ isOpen: false, tripId: null }); // إغلاق النافذة
        
        setTimeout(() => setActionMessage({ text: "", type: "" }), 3000);
      } else {
        setDeleteModal({ isOpen: false, tripId: null });
        setActionMessage({ text: "حدث خطأ أثناء محاولة الحذف.", type: "error" });
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      setDeleteModal({ isOpen: false, tripId: null });
      setActionMessage({ text: "حدث خطأ في الاتصال بالخادم.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="section light-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2>إدارة <strong>الرحلات</strong></h2>
          <Link to="/admin/add-trip" className="btn btn-primary">
            + إضافة رحلة جديدة
          </Link>
        </div>

        {actionMessage.text && (
            <div style={{
                padding: "15px 20px",
                marginBottom: "20px",
                borderRadius: "10px",
                backgroundColor: actionMessage.type === "success" ? "var(--primary-light)" : "#ffebee",
                color: actionMessage.type === "success" ? "var(--primary)" : "#c62828",
                border: `1px solid ${actionMessage.type === "success" ? "var(--primary)" : "#ef9a9a"}`,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}>
                <i className={`fa-solid ${actionMessage.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`}></i>
                {actionMessage.text}
            </div>
        )}

        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '50px' }}>جاري تحميل الرحلات...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <thead style={{ background: 'var(--primary)', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '15px', textAlign: 'right' }}>الصورة</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>اسم الرحلة</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>التاريخ</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>المدة</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '15px' }}>
                      <img src={trip.imageUrl} alt={trip.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: 'var(--dark)' }}>{trip.name}</td>
                    <td style={{ padding: '15px', color: 'var(--text)' }}>{new Date(trip.startDate).toLocaleDateString('ar-EG')}</td>
                    <td style={{ padding: '15px', color: 'var(--text)' }}>{trip.durationDays} يوم</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <Link to={`/admin/edit-trip/${trip.id}`} className="btn btn-outline" style={{ background: 'var(--gold-light)', color: 'var(--gold)', borderColor: 'var(--gold-light)', minHeight: '40px', padding: '0 15px', marginLeft: '10px' }}>
                        تعديل
                      </Link>
                      <button onClick={() => triggerDelete(trip.id)} className="btn btn-outline" style={{ background: '#ffebee', color: '#c62828', borderColor: '#ffebee', minHeight: '40px', padding: '0 15px' }}>
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
                
                {trips.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                      لا توجد رحلات مضافة حالياً.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* =========================================
         MODAL نافذة تأكيد الحذف المنبثقة
      ========================================= */}
      {deleteModal.isOpen && (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
        }}>
            <div style={{
                background: '#fff',
                padding: '35px 30px',
                borderRadius: '20px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
                transform: 'translateY(0)',
                animation: 'slideUp 0.3s ease'
            }}>
                <div style={{ fontSize: '45px', color: '#c62828', marginBottom: '15px' }}>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h3 style={{ color: 'var(--dark)', marginBottom: '10px', fontSize: '22px' }}>تأكيد الحذف</h3>
                <p style={{ color: 'var(--text)', marginBottom: '30px', fontSize: '14px', lineHeight: '1.8' }}>
                    هل أنت متأكد من رغبتك في حذف هذه الرحلة نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button
                        onClick={confirmDelete}
                        disabled={isDeleting}
                        style={{
                            padding: '12px 20px',
                            borderRadius: '10px',
                            background: '#c62828',
                            color: '#fff',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            flex: 1,
                            opacity: isDeleting ? 0.7 : 1
                        }}
                    >
                        {isDeleting ? 'جاري الحذف...' : 'نعم، احذف الرحلة'}
                    </button>
                    <button
                        onClick={cancelDelete}
                        disabled={isDeleting}
                        style={{
                            padding: '12px 20px',
                            borderRadius: '10px',
                            background: 'var(--light)',
                            color: 'var(--dark)',
                            border: '1px solid var(--border)',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            flex: 1
                        }}
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminTrips;