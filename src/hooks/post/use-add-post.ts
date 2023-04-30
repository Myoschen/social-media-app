import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Post } from '@/types';
import { useToast } from '@chakra-ui/react';

function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async (post: Partial<Post>) => {
    setLoading(true);
    try {
      const id = nanoid();
      await setDoc(doc(collections.post, id), {
        ...post,
        id,
        date: Date.now(),
        likes: [] as string[],
      });
      toast({
        title: 'Post added successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Failed to add post',
          status: 'error',
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { addPost, isLoading };
}

export default useAddPost;
