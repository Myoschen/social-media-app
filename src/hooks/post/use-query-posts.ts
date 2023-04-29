import { orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { postCol } from '@/libs/firebase';

function useQueryPosts(uid?: string) {
  const q = uid
    ? query(postCol, where('uid', '==', uid), orderBy('date', 'desc'))
    : query(postCol, orderBy('date', 'desc'));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}

export default useQueryPosts;
