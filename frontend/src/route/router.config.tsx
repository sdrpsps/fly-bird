import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import RouteGuard from '../RouteGuard';
import { lazy } from 'react';

const Sheet = lazy(() => import('../pages/Sheet'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />,
    children: [
      {
        path: '/sheet/:sheetId/:viewId',
        element: <Sheet />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default routes;
