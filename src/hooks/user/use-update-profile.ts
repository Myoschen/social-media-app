import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, userCol } from '@/libs/firebase';
import { useToast } from '@chakra-ui/react';

function useUpdateProfile(uid: string, url: string) {
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
      title: 'Profile updated successfully',
      status: 'success',
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

export default useUpdateProfile;
