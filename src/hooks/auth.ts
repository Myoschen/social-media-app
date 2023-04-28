import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, userCol } from '../libs/firebase';
import { ROUTES } from '../libs/routes';
import { useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { isUsernameExist } from '../utils/is-exist';
import { IUser } from '../libs/types';

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const snapshot = await getDoc(doc(userCol, authUser?.uid));
      setUser(snapshot.data()!);
      setLoading(false);
    };

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false);
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

type RegisterParams = {
  username: string;
  email: string;
  password: string;
  redirectTo?: ROUTES;
};

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const register = async ({
    username,
    email,
    password,
    redirectTo = ROUTES.DASHBOARD,
  }: RegisterParams) => {
    setLoading(true);
    const usernameExists = await isUsernameExist(username);
    if (usernameExists) {
      toast({
        title: 'Username already exists',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(userCol, credential.user.uid), {
          id: credential.user.uid,
          username: username.toLowerCase(),
          avatar: '',
          date: Date.now(),
        });
        toast({
          title: 'Account created',
          description: 'You are logged in',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        if (error instanceof FirebaseError) {
          toast({
            title: 'Signing up failed',
            description: error.message,
            status: 'error',
            isClosable: true,
            position: 'top',
            duration: 5000,
          });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return { register, isLoading };
}

type LoginParams = {
  email: string;
  password: string;
  redirectTo?: ROUTES;
};

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const login = async ({
    email,
    password,
    redirectTo = ROUTES.DASHBOARD,
  }: LoginParams) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      navigate(redirectTo);
      setLoading(false);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Logging in failed',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
      }
      setLoading(false);
      return false;
    }
  };

  return { login, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  const logout = async () => {
    if (await signOut()) {
      toast({
        title: 'Successfully logged out',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      navigate(ROUTES.LOGIN);
    }
  };
  return { logout, isLoading };
}
