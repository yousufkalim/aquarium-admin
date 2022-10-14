// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import {
  authRoutes,
  unAuthRoutes,
  superadminRoutes,
  adminRoutes,
} from './routes';

import { Store } from '../StoreContext';

function Index() {
  const { user } = Store();

  const getRoutes = () => {
    let routes = [];
    if (user.role === 'superadmin') {
      routes = superadminRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    } else if (user.role === 'admin') {
      routes = adminRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    } else {
      routes = authRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    }
    return routes;
  };

  return (
    <Routes>
      {unAuthRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
      {getRoutes()}
    </Routes>
  );
}
export default Index;
