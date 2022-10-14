// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Login from '../containers/Login';
import Admins from '../containers/superadmin/admins/Admins';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/superadmin" element={<Admins />} />
    </Routes>
  );
}
export default Index;
