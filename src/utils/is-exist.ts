import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../libs/firebase';

export async function isUsernameExist(username: string) {
  const q = query(
    collection(database, 'users'),
    where('username', '==', username)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}
