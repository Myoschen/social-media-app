import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { useToast } from '@chakra-ui/react';
import useAuth from './use-auth';

function useLogout() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      toast({
        title: 'Log out successfully',
        status: 'success',
      });
      navigate(ROUTES.ROOT);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Log out failed',
          status: 'error',
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}

export default useLogout;
