import { doc, getDoc, setDoc } from 'firebase/firestore';
import { collections } from '@/libs/firebase';
import { User } from '@/types';

const addUserDetails = async (uid: string, data: User) => {
  try {
    await setDoc(doc(collections.user, uid), data);
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (uid: string) => {
  try {
    const snapshot = await getDoc(doc(collections.user, uid));
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export { getUserDetails, addUserDetails };
