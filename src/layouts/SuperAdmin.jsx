// Init
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Routes
import { superadminRoutes } from '../routes/routes';

import { Store, UpdateStore } from '../StoreContext';
import api from '../api';

function SuperAdmin() {
  const { admin } = Store();
  const { pathname } = useLocation();
  const updateStore = UpdateStore();

  useEffect(() => {
    api('get', '/admins/auth').then(({ data }) => {
      if (data.admin?.role === 'admin') {
        window.location = '/admin';
      }
      updateStore({ admin: data.admin, loggedIn: true });
    });

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const getRoutes = () => {
    let routes = [];
    if (admin.role === 'super_admin') {
      routes = superadminRoutes.map((route) => (
        <Route path={route.path} element={route.element} />
      ));
    }
    return routes;
  };

  return (
    <Routes>
      {getRoutes()}
      <Route path="/*" element={<Navigate replace to="/superadmin/admins" />} />
    </Routes>
  );
}
export default SuperAdmin;
