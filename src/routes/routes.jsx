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

// Routes for login
const AuthRoutes = [
  {
    path: '/',
    name: 'Home Page',
    element: <Home />,
  },
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
];

// Routes for Superadmin
const superadminRoutes = [
  {
    path: '/admins',
    name: 'Admins',
    icon: admin,
    element: <Admins />,
  },
  {
    path: '/services',
    name: 'Services',
    icon: service,
    element: <Services />,
  },
];

// Routes for patient
const adminRoutes = [
  {
    path: '/admins',
    name: 'Admins',
    icon: admin,
    element: <Admins />,
  },
  {
    path: '/services',
    name: 'Services',
    icon: service,
    element: <Services />,
  },
];

// Getting all routes
export { AuthRoutes, superadminRoutes, adminRoutes };
