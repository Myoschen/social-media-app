import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout';
import AllUsersPage from '@/pages/all-users';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import PostDetailsPage from '@/pages/post-details';
import ProfilePage from '@/pages/profile';
import SignUpPage from '@/pages/sign-up';

export const enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  AUTHORIZED = '/a',
  DASHBOARD = '/a/dashboard',
  USERS = '/a/users',
  PROFILE = '/a/profile/:id',
  POSTS = '/a/posts/:id',
}

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.LOGIN} />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.AUTHORIZED,
    element: <ProtectedLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <HomePage />,
      },
      {
        path: ROUTES.USERS,
        element: <AllUsersPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.POSTS,
        element: <PostDetailsPage />,
      },
    ],
  },
]);
