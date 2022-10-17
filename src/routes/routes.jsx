// Auth Routes
import Home from '../containers/Home';
import Login from '../containers/Login';

// Superadmin Routes
// eslint-disable-next-line import/no-cycle
import Admins from '../containers/superadmin/admins/Admins';
// eslint-disable-next-line import/no-cycle
import Services from '../containers/superadmin/services/Services';

// Icons
import admin from '../assets/images/admin.svg';
import service from '../assets/images/service.svg';

// unAuth routes
const unAuthRoutes = [
  {
    path: '/',
    name: 'Home Page',
    element: <Home />,
  },
];

// Routes for login
const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    layout: '/auth',
    element: <Login />,
  },
];

// Routes for Superadmin
const superadminRoutes = [
  {
    layout: '/superadmin',
    path: '/admins',
    name: 'Admins',
    icon: admin,
    element: <Admins />,
  },
  {
    layout: '/superadmin',
    path: '/services',
    name: 'Services',
    icon: service,
    element: <Services />,
  },
];

// Routes for patient
const adminRoutes = [];

// Getting all routes
// eslint-disable-next-line object-curly-newline
export { authRoutes, unAuthRoutes, superadminRoutes, adminRoutes };
