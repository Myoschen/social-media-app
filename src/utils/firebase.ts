import { doc, getDoc, setDoc } from 'firebase/firestore';
import { userCol } from '@/libs/firebase';
import { User } from '@/types';

const addUserDetails = async (uid: string, data: User) => {
  try {
    await setDoc(doc(userCol, uid), data);
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (uid: string) => {
  try {
    const snapshot = await getDoc(doc(userCol, uid));
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export { getUserDetails, addUserDetails };
