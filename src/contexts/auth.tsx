import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';
import { FullLoading } from '@/components/ui';
import { auth } from '@/libs/firebase';
import { Nullable, User } from '@/types';
import { getUserDetails } from '@/utils/firebase';

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
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

type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<Nullable<AuthContextType>>(null);

interface ProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.isInitialChecking ? <FullLoading /> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
