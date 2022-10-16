// Init
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Routes
import { adminRoutes } from '../routes/routes';

import { Store, UpdateStore } from '../StoreContext';
import api from '../api';

function Admin() {
  const { admin } = Store();
  const { pathname } = useLocation();
  const updateStore = UpdateStore();

  useEffect(() => {
    api('get', '/admins/auth').then(({ data }) => {
      if (data.admin?.role === 'super_admin') {
        window.location = '/superadmin';
      }
      updateStore({ admin: data.admin, loggedIn: true });
    });

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const getRoutes = () => {
    let routes = [];
    if (admin.role === 'admin') {
      routes = adminRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    }
    return routes;
  };

  return (
    <Routes>
      {getRoutes()}
      <Route path="/*" element={<Navigate replace to="/admin/technicians" />} />
    </Routes>
  );
}

export default Admin;
