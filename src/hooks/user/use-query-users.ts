import { query } from 'firebase/firestore';
import { userCol } from '@/libs/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function useQueryUsers() {
  const q = query(userCol);
  const [users, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { users, isLoading };
}

export default useQueryUsers;
