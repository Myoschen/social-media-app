import { doc, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, userCol } from '../libs/firebase';
import { useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export function useQueryUser(uid: string) {
  const docRef = doc(userCol, uid);
  const [user, isLoading] = useDocumentData(docRef);
  return { user, isLoading };
}

export function useUpdateProfile(uid: string, url: string) {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState<string | File>(url);
  const toast = useToast();
  const navigate = useNavigate();

  const updateProfile = async (username: string) => {
    setLoading(true);
    let avatarUrl;
    if (file instanceof File) {
      const fileRef = ref(storage, 'avatars/' + uid);
      await uploadBytes(fileRef, file);
      avatarUrl = await getDownloadURL(fileRef);
    } else {
      avatarUrl = file;
    }

    const docRef = doc(userCol, uid);
    await updateDoc(docRef, { avatar: avatarUrl, username });

    toast({
      title: 'Profile updated successfully!',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 5000,
    });

    setLoading(false);

    navigate(0);
  };

  return {
    updateProfile,
    setFile,
    isLoading,
    fileURL: typeof file === 'string' ? file : URL.createObjectURL(file),
  };
}

export function useQueryUsers() {
  const q = query(userCol);
  const [users, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { users, isLoading };
}
