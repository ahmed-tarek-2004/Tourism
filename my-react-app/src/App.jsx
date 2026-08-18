import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import AdminTrips from './AdminTrips';
import TripForm from './Tripform'; 

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        
        <Route path="/admin/trips" element={<AdminTrips />} />
        
        <Route path="/admin/add-trip" element={<TripForm />} />

        <Route path="/admin/edit-trip/:id" element={<TripForm />} />
      
      </Routes>
    </Router>
  );
}

export default App;