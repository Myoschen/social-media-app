import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { userCol } from '@/libs/firebase';

function useQueryUser(uid: string) {
  const docRef = doc(userCol, uid);
  const [user, isLoading] = useDocumentData(docRef);
  return { user, isLoading };
}

export default useQueryUser;
