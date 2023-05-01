import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout, AuthLayout } from '@/components/layout';
import AllUsersPage from '@/pages/all-users';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import PostDetailsPage from '@/pages/post-details';
import ProfilePage from '@/pages/profile';
import SignUpPage from '@/pages/sign-up';

export const enum ROUTES {
  ROOT = '/',
  LANDING = '/landing',
  HOME = '/home',
  USERS = '/users',
  USER_DETAILS = '/users/:id',
  POST_DETAILS = '/posts/:id',
  AUTH = '/auth',
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
}

export const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: (
      <div
        style={{
          backgroundColor: '#222',
          color: '#eee',
          fontSize: '2rem',
          fontWeight: '700',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Landing Page (under construction)
      </div>
    ),
  },
  {
    path: ROUTES.AUTH,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace={true} />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: ROUTES.ROOT,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.HOME} replace={true} />,
      },
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.USERS,
        element: <AllUsersPage />,
      },
      {
        path: ROUTES.USER_DETAILS,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.POST_DETAILS,
        element: <PostDetailsPage />,
      },
    ],
  },
]);
