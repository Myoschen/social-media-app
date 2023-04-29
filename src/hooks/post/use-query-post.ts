import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { postCol } from '@/libs/firebase';

function useQueryPost(id: string) {
  const docRef = doc(postCol, id);
  const [post, isLoading, error] = useDocumentData(docRef);
  if (error) throw error;
  return { post, isLoading };
}

export default useQueryPost;
