import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  // =========================================
  // 1. STATES
  // =========================================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  // =========================================
  // 2. EFFECTS
  // =========================================
  useEffect(() => {
    // Scroll Event للـ Header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Auto Slide للتقييمات كل 6 ثواني
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 6000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(reviewInterval);
    };
  }, []);

  // =========================================
  // 3. HANDLERS
  // =========================================
  const nextTrip = () => setCurrentTrip((prev) => (prev >= 2 ? 0 : prev + 1));
  const prevTrip = () => setCurrentTrip((prev) => (prev <= 0 ? 2 : prev - 1));

  const nextReviewSlide = () => setCurrentReview((prev) => (prev >= 3 ? 0 : prev + 1));
  const prevReviewSlide = () => setCurrentReview((prev) => (prev <= 0 ? 3 : prev - 1));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.phone || !data.message) {
      setFormMessage({ text: "برجاء ملء البيانات المطلوبة.", type: "error" });
      return;
    }

    try {
      // هنا تضع كود استدعاء الـ API (الـ Endpoint) لاحقاً
      console.log("Data to send:", data);
      
      setFormMessage({ text: "تم إرسال طلبك بنجاح. سنتواصل معك قريباً.", type: "success" });
      e.target.reset();
    } catch (error) {
      setFormMessage({ text: "حدث خطأ أثناء الإرسال. حاول مرة أخرى.", type: "error" });
    }
  };

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
        <div className="container navbar">
          <a href="#home" className="logo">
            <span className="logo-icon">
              <i className="fa-solid fa-kaaba"></i>
            </span>
            <span>
              <strong>صن شرم تورز Sun Sharm Tours</strong>
              <small> للحج والعمرة</small>
            </span>
          </a>

          <nav className={`nav-menu ${isMenuOpen ? 'show' : ''}`} id="navMenu">
            <a href="#home" className="active" onClick={() => setIsMenuOpen(false)}>الرئيسية</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>من نحن</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>خدماتنا</a>
            <a href="#packages" onClick={() => setIsMenuOpen(false)}>الباقات</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)}>آراء العملاء</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>الأسئلة</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>تواصل معنا</a>
          </nav>

          <a href="#contact" className="nav-button">احجز الآن</a>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* ========================= HERO ========================= */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-badge">
            <i className="fa-solid fa-star"></i> رحلتك إلى بيت الله تبدأ من هنا
          </span>
          <h1>
            للحج والعمرة
            <span>بكل راحة وطمأنينة</span>
          </h1>
          <p>
            نقدم لك برامج متكاملة للحج والعمرة، تشمل الإقامة،
            المواصلات والتأشيرات، مع متابعة مستمرة من لحظة الحجز
            حتى العودة إلى أرض الوطن.
          </p>
          <div className="hero-actions">
            <a href="#packages" className="btn btn-primary">
              اكتشف برامجنا
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <a href="#contact" className="btn btn-outline">
              تواصل معنا
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>15+</strong>
              <span>عاماً من الخبرة</span>
            </div>
            <div className="stat">
              <strong>12K+</strong>
              <span>معتمر وحاج</span>
            </div>
            <div className="stat">
              <strong>98%</strong>
              <span>رضا العملاء</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>خدمة العملاء</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section className="about section" id="about">
        <div className="container">
          <div className="section-heading">
            <span>من نحن</span>
            <h2>
              نجعل رحلتك إلى
              <strong>بيت الله أسهل</strong>
            </h2>
            <p>
              نحن في صن شرم تورز نؤمن أن رحلة الحج والعمرة ليست مجرد سفر،
              بل تجربة روحانية تستحق أفضل تنظيم وأعلى مستوى من الراحة.
            </p>
          </div>
          <div className="about-grid">
            <div className="about-images">
              <div className="image-main">
                <img src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=85" alt="مكة المكرمة" />
              </div>
              <div className="experience-card">
                <strong>15+</strong>
                <span>سنة من الخبرة</span>
              </div>
              <div className="image-small">
                <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d8f56c?auto=format&fit=crop&w=600&q=85" alt="المسجد النبوي" />
              </div>
            </div>
            <div className="about-content">
              <span className="small-title">لماذا صن شرم تورز؟</span>
              <h3>
                معنا تبدأ رحلتك
                <span>بالثقة والطمأنينة</span>
              </h3>
              <p>
                نعمل على توفير كل ما تحتاجه خلال رحلة الحج والعمرة،
                بداية من اختيار البرنامج المناسب، مروراً بإجراءات
                السفر والإقامة والمواصلات، وصولاً إلى المتابعة
                المستمرة أثناء الرحلة.
              </p>
              <p>
                هدفنا هو أن تتفرغ لعبادتك بينما نهتم نحن بكل تفاصيل الرحلة.
              </p>
              <div className="features">
                <div className="feature">
                  <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
                  <div>
                    <h4>خدمة موثوقة</h4>
                    <p>خبرة طويلة وفريق متخصص.</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon"><i className="fa-solid fa-hotel"></i></div>
                  <div>
                    <h4>فنادق مختارة</h4>
                    <p>إقامة مريحة بالقرب من الحرم.</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon"><i className="fa-solid fa-headset"></i></div>
                  <div>
                    <h4>دعم مستمر</h4>
                    <p>معك طوال فترة الرحلة.</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon"><i className="fa-solid fa-car"></i></div>
                  <div>
                    <h4>مواصلات منظمة</h4>
                    <p>تنقلات آمنة ومريحة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="services section light-bg" id="services">
        <div className="container">
          <div className="section-heading centered">
            <span>خدماتنا</span>
            <h2>
              كل ما تحتاجه
              <strong>في رحلة واحدة</strong>
            </h2>
            <p>نهتم بأدق التفاصيل حتى تحصل على رحلة مريحة ومنظمة.</p>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-kaaba"></i></div>
              <h3>برامج العمرة</h3>
              <p>برامج عمرة متنوعة تناسب احتياجاتك وميزانيتك.</p>
              <a href="#packages">اكتشف البرامج <i className="fa-solid fa-arrow-left"></i></a>
            </article>
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-mosque"></i></div>
              <h3>برامج الحج</h3>
              <p>برامج حج متكاملة مع تنظيم ومتابعة طوال الرحلة.</p>
              <a href="#packages">اكتشف البرامج <i className="fa-solid fa-arrow-left"></i></a>
            </article>
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-hotel"></i></div>
              <h3>حجز الفنادق</h3>
              <p>فنادق مميزة في مكة والمدينة بمواقع مختارة بعناية.</p>
              <a href="#contact">استفسر الآن <i className="fa-solid fa-arrow-left"></i></a>
            </article>
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-plane"></i></div>
              <h3>تذاكر الطيران</h3>
              <p>مساعدتك في حجز رحلات الطيران المناسبة لموعد سفرك.</p>
              <a href="#contact">استفسر الآن <i className="fa-solid fa-arrow-left"></i></a>
            </article>
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-bus"></i></div>
              <h3>المواصلات</h3>
              <p>خدمة نقل مريحة وآمنة بين المطارات والفنادق والمشاعر.</p>
              <a href="#contact">اعرف المزيد <i className="fa-solid fa-arrow-left"></i></a>
            </article>
            <article className="service-card">
              <div className="service-icon"><i className="fa-solid fa-passport"></i></div>
              <h3>التأشيرات</h3>
              <p>مساعدتك في استكمال إجراءات السفر والتأشيرة.</p>
              <a href="#contact">استفسر الآن <i className="fa-solid fa-arrow-left"></i></a>
            </article>
          </div>
        </div>
      </section>

      {/* ========================= PACKAGES ========================= */}
      <section className="trips section light-bg" id="packages">
        <div className="container">
          <div className="section-heading centered">
            <span>رحلاتنا</span>
            <h2>اختر <strong>رحلتك قبل أن تبدأ</strong></h2>
            <p>تعرّف على أهم محطات رحلاتنا وخدماتنا التي نقدمها لضيوف الرحمن.</p>
          </div>

          <div className="trips-wrapper">
            <button className="trip-slider-button prev" onClick={prevTrip}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div className="trips-slider">
              {/* ========================= TRIP 1 ========================= */}
              <article className={`trip-card ${currentTrip === 0 ? 'active' : ''}`} style={{ display: currentTrip === 0 ? 'block' : 'none' }}>
                <div className="trip-image">
                  <img src="https://rihlatravel.com/assets/upload/seo/NeU21BZv60y8JH4Vwa5d0tdQABr3Xl.webp" alt="برنامج العمرة" />
                  <div className="trip-image-overlay">
                    <span className="trip-badge">برنامج عمرة</span>
                    <span className="trip-days">15 يوم</span>
                  </div>
                </div>
                <div className="trip-content">
                  <div className="trip-title-row">
                    <div>
                      <div className="program-start-date">
                        <div className="start-date-icon"><i className="fa-regular fa-calendar-days"></i></div>
                        <div className="start-date-info">
                          <span>تاريخ بداية الرحلة</span>
                          <strong>8 سبتمبر 2026</strong>
                        </div>
                      </div>
                      <h3>برنامج عمرة 15 يوم</h3>
                    </div>
                    <div className="airline">
                      <i className="fa-solid fa-plane"></i>
                      <span>طيران سعودي</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-route"></i><span>خط السير</span>
                    </div>
                    <div className="route">
                      <span>القاهرة</span><i className="fa-solid fa-plane"></i>
                      <span>جدة</span><i className="fa-solid fa-plane"></i>
                      <span>المدينة المنورة</span><i className="fa-solid fa-plane"></i>
                      <span>القاهرة</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hotel"></i><span>الإقامة</span>
                    </div>
                    <div className="hotel-grid">
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن مكة المكرمة</span>
                          <strong className="hotel-name">صفوة البيت</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 11 من الليالي</span>
                          </div>
                        </div>
                      </div>
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن المدينة المنورة</span>
                          <strong className="hotel-name">فندق مركزية</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 3 من الليالي</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-tags"></i><span>الأسعار للفرد</span>
                    </div>
                    <div className="prices-grid">
                      <div className="price-card">
                        <span>رباعي</span><strong>41,500</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card">
                        <span>ثلاثي</span><strong>44,500</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card featured-price">
                        <span>ثنائي</span><strong>47,500</strong><small>جنيه مصري</small>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hand-holding-heart"></i><span>البرنامج يشمل</span>
                    </div>
                    <div className="included-grid">
                      <div><i className="fa-solid fa-bus"></i><span>تنقلات مريحة</span></div>
                      <div><i className="fa-solid fa-file-circle-check"></i><span>تأشيرة عمرة</span></div>
                      <div><i className="fa-solid fa-user-group"></i><span>مرشدين متخصصين</span></div>
                      <div><i className="fa-solid fa-headset"></i><span>خدمة عملاء على مدار الساعة</span></div>
                    </div>
                  </div>

                  <div className="trip-footer">
                    <div className="trip-footer-info">
                      <i className="fa-solid fa-calendar-days"></i><span>برنامج متكامل لمدة 15 يوم</span>
                    </div>
                    <a href="#contact" className="trip-button">احجز الآن <i className="fa-solid fa-arrow-left"></i></a>
                  </div>
                </div>
              </article>

              {/* ========================= TRIP 2 ========================= */}
              <article className={`trip-card ${currentTrip === 1 ? 'active' : ''}`} style={{ display: currentTrip === 1 ? 'block' : 'none' }}>
                <div className="trip-image">
                  <img src="img/img2.jpeg" alt="برنامج العمرة" />
                  <div className="trip-image-overlay">
                    <span className="trip-badge">برنامج عمرة</span>
                    <span className="trip-days">15 يوم</span>
                  </div>
                </div>
                <div className="trip-content">
                  <div className="trip-title-row">
                    <div>
                      <div className="program-start-date">
                        <div className="start-date-icon"><i className="fa-regular fa-calendar-days"></i></div>
                        <div className="start-date-info">
                          <span>تاريخ بداية الرحلة</span>
                          <strong>12 سبتمبر 2026</strong>
                        </div>
                      </div>
                      <h3>برنامج عمرة 15 يوم</h3>
                    </div>
                    <div className="airline">
                      <i className="fa-solid fa-plane"></i>
                      <span>طيران اير كايرو</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-route"></i><span>خط السير</span>
                    </div>
                    <div className="route">
                      <span>القاهرة</span><i className="fa-solid fa-plane"></i>
                      <span>جدة</span><i className="fa-solid fa-plane"></i>
                      <span>القاهرة</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hotel"></i><span>الإقامة</span>
                    </div>
                    <div className="hotel-grid">
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن مكة المكرمة</span>
                          <strong className="hotel-name">صفوة البيت</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 11 من الليالي</span>
                          </div>
                        </div>
                      </div>
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن المدينة المنورة</span>
                          <strong className="hotel-name">فندق مركزية</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 3 من الليالي</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-tags"></i><span>الأسعار للفرد</span>
                    </div>
                    <div className="prices-grid">
                      <div className="price-card">
                        <span>رباعي</span><strong>39,500</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card">
                        <span>ثلاثي</span><strong>42,500</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card featured-price">
                        <span>ثنائي</span><strong>45,500</strong><small>جنيه مصري</small>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hand-holding-heart"></i><span>البرنامج يشمل</span>
                    </div>
                    <div className="included-grid">
                      <div><i className="fa-solid fa-bus"></i><span>تنقلات مريحة</span></div>
                      <div><i className="fa-solid fa-file-circle-check"></i><span>تأشيرة عمرة</span></div>
                      <div><i className="fa-solid fa-user-group"></i><span>مرشدين متخصصين</span></div>
                      <div><i className="fa-solid fa-headset"></i><span>خدمة عملاء على مدار الساعة</span></div>
                    </div>
                  </div>

                  <div className="trip-footer">
                    <div className="trip-footer-info">
                      <i className="fa-solid fa-calendar-days"></i><span>برنامج متكامل لمدة 15 يوم</span>
                    </div>
                    <a href="#contact" className="trip-button">احجز الآن <i className="fa-solid fa-arrow-left"></i></a>
                  </div>
                </div>
              </article>

              {/* ========================= TRIP 3 ========================= */}
              <article className={`trip-card ${currentTrip === 2 ? 'active' : ''}`} style={{ display: currentTrip === 2 ? 'block' : 'none' }}>
                <div className="trip-image">
                  <img src="img/img3.jpeg" alt="برنامج العمرة" />
                  <div className="trip-image-overlay">
                    <span className="trip-badge">برنامج عمرة</span>
                    <span className="trip-days">15 يوم</span>
                  </div>
                </div>
                <div className="trip-content">
                  <div className="trip-title-row">
                    <div>
                      <div className="program-start-date">
                        <div className="start-date-icon"><i className="fa-regular fa-calendar-days"></i></div>
                        <div className="start-date-info">
                          <span>تاريخ بداية الرحلة</span>
                          <strong>8 سبتمبر 2026</strong>
                        </div>
                      </div>
                      <h3>برنامج عمرة 15 يوم</h3>
                    </div>
                    <div className="airline">
                      <i className="fa-solid fa-plane"></i>
                      <span>طيران اير كايرو</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-route"></i><span>خط السير</span>
                    </div>
                    <div className="route">
                      <span>بري</span>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hotel"></i><span>الإقامة</span>
                    </div>
                    <div className="hotel-grid">
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن مكة المكرمة</span>
                          <strong className="hotel-name">صفوة البيت</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 11 من الليالي</span>
                          </div>
                        </div>
                      </div>
                      <div className="hotel-card">
                        <div className="hotel-icon"><i className="fa-solid fa-hotel"></i></div>
                        <div className="hotel-info">
                          <span className="hotel-label">سكن المدينة المنورة</span>
                          <strong className="hotel-name">فندق مركزية</strong>
                          <div className="hotel-bottom">
                            <span className="hotel-nights"><i className="fa-regular fa-moon"></i> 3 من الليالي</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-tags"></i><span>الأسعار للفرد</span>
                    </div>
                    <div className="prices-grid">
                      <div className="price-card">
                        <span>رباعي</span><strong>33,000</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card">
                        <span>ثلاثي</span><strong>36,000</strong><small>جنيه مصري</small>
                      </div>
                      <div className="price-card featured-price">
                        <span>ثنائي</span><strong>39,000</strong><small>جنيه مصري</small>
                      </div>
                    </div>
                  </div>

                  <div className="program-section">
                    <div className="program-section-title">
                      <i className="fa-solid fa-hand-holding-heart"></i><span>البرنامج يشمل</span>
                    </div>
                    <div className="included-grid">
                      <div><i className="fa-solid fa-bus"></i><span>تنقلات مريحة</span></div>
                      <div><i className="fa-solid fa-file-circle-check"></i><span>تأشيرة عمرة</span></div>
                      <div><i className="fa-solid fa-user-group"></i><span>مرشدين متخصصين</span></div>
                      <div><i className="fa-solid fa-headset"></i><span>خدمة عملاء على مدار الساعة</span></div>
                    </div>
                  </div>

                  <div className="trip-footer">
                    <div className="trip-footer-info">
                      <i className="fa-solid fa-calendar-days"></i><span>برنامج متكامل لمدة 15 يوم</span>
                    </div>
                    <a href="#contact" className="trip-button">احجز الآن <i className="fa-solid fa-arrow-left"></i></a>
                  </div>
                </div>
              </article>
            </div>

            <button className="trip-slider-button next" onClick={nextTrip}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="trip-dots">
            <button className={`trip-dot ${currentTrip === 0 ? 'active' : ''}`} onClick={() => setCurrentTrip(0)}></button>
            <button className={`trip-dot ${currentTrip === 1 ? 'active' : ''}`} onClick={() => setCurrentTrip(1)}></button>
            <button className={`trip-dot ${currentTrip === 2 ? 'active' : ''}`} onClick={() => setCurrentTrip(2)}></button>
          </div>
        </div>
      </section>

      {/* ========================= WHY US ========================= */}
      <section className="why-us section light-bg">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <span className="small-title">لماذا نحن؟</span>
              <h2>لأن راحتك <strong>أهم ما لدينا</strong></h2>
              <p>من أول لحظة تتواصل معنا وحتى عودتك إلى منزلك، فريقنا موجود لمساعدتك وتنظيم جميع تفاصيل الرحلة.</p>
              <div className="why-items">
                <div className="why-item">
                  <div className="why-number">01</div>
                  <div>
                    <h3>خبرة وثقة</h3>
                    <p>سنوات طويلة من العمل في مجال الحج والعمرة.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">02</div>
                  <div>
                    <h3>برامج متنوعة</h3>
                    <p>خيارات متعددة تناسب ميزانيات واحتياجات مختلفة.</p>
                  </div>
                </div>
                <div className="why-item">
                  <div className="why-number">03</div>
                  <div>
                    <h3>خدمة مستمرة</h3>
                    <p>فريق دعم يتابعك قبل وأثناء وبعد الرحلة.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image">
              <img src="img/برج الساعة .jpeg" alt="الحج والعمرة" />
              <div className="floating-card">
                <div className="floating-icon"><i className="fa-solid fa-heart"></i></div>
                <div><strong>+12,000</strong><span>عميل سعيد</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= STEPS ========================= */}
      <section className="steps section">
        <div className="container">
          <div className="section-heading centered">
            <span>كيف نعمل؟</span>
            <h2>رحلتك معنا <strong>في 4 خطوات</strong></h2>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <h3>اختر البرنامج</h3>
              <p>اختر برنامج الحج أو العمرة المناسب لك.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-icon"><i className="fa-solid fa-calendar-check"></i></div>
              <h3>احجز رحلتك</h3>
              <p>تواصل معنا وأكمل إجراءات الحجز.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-icon"><i className="fa-solid fa-passport"></i></div>
              <h3>جهز أوراقك</h3>
              <p>نساعدك في تجهيز المستندات والإجراءات المطلوبة.</p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <div className="step-icon"><i className="fa-solid fa-plane-departure"></i></div>
              <h3>ابدأ رحلتك</h3>
              <p>استمتع برحلة منظمة ومريحة إلى بيت الله.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= REVIEWS ========================= */}
      <section className="reviews section light-bg" id="reviews">
        <div className="container">
          <div className="section-heading centered">
            <span>آراء العملاء</span>
            <h2>ماذا قال <strong>عملاؤنا؟</strong></h2>
            <p>رضا عملائنا هو أكبر شهادة على جودة خدماتنا.</p>
          </div>

          <div className="reviews-wrapper">
            <button className="slider-button prev" onClick={prevReviewSlide}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div className="reviews-slider">
              {/* Review 1 */}
              <article className={`review-card ${currentReview === 0 ? 'active' : ''}`} style={{ display: currentReview === 0 ? 'block' : 'none' }}>
                <div className="review-stars">★★★★★</div>
                <p>"بصراحة كانت تجربة ممتازة جداً. كل شيء كان منظم من أول السفر لحد الرجوع، والفندق كان ممتاز وقريب من الحرم."</p>
                <div className="review-user">
                  <div className="avatar">أ</div>
                  <div><strong>أحمد محمد</strong><span>رحلة عمرة</span></div>
                </div>
              </article>
              {/* Review 2 */}
              <article className={`review-card ${currentReview === 1 ? 'active' : ''}`} style={{ display: currentReview === 1 ? 'block' : 'none' }}>
                <div className="review-stars">★★★★★</div>
                <p>"فريق محترم جداً وخدمة ممتازة. أكثر شيء عجبني المتابعة المستمرة أثناء الرحلة والرد السريع على أي استفسار."</p>
                <div className="review-user">
                  <div className="avatar">م</div>
                  <div><strong>محمد علي</strong><span>رحلة عمرة</span></div>
                </div>
              </article>
              {/* Review 3 */}
              <article className={`review-card ${currentReview === 2 ? 'active' : ''}`} style={{ display: currentReview === 2 ? 'block' : 'none' }}>
                <div className="review-stars">★★★★</div>
                <p>"جزاكم الله خيرا "</p>
                <div className="review-user">
                  <div className="avatar">ع</div>
                  <div><strong>علي رضا</strong><span>رحلة عمرة</span></div>
                </div>
              </article>
              {/* Review 4 */}
              <article className={`review-card ${currentReview === 3 ? 'active' : ''}`} style={{ display: currentReview === 3 ? 'block' : 'none' }}>
                <div className="review-stars">★★★★★</div>
                <p>"الحمد لله كانت رحلة جميلة جداً. التنظيم ممتاز والفندق والمواصلات كانوا على مستوى عالي. ربنا يبارك لكم."</p>
                <div className="review-user">
                  <div className="avatar">س</div>
                  <div><strong>سارة محمود</strong><span>رحلة عمرة</span></div>
                </div>
              </article>
            </div>

            <button className="slider-button next" onClick={nextReviewSlide}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

          <div className="slider-dots">
            {[0, 1, 2, 3].map(index => (
              <button key={index} className={`dot ${currentReview === index ? 'active' : ''}`} onClick={() => setCurrentReview(index)}></button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="section-heading centered">
            <span>الأسئلة الشائعة</span>
            <h2>هل لديك <strong>استفسار؟</strong></h2>
          </div>
          <div className="faq-container">
            {/* السؤال 1 */}
            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}>
                <span>ما الأوراق المطلوبة للحجز؟</span>
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer" style={{ display: activeFaq === 0 ? 'block' : 'none' }}>
                <p>تختلف المستندات المطلوبة حسب نوع الرحلة والجنسية والأنظمة المعمول بها وقت السفر، وسيساعدك فريقنا في معرفة كل المستندات المطلوبة.</p>
              </div>
            </div>
            {/* السؤال 2 */}
            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
                <span>هل الأسعار تشمل تذاكر الطيران؟</span>
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer" style={{ display: activeFaq === 1 ? 'block' : 'none' }}>
                <p>تختلف حسب البرنامج والباقات المتاحة. يمكنك التواصل معنا لمعرفة ما يشمله كل برنامج بالتحديد.</p>
              </div>
            </div>
            {/* السؤال 3 */}
            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
                <span>هل يوجد مواصلات من وإلى المطار؟</span>
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer" style={{ display: activeFaq === 2 ? 'block' : 'none' }}>
                <p>نعم، تتوفر خدمات النقل حسب البرنامج الذي تختاره.</p>
              </div>
            </div>
            {/* السؤال 4 */}
            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}>
                <span>هل يمكن عمل برنامج خاص؟</span>
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer" style={{ display: activeFaq === 3 ? 'block' : 'none' }}>
                <p>نعم، يمكننا تجهيز برامج مخصصة للأفراد والعائلات والمجموعات حسب احتياجاتكم.</p>
              </div>
            </div>
            {/* السؤال 5 */}
            <div className={`faq-item ${activeFaq === 4 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}>
                <span>كيف يتم الحجز؟</span>
                <i className="fa-solid fa-plus"></i>
              </button>
              <div className="faq-answer" style={{ display: activeFaq === 4 ? 'block' : 'none' }}>
                <p>يمكنك التواصل معنا عبر WhatsApp أو الهاتف أو نموذج التواصل الموجود في الموقع، وسيقوم فريقنا بمساعدتك في إتمام الحجز.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className="cta">
        <div className="container cta-container">
          <div>
            <span>مستعد لرحلتك؟</span>
            <h2>ابدأ رحلتك إلى بيت الله اليوم</h2>
            <p>دعنا نهتم بكل تفاصيل الرحلة واترك لك متعة العبادة.</p>
          </div>
          <a href="#contact" className="btn btn-white">احجز رحلتك الآن <i className="fa-solid fa-arrow-left"></i></a>
        </div>
      </section>

      {/* ========================= CONTACT ========================= */}
      <section className="contact section" id="contact">
        <div className="container">
          <div className="section-heading centered">
            <span>تواصل معنا</span>
            <h2>نحن هنا <strong>لمساعدتك</strong></h2>
            <p>اترك لنا رسالتك وسيتواصل معك فريقنا في أقرب وقت.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <span>اتصل بنا</span>
                  <a href="tel:+201001722692">2692 172 100 02+</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><i className="fa-brands fa-whatsapp"></i></div>
                <div>
                  <span>WhatsApp</span>
                  <a href="https://wa.me/201001722692" target="_blank" rel="noreferrer">تواصل معنا على واتساب</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <span>البريد الإلكتروني</span>
                  <a href="mailto:Sunsharmtours2000@gmail.com">Sunsharmtours2000@gmail.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div>
                  <span>العنوان</span>
                  <p>الزقازيق، جمهورية مصر العربية</p>
                </div>
              </div>
              <div className="social-links">
                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
                <a href="#" aria-label="X"><i className="fa-brands fa-x-twitter"></i></a>
              </div>
            </div>

            <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">الاسم</label>
                  <input type="text" name="name" id="name" placeholder="اكتب اسمك" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <input type="tel" name="phone" id="phone" placeholder="01xxxxxxxxx" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input type="email" name="email" id="email" placeholder="example@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="service">الخدمة</label>
                <select name="service" id="service">
                  <option value="">اختر الخدمة</option>
                  <option value="umrah">برنامج عمرة</option>
                  <option value="hajj">برنامج حج</option>
                  <option value="hotel">حجز فندق</option>
                  <option value="flight">تذاكر طيران</option>
                  <option value="transport">مواصلات</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">رسالتك</label>
                <textarea name="message" id="message" rows="5" placeholder="اكتب رسالتك..." required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary form-button">
                إرسال الطلب <i className="fa-solid fa-paper-plane"></i>
              </button>

              {formMessage.text && (
                <p className="form-message" style={{ color: formMessage.type === 'error' ? '#c0392b' : '#0d5c4a', marginTop: '10px', fontWeight: 'bold' }}>
                  {formMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo footer-logo">
                <span className="logo-icon"><i className="fa-solid fa-kaaba"></i></span>
                <span>
                  <strong>صن شرم تورز</strong>
                  <small>للحج والعمرة</small>
                </span>
              </a>
              <p>رحلتك إلى بيت الله تستحق أن تكون أكثر راحة، تنظيماً وطمأنينة.</p>
              <div className="social-links">
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>روابط سريعة</h3>
              <a href="#home">الرئيسية</a>
              <a href="#about">من نحن</a>
              <a href="#services">خدماتنا</a>
              <a href="#packages">الباقات</a>
              <a href="#contact">تواصل معنا</a>
            </div>
            <div className="footer-column">
              <h3>خدماتنا</h3>
              <a href="#services">العمرة</a>
              <a href="#services">الحج</a>
              <a href="#services">الفنادق</a>
              <a href="#services">التأشيرات</a>
              <a href="#services">المواصلات</a>
            </div>
            <div className="footer-column">
              <h3>تواصل معنا</h3>
              <a href="tel:+201001722692">2692 172 100 02+</a>
              <a href="mailto:Sunsharmtours2000@gmail.com">Sunsharmtours2000@gmail.com</a>
              <span>مكتب رقم 1 مضمار الموتوسيكلات طريق السلام مدخل هالومي شرم الشيخ</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 صن شرم تورز للحج والعمرة. جميع الحقوق محفوظة.</p>
            <div>
              <a href="#">سياسة الخصوصية</a>
              <a href="#">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================= WhatsApp Floating Button ========================= */}
      <a href="https://wa.me/201001722692" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </>
  );
}

export default App;