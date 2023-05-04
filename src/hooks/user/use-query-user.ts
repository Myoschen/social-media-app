import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { collections } from '@/libs/firebase';
import { User } from '@/types';
import { useToast } from '@chakra-ui/react';

function useQueryUser(uid: string) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collections.user, uid),
      (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.data());
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: 'Failed to query user',
          status: 'error',
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, [uid]);

  return { user, isLoading };
}

export default useQueryUser;
