import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TripForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  
  // غيرنا الـ State عشان تقبل مصفوفة من الرسائل بدل نص واحد
  const [formMessage, setFormMessage] = useState({ messages: [], type: "" });

  const [formData, setFormData] = useState({
    Name: "",
    DurationDays: "",
    StartDate: "",
    TransportationType: "Flight",
    Airline: "",
    Routes: [{ name: "" }],
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

  // ==========================================
  // دالة لترجمة الأخطاء من الإنجليزية للعربية
  // ==========================================
  const translateError = (errorMsg) => {
    // توحيد حالة الحروف وتجاهل النقط لتسهيل المطابقة
    const msg = errorMsg.replace(/\./g, "").toLowerCase().trim(); 
    
    if (msg.includes("trip name is required")) return "اسم الرحلة مطلوب.";
    if (msg.includes("duration days must be greater than 0")) return "مدة الرحلة يجب أن تكون أكبر من صفر.";
    if (msg.includes("start date must be in the future")) return "تاريخ انطلاق الرحلة يجب أن يكون في المستقبل.";
    if (msg.includes("airline' must not be empty")) return "حقل خطوط الطيران يجب ألا يكون فارغاً.";
    if (msg.includes("routes are required")) return "يجب إدخال نقطة مسار (خط سير) واحدة على الأقل.";
    if (msg.includes("makkah hotel is required")) return "اسم فندق مكة مطلوب.";
    if (msg.includes("makkah nights must be greater than 0")) return "عدد ليالي مكة يجب أن يكون أكبر من صفر.";
    if (msg.includes("image size must not exceed")) return "حجم الصورة يجب ألا يتجاوز 5 ميجابايت.";
    if (msg.includes("Only JPG, PNG and WEBP images are allowed")) return "الصيغ المدعومة للصور هي فقط: JPG, PNG, و WEBP.";
    
    // إذا كان هناك خطأ غير متوقع، نرجعه كما هو
    return errorMsg; 
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setIsLoading(true);

      fetch(`https://localhost:7165/api/Trip/${id}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.succeeded && result.data) {
            const trip = result.data;
            setCurrentImageUrl(trip.imageUrl || null);
            setFormData({
              Name: trip.name || "",
              DurationDays: trip.durationDays || "",
              StartDate: trip.startDate ? trip.startDate.split("T")[0] : "",
              TransportationType: trip.transportationType || "Flight",
              Airline: trip.airline || "",
              Routes: trip.routes && trip.routes.length > 0 
                ? trip.routes.sort((a, b) => a.order - b.order).map(r => ({ name: r.name }))
                : [{ name: "" }],
              MakkahHotel: trip.makkahHotel || "",
              MakkahNights: trip.makkahNights || "",
              MadinahHotel: trip.madinahHotel || "",
              MadinahNights: trip.madinahNights || "",
              DoublePrice: trip.doublePrice || "",
              TriplePrice: trip.triplePrice || "",
              QuadruplePrice: trip.quadruplePrice || "",
              IncludesFlightTickets: trip.includesFlightTickets ?? true,
              IncludesUmrahVisa: trip.includesUmrahVisa ?? true,
              IncludesGuides: trip.includesGuides ?? true,
              IncludesCustomerService: trip.includesCustomerService ?? true,
              ImageUrl: null, 
            });
          }
        })
        .catch((error) => console.error("Error fetching trip:", error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, ImageUrl: e.target.files[0] }));
  };

  const addRoute = () => {
    setFormData((prev) => ({
      ...prev,
      Routes: [...prev.Routes, { name: "" }],
    }));
  };

  const handleRouteUpdate = (index, value) => {
    const updatedRoutes = formData.Routes.map((route, i) =>
      i === index ? { name: value } : route
    );
    setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
  };

  const removeRoute = (index) => {
    const updatedRoutes = formData.Routes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تصفير الرسالة
    setFormMessage({ messages: [], type: "" });

    const submitData = new FormData();
    if (isEditMode) submitData.append("Id", id);
    
    for (const key in formData) {
      if (key === "Routes") {
        formData.Routes.forEach((route, index) => {
            submitData.append(`Routes[${index}].name`, route.name);
            submitData.append(`Routes[${index}].order`, index + 1); 
        });
      } else if (key === "ImageUrl") {
        if (formData.ImageUrl) {
          submitData.append("ImageUrl", formData.ImageUrl);
        }
      } else {
        submitData.append(key, formData[key]);
      }
    }

    const url = isEditMode 
        ? `https://localhost:7165/api/Trip` 
        : `https://localhost:7165/api/Trip`;
        
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: submitData,
      });

      let result = null;
      try {
        result = await response.json();
      } catch (err) {
        result = null;
      }

      if (response.ok) {
         setFormMessage({ 
           messages: [isEditMode ? "تم تعديل الرحلة بنجاح!" : "تم إضافة الرحلة بنجاح!"], 
           type: "success" 
         });
         
         setTimeout(() => {
           navigate('/admin/trips'); 
         }, 1500);
         
      } else {
         // استخراج ومعالجة رسائل الخطأ من الـ API
         let errorsList = [];
         
         if (result && result.detail) {
           // تقسيم النص بناءً على الفاصلة
           const rawErrors = result.detail.split(",");
           // ترجمة وإزالة التكرارات
           errorsList = [...new Set(rawErrors.map(err => translateError(err.trim())).filter(err => err !== ""))];
         } else if (result && result.message) {
           errorsList = [result.message];
         } else {
           errorsList = ["حدث خطأ أثناء حفظ البيانات. يرجى مراجعة البيانات المدخلة."];
         }
         
         setFormMessage({ messages: errorsList, type: "error" });
      }
    } catch (error) {
       console.error("Submit Error:", error);
       setFormMessage({ messages: ["حدث خطأ في الاتصال بالخادم. يرجى التأكد من عمل الـ API."], type: "error" });
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '100px 0', fontSize: '18px' }}>جاري تحميل بيانات الرحلة...</div>;
  }

  return (
    <div className="section light-bg" style={{ minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        
        <div className="section-heading centered">
          <span className="small-title">لوحة التحكم</span>
          <h2><strong>{isEditMode ? "تعديل" : "إضافة"}</strong> تفاصيل الرحلة</h2>
        </div>

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
              <label>خطوط الطيران (Airline)</label>
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

          {/* --- المسارات (Routes) --- */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ color: "var(--dark)", fontSize: "18px", margin: 0 }}>خط السير (Routes)</h3>
            <button type="button" onClick={addRoute} className="btn btn-outline" style={{ background: "var(--primary-light)", color: "var(--primary)", borderColor: "var(--primary-light)" }}>
              + إضافة نقطة
            </button>
          </div>
          
          {formData.Routes.map((route, index) => (
            <div key={index} className="form-row" style={{ alignItems: "flex-end", marginBottom: "15px", padding: "15px", background: "var(--light)", borderRadius: "10px" }}>
              <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                <label style={{ color: "var(--primary)" }}>نقطة التوقف رقم {index + 1}</label>
                <input 
                  type="text" 
                  value={route.name} 
                  onChange={(e) => handleRouteUpdate(index, e.target.value)} 
                  placeholder="مثال: القاهرة، جدة، مكة..." 
                  required 
                />
              </div>
              <button 
                type="button" 
                onClick={() => removeRoute(index)} 
                style={{ padding: "13px", background: "#ffebee", color: "#c62828", borderRadius: "10px", border: "1px solid #ffebee", cursor: "pointer" }}
              >
                 حذف
              </button>
            </div>
          ))}

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- الأسعار --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>تفاصيل الأسعار</h3>
          <div className="prices-grid" style={{ gap: "15px" }}>
            <div className="form-group">
              <label>سعر الثنائي</label>
              <input type="number" name="DoublePrice" value={formData.DoublePrice} onChange={handleInputChange} placeholder="0" />
            </div>
            <div className="form-group">
              <label>سعر الثلاثي</label>
              <input type="number" name="TriplePrice" value={formData.TriplePrice} onChange={handleInputChange} placeholder="0" />
            </div>
            <div className="form-group">
              <label>سعر الرباعي</label>
              <input type="number" name="QuadruplePrice" value={formData.QuadruplePrice} onChange={handleInputChange} placeholder="0" />
            </div>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- الخدمات المشمولة --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>الخدمات المشمولة</h3>
          <div className="included-grid" style={{ marginBottom: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesFlightTickets" checked={formData.IncludesFlightTickets} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              تذاكر الطيران
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesUmrahVisa" checked={formData.IncludesUmrahVisa} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              تأشيرة العمرة
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesGuides" checked={formData.IncludesGuides} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              مرشدون سياحيون
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
              <input type="checkbox" name="IncludesCustomerService" checked={formData.IncludesCustomerService} onChange={handleInputChange} style={{ width: "20px", height: "20px" }} />
              خدمة العملاء
            </label>
          </div>

          <hr style={{ borderTop: "1px solid var(--border)", margin: "30px 0" }} />

          {/* --- صورة الرحلة --- */}
          <h3 style={{ color: "var(--dark)", fontSize: "18px", marginBottom: "15px" }}>صورة الرحلة (ImageUrl)</h3>
          
          {isEditMode && currentImageUrl && (
            <div style={{ marginBottom: "15px", padding: "10px", background: "var(--light)", borderRadius: "10px", width: "fit-content", border: "1px solid var(--border)" }}>
              <span style={{ display: "block", fontSize: "11px", color: "var(--dark)", fontWeight: "bold", marginBottom: "8px" }}>الصورة الحالية المُسجلة:</span>
              <img src={currentImageUrl} alt="Trip Preview" style={{ width: "200px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
            </div>
          )}
          
          {isEditMode && <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "10px" }}>تلميح: اترك حقل الرفع فارغاً إذا كنت لا تريد تغيير الصورة الحالية.</p>}
          
          <div className="form-group">
            <input type="file" name="ImageUrl" onChange={handleFileChange} accept="image/*" style={{ background: "transparent", border: "1px dashed var(--primary)", padding: "20px" }} />
          </div>

          {/* --- عرض رسائل النجاح والخطأ بشكل منسق ومترجم --- */}
          {formMessage.messages.length > 0 && (
            <div style={{
              padding: "20px",
              marginTop: "20px",
              borderRadius: "12px",
              backgroundColor: formMessage.type === "success" ? "var(--primary-light)" : "#ffebee",
              color: formMessage.type === "success" ? "var(--primary)" : "#c62828",
              border: `1px solid ${formMessage.type === "success" ? "var(--primary)" : "#ef9a9a"}`,
              textAlign: "right"
            }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: "bold" }}>
                {formMessage.type === "success" ? "نجاح!" : "يرجى مراجعة الأخطاء التالية:"}
              </h4>
              <ul style={{ margin: 0, paddingRight: "25px" }}>
                {formMessage.messages.map((msg, index) => (
                  <li key={index} style={{ marginBottom: "5px", fontSize: "13px", fontWeight: "600" }}>
                    {msg}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, fontSize: "16px" }}>
               {isEditMode ? "حفظ التعديلات" : "حفظ الرحلة"}
            </button>
            <button type="button" onClick={() => navigate('/admin/trips')} className="btn btn-outline" style={{ color: "var(--dark)", borderColor: "var(--border)", padding: "0 25px" }}>
              إلغاء
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TripForm;