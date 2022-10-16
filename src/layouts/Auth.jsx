// Init
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Routes
import { authRoutes } from '../routes/routes';

function SuperAdmin() {
  const getRoutes = () => {
    let routes = [];
    if (!localStorage.getItem('token')) {
      routes = authRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    }
    return routes;
  };

  return (
    <Routes>
      {getRoutes()}
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
export default SuperAdmin;
