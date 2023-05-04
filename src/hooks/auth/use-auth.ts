import { useContext } from 'react';
import { AuthCtx } from '@/contexts/auth';

function useAuth() {
  const context = useContext(AuthCtx);

  if (!context) {
    throw new Error('The useAuth hook must be used in the AuthProvider.');
  }

  return context;
}

export default useAuth;
