import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import AdminLayout from './AdminLayout'; 
import AdminTrips from './AdminTrips';
import TripForm from './Tripform'; 
import Home from './Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />

          {/* المسارات المحمية المغلفة بـ AdminLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/trips" element={<AdminTrips />} />
              <Route path="/admin/add-trip" element={<TripForm />} />
              <Route path="/admin/edit-trip/:id" element={<TripForm />} />
            </Route>
          </Route>
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;