import { orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { commentCol } from '@/libs/firebase';

function useQueryComments(postId: string) {
  const q = query(
    commentCol,
    where('postId', '==', postId),
    orderBy('date', 'asc')
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { comments, isLoading };
}

export default useQueryComments;
