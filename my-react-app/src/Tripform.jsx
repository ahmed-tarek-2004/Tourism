import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const TripForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { token } = useAuth(); // تم إزالة logout بناءً على التعديلات السابقة

    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [formMessage, setFormMessage] = useState({ messages: [], type: "" });

    const [formData, setFormData] = useState({
        Name: "",
        DurationDays: "",
        StartDate: "",
        TransportationType: "Air", 
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

    const translateError = (errorMsg) => {
        const msg = errorMsg.replace(/\./g, "").toLowerCase().trim();

        if (msg.includes("trip name is required")) return "اسم الرحلة مطلوب.";
        if (msg.includes("duration days must be greater than 0")) return "مدة الرحلة يجب أن تكون أكبر من صفر.";
        if (msg.includes("start date must be in the future")) return "تاريخ انطلاق الرحلة يجب أن يكون في المستقبل.";
        if (msg.includes("airline' must not be empty") || msg.includes("airline is required")) return "حقل خطوط الطيران مطلوب للرحلات الجوية.";
        if (msg.includes("routes are required")) return "يجب إدخال نقطة مسار (خط سير) واحدة على الأقل.";
        if (msg.includes("makkah hotel is required")) return "اسم فندق مكة مطلوب.";
        if (msg.includes("makkah nights must be greater than 0")) return "عدد ليالي مكة يجب أن يكون أكبر من صفر.";
        if (msg.includes("image size must not exceed")) return "حجم الصورة يجب ألا يتجاوز 5 ميجابايت.";
        if (msg.includes("images extension must be end with jpg or jpeg or png or webp")) return "الصيغ المدعومة للصور هي فقط: JPG, JPEG, PNG, WEBP.";

        return errorMsg;
    };

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            setIsLoading(true);

            fetch(`https://sunsharm.runasp.net/api/Trip/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.succeeded && result.data) {
                        const trip = result.data;
                        setCurrentImageUrl(trip.imageUrl || null);
                        setFormData({
                            Name: trip.name || "",
                            DurationDays: trip.durationDays || "",
                            StartDate: trip.startDate ? trip.startDate.split("T")[0] : "",
                            TransportationType: trip.transportationType || "Air",
                            Airline: trip.airline || "",
                            // التعديل الأول: الاحتفاظ بالـ id الخاص بالمسار
                            Routes: trip.routes && trip.routes.length > 0
                                ? trip.routes.sort((a, b) => a.order - b.order).map(r => ({ id: r.id, name: r.name }))
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
    }, [id, token]);

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

    // التعديل الثاني: استخدام Spread Operator للحفاظ على باقي خصائص المسار (مثل الـ id)
    const handleRouteUpdate = (index, value) => {
        const updatedRoutes = formData.Routes.map((route, i) =>
            i === index ? { ...route, name: value } : route
        );
        setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
    };

    const removeRoute = (index) => {
        const updatedRoutes = formData.Routes.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, Routes: updatedRoutes }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormMessage({ messages: [], type: "" });

        const submitData = new FormData();
        if (isEditMode) submitData.append("Id", id);

        for (const key in formData) {
            // التعديل الثالث: إرسال الـ Id مع المسارات في حالة التعديل
            if (key === "Routes") {
                formData.Routes.forEach((route, index) => {
                    if (route.id) {
                        submitData.append(`Routes[${index}].Id`, route.id);
                    }
                    submitData.append(`Routes[${index}].Name`, route.name);
                    submitData.append(`Routes[${index}].Order`, index + 1);
                });
            }
            else if (key === "ImageUrl") {
                if (formData.ImageUrl) submitData.append("ImageUrl", formData.ImageUrl);
            }
            else if (key === "Airline") {
                if (formData.TransportationType === "Air" && formData.Airline) {
                    submitData.append("Airline", formData.Airline);
                }
            }
            else {
                submitData.append(key, formData[key]);
            }
        }

        const url = isEditMode ? `https://sunsharm.runasp.net/api/Trip/${id}` : `https://sunsharm.runasp.net/api/Trip`;
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: submitData,
                headers: { 'Authorization': `Bearer ${token}` }
            });

            let result = null;
            try { result = await response.json(); } catch (err) { result = null; }

            if (response.ok) {
                setFormMessage({
                    messages: [isEditMode ? "تم تعديل الرحلة بنجاح!" : "تم إضافة الرحلة بنجاح!"],
                    type: "success"
                });
                setTimeout(() => navigate('/admin/trips'), 1500);
            } else {
                let errorsList = [];
                if (result && result.detail) {
                    const rawErrors = result.detail.split(",");
                    errorsList = [...new Set(rawErrors.map(err => translateError(err.trim())).filter(err => err !== ""))];
                } else if (result && result.message) {
                    errorsList = [translateError(result.message)];
                } else {
                    errorsList = ["حدث خطأ أثناء حفظ البيانات. يرجى مراجعة البيانات المدخلة."];
                }
                setFormMessage({ messages: errorsList, type: "error" });
            }
        } catch (error) {
            setFormMessage({ messages: ["حدث خطأ في الاتصال بالخادم. يرجى التأكد من عمل الـ API."], type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f7f6', color: '#1a472a', fontFamily: 'Cairo, sans-serif' }}>
                <i className="fa-solid fa-kaaba fa-bounce" style={{ fontSize: '40px', marginBottom: '15px', color: '#d4af37' }}></i>
                <h2>جاري تحميل بيانات الرحلة...</h2>
            </div>
        );
    }

    const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", marginTop: "8px", outline: "none", boxSizing: "border-box", transition: "border-color 0.3s" };
    const labelStyle = { color: "#1a472a", fontWeight: "bold", fontSize: "14px", display: "block" };
    const sectionTitleStyle = { color: "#1a472a", fontSize: "18px", fontWeight: "bold", borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" };
    const rowStyle = { display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' };
    const colStyle = { flex: '1 1 250px' };
    const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', marginBottom: '30px', border: '1px solid #f0f0f0' };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", fontFamily: '"Cairo", "Tajawal", sans-serif', direction: 'rtl', paddingBottom: '50px' }}>
            
            <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
                
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ color: '#1a472a', fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                        {isEditMode ? "تعديل تفاصيل الرحلة" : "إضافة رحلة جديدة"}
                    </h2>
                    <p style={{ color: '#666', margin: 0 }}>يرجى ملء البيانات بدقة لضمان ظهورها بشكل صحيح للعملاء</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div style={{ ...cardStyle, borderTop: '4px solid #d4af37' }}>
                        <h3 style={sectionTitleStyle}>
                            <i className="fa-solid fa-circle-info" style={{ color: '#d4af37' }}></i> المعلومات الأساسية
                        </h3>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>اسم الرحلة</label>
                            <input type="text" name="Name" value={formData.Name} onChange={handleInputChange} required placeholder="مثال: رحلة عمرة المولد النبوي" style={inputStyle} />
                        </div>

                        <div style={rowStyle}>
                            <div style={colStyle}>
                                <label style={labelStyle}>تاريخ الانطلاق</label>
                                <input type="date" name="StartDate" value={formData.StartDate} onChange={handleInputChange} required style={inputStyle} />
                            </div>
                            <div style={colStyle}>
                                <label style={labelStyle}>عدد الأيام</label>
                                <input type="number" name="DurationDays" value={formData.DurationDays} onChange={handleInputChange} required placeholder="14" style={inputStyle} />
                            </div>
                        </div>

                        <div style={rowStyle}>
                            <div style={colStyle}>
                                <label style={labelStyle}>وسيلة النقل</label>
                                <select name="TransportationType" value={formData.TransportationType} onChange={handleInputChange} style={inputStyle}>
                                    <option value="Air">طيران</option>
                                    <option value="Land">برّي</option>
                                    <option value="Ship">بحري</option>
                                </select>
                            </div>
                            
                            {formData.TransportationType === "Air" && (
                                <div style={colStyle}>
                                    <label style={labelStyle}>خطوط الطيران</label>
                                    <input type="text" name="Airline" value={formData.Airline} onChange={handleInputChange} placeholder="مثال: الخطوط السعودية" required style={inputStyle} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <i className="fa-solid fa-hotel" style={{ color: '#d4af37' }}></i> الفنادق والإقامة
                        </h3>
                        <div style={rowStyle}>
                            <div style={colStyle}>
                                <label style={labelStyle}>فندق مكة</label>
                                <input type="text" name="MakkahHotel" value={formData.MakkahHotel} onChange={handleInputChange} required placeholder="اسم الفندق في مكة" style={inputStyle} />
                            </div>
                            <div style={colStyle}>
                                <label style={labelStyle}>عدد ليالي مكة</label>
                                <input type="number" name="MakkahNights" value={formData.MakkahNights} onChange={handleInputChange} required placeholder="عدد الليالي" style={inputStyle} />
                            </div>
                        </div>
                        <div style={rowStyle}>
                            <div style={colStyle}>
                                <label style={labelStyle}>فندق المدينة <span style={{ color: '#999', fontSize: '12px', fontWeight: 'normal' }}>(اختياري)</span></label>
                                <input type="text" name="MadinahHotel" value={formData.MadinahHotel} onChange={handleInputChange} placeholder="اسم الفندق في المدينة" style={inputStyle} />
                            </div>
                            <div style={colStyle}>
                                <label style={labelStyle}>عدد ليالي المدينة <span style={{ color: '#999', fontSize: '12px', fontWeight: 'normal' }}>(اختياري)</span></label>
                                <input type="number" name="MadinahNights" value={formData.MadinahNights} onChange={handleInputChange} placeholder="عدد الليالي" style={inputStyle} />
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>
                            <h3 style={{ color: "#1a472a", fontSize: "18px", fontWeight: "bold", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                                <i className="fa-solid fa-route" style={{ color: '#d4af37' }}></i> خط السير (المسار)
                            </h3>
                            <button type="button" onClick={addRoute} style={{ backgroundColor: "#e8f5e9", color: "#1a472a", border: "1px solid #1a472a", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
                                <i className="fa-solid fa-plus"></i> إضافة نقطة
                            </button>
                        </div>

                        {formData.Routes.map((route, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ ...labelStyle, color: '#555' }}>محطة رقم {index + 1}</label>
                                    <input type="text" value={route.name} onChange={(e) => handleRouteUpdate(index, e.target.value)} placeholder="مثال: القاهرة، جدة، مكة..." required style={inputStyle} />
                                </div>
                                <button type="button" onClick={() => removeRoute(index)} style={{ backgroundColor: "#ffebee", color: "#c62828", border: "none", padding: "12px 15px", borderRadius: "8px", cursor: "pointer" }} title="حذف النقطة">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <i className="fa-solid fa-tags" style={{ color: '#d4af37' }}></i> الأسعار والخدمات
                        </h3>
                        
                        <div style={rowStyle}>
                            <div style={colStyle}>
                                <label style={labelStyle}>سعر الفرد (ثنائي)</label>
                                <input type="number" name="DoublePrice" value={formData.DoublePrice} onChange={handleInputChange} placeholder="0" style={inputStyle} />
                            </div>
                            <div style={colStyle}>
                                <label style={labelStyle}>سعر الفرد (ثلاثي)</label>
                                <input type="number" name="TriplePrice" value={formData.TriplePrice} onChange={handleInputChange} placeholder="0" style={inputStyle} />
                            </div>
                            <div style={colStyle}>
                                <label style={labelStyle}>سعر الفرد (رباعي)</label>
                                <input type="number" name="QuadruplePrice" value={formData.QuadruplePrice} onChange={handleInputChange} placeholder="0" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                            <label style={{ ...labelStyle, marginBottom: '15px' }}>الخدمات المشمولة في الرحلة:</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {[
                                    { name: "IncludesFlightTickets", label: "تذاكر الطيران" },
                                    { name: "IncludesUmrahVisa", label: "تأشيرة العمرة" },
                                    { name: "IncludesGuides", label: "مرشدون سياحيون" },
                                    { name: "IncludesCustomerService", label: "خدمة العملاء" }
                                ].map((item) => (
                                    <label key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "600", color: '#444' }}>
                                        <input type="checkbox" name={item.name} checked={formData[item.name]} onChange={handleInputChange} style={{ width: "18px", height: "18px", accentColor: '#1a472a' }} />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <i className="fa-solid fa-image" style={{ color: '#d4af37' }}></i> صورة الرحلة
                        </h3>

                        {isEditMode && currentImageUrl && (
                            <div style={{ marginBottom: "20px", display: 'flex', alignItems: 'center', gap: '15px', padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" }}>
                                <img src={currentImageUrl} alt="Trip" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "6px", border: '2px solid #d4af37' }} />
                                <div>
                                    <span style={{ display: "block", fontSize: "14px", color: "#1a472a", fontWeight: "bold" }}>الصورة الحالية</span>
                                    <span style={{ fontSize: "12px", color: "#666" }}>اترك حقل الرفع فارغاً إذا كنت لا تريد تغييرها.</span>
                                </div>
                            </div>
                        )}

                        <div style={{ border: "2px dashed #ccc", padding: "30px", borderRadius: "8px", textAlign: 'center', backgroundColor: '#fafafa', transition: 'border-color 0.3s' }}
                             onMouseOver={(e) => e.currentTarget.style.borderColor = '#1a472a'}
                             onMouseOut={(e) => e.currentTarget.style.borderColor = '#ccc'}>
                            <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '30px', color: '#1a472a', marginBottom: '10px' }}></i>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>اختر صورة أو اسحبها هنا</p>
                            <input type="file" name="ImageUrl" onChange={handleFileChange} accept="image/*" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {formMessage.messages.length > 0 && (
                        <div style={{ padding: "20px", marginBottom: "30px", borderRadius: "8px", backgroundColor: formMessage.type === "success" ? "#e8f5e9" : "#ffebee", color: formMessage.type === "success" ? "#2e7d32" : "#c62828", border: `1px solid ${formMessage.type === "success" ? "#a5d6a7" : "#ef9a9a"}` }}>
                            <h4 style={{ margin: "0 0 10px 0", fontSize: "15px", fontWeight: "bold", display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <i className={`fa-solid ${formMessage.type === "success" ? 'fa-check-circle' : 'fa-triangle-exclamation'}`}></i>
                                {formMessage.type === "success" ? "تمت العملية بنجاح" : "يرجى مراجعة الأخطاء التالية:"}
                            </h4>
                            <ul style={{ margin: 0, paddingRight: "25px", fontSize: "14px" }}>
                                {formMessage.messages.map((msg, index) => <li key={index} style={{ marginBottom: "5px" }}>{msg}</li>)}
                            </ul>
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "15px" }}>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{ flex: 2, padding: '15px', backgroundColor: '#1a472a', color: '#d4af37', border: 'none', borderRadius: '8px', cursor: isSubmitting ? "not-allowed" : "pointer", fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(26, 71, 42, 0.3)', opacity: isSubmitting ? 0.8 : 1 }}
                        >
                            {isSubmitting ? (
                                <>جاري الحفظ... <i className="fa-solid fa-spinner fa-spin"></i></>
                            ) : (
                                <>{isEditMode ? "حفظ التعديلات" : "إضافة الرحلة"} <i className="fa-solid fa-floppy-disk"></i></>
                            )}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin/trips')} 
                            disabled={isSubmitting}
                            style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#555', border: '1px solid #ccc', borderRadius: '8px', cursor: isSubmitting ? "not-allowed" : "pointer", fontSize: '16px', fontWeight: 'bold', opacity: isSubmitting ? 0.6 : 1 }}
                        >
                            إلغاء
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TripForm;