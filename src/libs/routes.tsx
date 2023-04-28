import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Error from '@/components/common/Error';
import Dashboard from '@/components/dashboard';
import Layout from '@/components/layout';
import PostDetail from '@/components/post-detail';
import Profile from '@/components/profile';
import AllUsers from '@/components/users';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  PROTECTED = '/protected',
  DASHBOARD = '/protected/dashboard',
  USERS = '/protected/users',
  PROFILE = '/protected/profile/:id',
  POSTS = '/protected/posts/:id',
}

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.PROTECTED,
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.USERS,
        element: <AllUsers />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTES.POSTS,
        element: <PostDetail />,
      },
    ],
  },
]);
