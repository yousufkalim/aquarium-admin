// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Login from '../containers/Login';
import Admin from '../containers/superadmin/Admin';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin" element={<Admin />} />
    </Routes>
  );
}
export default Index;
