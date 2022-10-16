// Init
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { unAuthRoutes } from './routes';

import Auth from '../layouts/Auth';
import SuperAdmin from '../layouts/SuperAdmin';
import Admin from '../layouts/Admin';

function Index() {
  return (
    <Routes>
      {unAuthRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path="auth/*" element={<Auth />} />
      <Route path="superadmin/*" element={<SuperAdmin />} />
      <Route path="admin/*" element={<Admin />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
export default Index;
