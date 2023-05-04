import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/libs/firebase';
import { ROUTES } from '@/libs/routes';
import { User } from '@/types';
import { addUserDetails } from '@/utils/firebase';
import { SignUpInput } from '@/utils/form-schema';
import { useToast } from '@chakra-ui/react';
import useAuth from './use-auth';

function useSignUp() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  const signUp = async ({
    username,
    email,
    password,
  }: Omit<SignUpInput, 'confirmPassword'>) => {
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: User = {
        id: credential.user.uid,
        username: username,
        avatar: '',
        bio: '',
        likes: [],
        bookmarks: [],
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      await addUserDetails(credential.user.uid, user);
      dispatch({ type: 'LOGIN', payload: user });
      toast({
        title: 'Sign up successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Sign up failed',
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
      navigate(ROUTES.HOME);
    }
  }, [user]);

  return { signUp, loading };
}

export default useSignUp;
