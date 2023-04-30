import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { postCol } from '@/libs/firebase';
import { Post } from '@/types';
import { useToast } from '@chakra-ui/react';

function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async (post: Partial<Post>) => {
    setLoading(true);
    const id = nanoid();
    const docRef = doc(postCol, id);
    await setDoc(docRef, {
      ...post,
      id,
      date: Date.now(),
      likes: [] as string[],
    });
    toast({
      title: 'Post added successfully',
      status: 'success',
    });
    setLoading(false);
  };

  return { addPost, isLoading };
}

export default useAddPost;
