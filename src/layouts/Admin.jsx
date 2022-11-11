// Init
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Routes
import { adminRoutes } from '../routes/routes';

import { Store, UpdateStore } from '../StoreContext';
import api from '../api';
import Sidebar from '../components/Sidebar';
import Schedule from '../containers/admin/dashboard/schedule.jsx/schedule';

function Admin() {
  const { admin } = Store();
  const { pathname } = useLocation();
  const updateStore = UpdateStore();

  useEffect(() => {
    api('get', '/admins/auth').then(({ data }) => {
      if (data.admin?.role === 'superadmin') {
        window.location = '/superadmin';
      }
      updateStore({ admin: data.admin, loggedIn: true });
    });

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const getRoutes = () => {
    let routes = [];
    if (admin.role === 'admin') {
      // eslint-disable-next-line array-callback-return
      routes = adminRoutes.map((route) => {
        if (route.name === 'Services') {
          return route.child.map((child) => (
            <Route path={child.path} element={child.element} />
          ));
          // eslint-disable-next-line no-else-return
        } else {
          return <Route path={route.path} element={route.element} />;
        }
      });
    }
    // console.log(routes.flat());
    return routes.flat();
  };

  return (
    <>
      <Sidebar />

      <Routes>
        {getRoutes()}
        <Route path="/technicians/:id" element={<Schedule />} />
        <Route
          path="/*"
          element={<Navigate to="/admin/dashboard" />}
        />
      </Routes>
    </>
  );
}

export default Admin;
