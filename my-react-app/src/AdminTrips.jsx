import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminTrips = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // جلب الرحلات من الـ API
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('https://localhost:7165/api/Trip/all');
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

  // دالة الحذف
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الرحلة؟")) {
      try {
        const response = await fetch(`https://localhost:7165/api/Trip/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // تحديث القائمة بعد الحذف بنجاح
          setTrips(trips.filter(trip => trip.id !== id));
          alert("تم الحذف بنجاح");
        } else {
          alert("حدث خطأ أثناء الحذف");
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
  };

  return (
    <div className="section light-bg" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2>إدارة <strong>الرحلات</strong></h2>
          {/* زر التوجيه لصفحة الإضافة */}
          <Link to="/admin/add-trip" className="btn btn-primary">
            + إضافة رحلة جديدة
          </Link>
        </div>

        {isLoading ? (
          <p style={{ textAlign: 'center' }}>جاري التحميل...</p>
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
                      {/* زر التعديل (ينقل لصفحة الفورم مع تمرير الـ ID) */}
                      <Link to={`/admin/edit-trip/${trip.id}`} className="btn btn-outline" style={{ background: 'var(--gold-light)', color: 'var(--gold)', borderColor: 'var(--gold-light)', minHeight: '40px', padding: '0 15px', marginLeft: '10px' }}>
                        تعديل
                      </Link>
                      {/* زر الحذف */}
                      <button onClick={() => handleDelete(trip.id)} className="btn btn-outline" style={{ background: '#ffebee', color: '#c62828', borderColor: '#ffebee', minHeight: '40px', padding: '0 15px' }}>
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrips;