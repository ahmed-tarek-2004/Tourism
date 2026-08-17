import React, { useState } from "react";

const TripForm = () => {
  // تهيئة حالة الفورم بناءً على الـ DTO
  const [formData, setFormData] = useState({
    Name: "",
    DurationDays: "",
    StartDate: "",
    TransportationType: "Flight", // قيمة افتراضية
    Airline: "",
    Routes: [],
    MakkahHotel: "",
    MakkahNights: "",
    MadinahHotel: "",
    MadinahNights: "",
    DoublePrice: "",
    TriplePrice: "",
    QuadruplePrice: "",
    IncludesFlightTickets: true,
    IncludesUmrahVisa: true,
    IncludesGuides: true,
    IncludesCustomerService: true,
    ImageUrl: null,
  });

  // التعامل مع التغييرات في الحقول النصية والرقمية
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // التعامل مع رفع الصورة
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ImageUrl: e.target.files[0],
    }));
  };

  // التعامل مع المسارات (Routes)
  const addRoute = () => {
    setFormData((prev) => ({
      ...prev,
      Routes: [...prev.Routes, { startPoint: "", endPoint: "" }], // بناء الـ RouteDTO الافتراضي
    }));
  };

  const handleRouteUpdate = (index, field, value) => {
    const updatedRoutes = formData.Routes.map((route, i) =>
      i === index ? { ...route, [field]: value } : route
    );
    setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
  };

  const removeRoute = (index) => {
    const updatedRoutes = formData.Routes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
  };

  // إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();

    // لأننا بنبعت ملف (صورة)، لازم نستخدم FormData
    const submitData = new FormData();
    
    // إضافة الحقول النصية والرقمية
    for (const key in formData) {
      if (key === "Routes") {
        // إرسال المصفوفات في FormData بيختلف حسب الـ Backend
        formData.Routes.forEach((route, index) => {
            submitData.append(`Routes[${index}].startPoint`, route.startPoint);
            submitData.append(`Routes[${index}].endPoint`, route.endPoint);
        });
      } else if (key === "ImageUrl") {
        if (formData.ImageUrl) {
          submitData.append("ImageUrl", formData.ImageUrl);
        }
      } else {
        submitData.append(key, formData[key]);
      }
    }

    console.log("Data to send: ", Object.fromEntries(submitData.entries()));
    // هنا تحط الـ API Call بتاعك (axios.post أو fetch)
  };

  return (
    <div className="section light-bg" style={{ minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        
        {/* عنوان الصفحة */}
        <div className="section-heading centered">
          <span className="small-title">لوحة التحكم</span>
          <h2>
            <strong>إضافة / تعديل</strong> تفاصيل الرحلة
          </h2>
          <p>قم بملء البيانات التالية لنشر برنامج رحلة جديد</p>
        </div>

        {/* الفورم */}
        <form className="contact-form" onSubmit={handleSubmit}>
          
          {/* --- المعلومات الأساسية --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>المعلومات الأساسية</h3>
          
          <div className="form-group">
            <label>اسم الرحلة (Name)</label>
            <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} required placeholder="مثال: رحلة عمرة المولد النبوي" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>تاريخ الانطلاق (StartDate)</label>
              <input type="date" name="StartDate" value={formData.StartDate} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>عدد الأيام (DurationDays)</label>
              <input type="number" name="DurationDays" value={formData.DurationDays} onChange={handleInputChange} required placeholder="14" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>وسيلة النقل (TransportationType)</label>
              <select name="TransportationType" value={formData.TransportationType} onChange={handleInputChange}>
                <option value="Flight">طيران</option>
                <option value="Bus">برّي</option>
                <option value="Ship">بحري</option>
              </select>
            </div>
            <div className="form-group">
              <label>خطوط الطيران (Airline) - اختياري</label>
              <input type="text" name="Airline" value={formData.Airline} onChange={handleInputChange} placeholder="مثال: الخطوط السعودية" />
            </div>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- الفنادق والإقامة --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>الفنادق والإقامة</h3>
          <div className="form-row">
            <div className="form-group">
              <label>فندق مكة (MakkahHotel)</label>
              <input type="text" name="MakkahHotel" value={formData.MakkahHotel} onChange={handleInputChange} required placeholder="اسم الفندق في مكة" />
            </div>
            <div className="form-group">
              <label>عدد ليالي مكة (MakkahNights)</label>
              <input type="number" name="MakkahNights" value={formData.MakkahNights} onChange={handleInputChange} required placeholder="عدد الليالي" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>فندق المدينة (MadinahHotel) - اختياري</label>
              <input type="text" name="MadinahHotel" value={formData.MadinahHotel} onChange={handleInputChange} placeholder="اسم الفندق في المدينة" />
            </div>
            <div className="form-group">
              <label>عدد ليالي المدينة (MadinahNights) - اختياري</label>
              <input type="number" name="MadinahNights" value={formData.MadinahNights} onChange={handleInputChange} placeholder="عدد الليالي" />
            </div>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- الأسعار --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>تفاصيل الأسعار (اختياري)</h3>
          <div className="prices-grid" style={{ gap: "15px" }}>
            <div className="form-group">
              <label>سعر الثنائي (Double)</label>
              <input type="number" name="DoublePrice" value={formData.DoublePrice} onChange={handleInputChange} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label>سعر الثلاثي (Triple)</label>
              <input type="number" name="TriplePrice" value={formData.TriplePrice} onChange={handleInputChange} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label>سعر الرباعي (Quadruple)</label>
              <input type="number" name="QuadruplePrice" value={formData.QuadruplePrice} onChange={handleInputChange} placeholder="0.00" />
            </div>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- الخدمات المشمولة --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>الخدمات المشمولة</h3>
          <div className="included-grid" style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "var(--dark)", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesFlightTickets" checked={formData.IncludesFlightTickets} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              تذاكر الطيران
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "var(--dark)", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesUmrahVisa" checked={formData.IncludesUmrahVisa} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              تأشيرة العمرة
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "var(--dark)", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesGuides" checked={formData.IncludesGuides} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              مرشدون سياحيون
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", color: "var(--dark)", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesCustomerService" checked={formData.IncludesCustomerService} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              خدمة العملاء
            </label>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- المسارات (Routes) --- */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ color: "var(--dark)", fontSize: "18px", margin: 0 }}>المسارات (Routes)</h3>
            <button type="button" onClick={addRoute} className="btn btn-outline" style={{ background: "var(--primary-light)", color: "var(--primary)", borderColor: "var(--primary-light)" }}>
              + إضافة مسار
            </button>
          </div>
          
          {formData.Routes.map((route, index) => (
            <div key={index} className="form-row" style={{ alignItems: "flex-end", marginBottom: "15px", padding: "15px", background: "var(--light)", borderRadius: "10px" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>نقطة البداية</label>
                <input type="text" value={route.startPoint} onChange={(e) => handleRouteUpdate(index, "startPoint", e.target.value)} placeholder="مثال: القاهرة" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>نقطة الوصول</label>
                <input type="text" value={route.endPoint} onChange={(e) => handleRouteUpdate(index, "endPoint", e.target.value)} placeholder="مثال: جدة" />
              </div>
              <button type="button" onClick={() => removeRoute(index)} style={{ padding: "13px", background: "#ff4d4d", color: "#fff", borderRadius: "10px", border: "none", cursor: "pointer" }}>
                 حذف
              </button>
            </div>
          ))}

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- صورة الرحلة --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>صورة الرحلة (ImageUrl)</h3>
          <div className="form-group">
            <input type="file" name="ImageUrl" onChange={handleFileChange} accept="image/*" style={{ background: "transparent", border: "1px dashed var(--primary)", padding: "20px" }} />
          </div>

          {/* أزرار الحفظ */}
          <div style={{ display: "flex", gap: "15px", marginTop: "40px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, fontSize: "16px" }}>
              حفظ الرحلة
            </button>
            <button type="button" className="btn btn-outline" style={{ color: "var(--dark)", borderColor: "var(--border)" }}>
              إلغاء
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TripForm;