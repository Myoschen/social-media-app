import { onAuthStateChanged } from 'firebase/auth';
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';
import { FullLoading } from '@/components/ui';
import { auth } from '@/libs/firebase';
import { Nullable, User } from '@/types';
import { getUserDetails } from '@/utils/firebase';

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_AUTH'; payload: Partial<User> }
  | { type: 'CHECK_AUTH'; payload: Nullable<User> };

type AuthState = {
  user: Nullable<User>;
  isInitialChecking: boolean;
};

const initialState: AuthState = {
  user: null,
  isInitialChecking: true,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'UPDATE_AUTH':
      const user = { ...state.user, ...action.payload } as User;
      return { ...state, user };
    case 'CHECK_AUTH':
      return {
        ...state,
        user: action.payload,
        isInitialChecking: false,
      };
    default:
      return state;
  }
};

type AuthContext = {
  user: AuthState['user'];
  dispatch: Dispatch<AuthAction>;
};

const AuthCtx = createContext<Nullable<AuthContext>>(null);

interface ProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: ProviderProps) {
  const [{ user, isInitialChecking }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (credential) => {
      try {
        // set user to null if no credential
        if (!credential) {
          dispatch({ type: 'CHECK_AUTH', payload: null });
        } else {
          const user = await getUserDetails(credential.uid);
          dispatch({ type: 'CHECK_AUTH', payload: user });
        }
      } catch (error) {
        throw error;
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    // show the loading page until user data is loaded
    <AuthCtx.Provider value={{ user, dispatch }}>
      {isInitialChecking ? <FullLoading /> : children}
    </AuthCtx.Provider>
  );
}

export { AuthProvider, AuthCtx };
