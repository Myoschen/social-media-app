import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { collections } from '@/libs/firebase';
import { Posts } from '@/types';
import { useToast } from '@chakra-ui/react';

function useQueryPosts(uid?: string) {
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const q = uid
      ? query(
          collections.post,
          where('uid', '==', uid),
          orderBy('date', 'desc')
        )
      : query(collections.post, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          setPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
        } else {
          setPosts([]);
        }
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: 'Failed to query posts',
          status: 'error',
          description: error.code,
        });
      }
    );
    return () => unsubscribe();
  }, [uid]);

  return { posts, isLoading };
}

export default useQueryPosts;
