import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The useAuth hook must be used in the AuthProvider.');
  }

  return context;
}

export default useAuth;
