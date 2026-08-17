import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// استيراد الصفحات الخاصة بنا
import Home from './Home';
import AdminTrips from './AdminTrips';
import TripForm from './TripForm'; // الصفحة التي أعددناها في الرد السابق

function App() {
  return (
    <Router>
      <Routes>
        {/* المسار الافتراضي (Landing Page) */}
        <Route path="/" element={<Home />} />
        
        {/* صفحة عرض وإدارة الرحلات */}
        <Route path="/admin/trips" element={<AdminTrips />} />
        
        {/* صفحة إضافة رحلة جديدة */}
        <Route path="/admin/add-trip" element={<TripForm />} />
        
        {/* صفحة تعديل رحلة موجودة (تستقبل ID) */}
        <Route path="/admin/edit-trip/:id" element={<TripForm />} />
      </Routes>
    </Router>
  );
}

export default App;