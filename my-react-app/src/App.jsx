import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

import Home from './Home';
import AdminTrips from './AdminTrips';
import TripForm from './Tripform'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/trips" element={<AdminTrips />} />
            <Route path="/admin/add-trip" element={<TripForm />} />
            <Route path="/admin/edit-trip/:id" element={<TripForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;