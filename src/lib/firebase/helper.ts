import { doc, getDoc, setDoc } from "firebase/firestore";
import { collections } from "./config";
import { User } from "@/types";

export const addUserDetails = async (uid: string, data: User) => {
  try {
    await setDoc(doc(collections.user, uid), data);
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (uid: string) => {
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
