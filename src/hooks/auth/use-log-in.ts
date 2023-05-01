import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { getUserDetails } from '@/utils/firebase';
import { LoginInput } from '@/utils/form-schema';
import { useToast } from '@chakra-ui/react';
import useAuth from './use-auth';

function useLogin() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.HOME;
  const {
    state: { user },
    dispatch,
  } = useAuth();

  const login = async ({ email, password }: LoginInput) => {
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await getUserDetails(credential.user.uid);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
      }
      toast({
        title: 'Log in successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Log in failed',
          status: 'error',
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user]);

  return { login, loading };
}

export default useLogin;
