import { FirebaseError } from 'firebase/app';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Post } from '@/types';
import { useToast } from '@chakra-ui/react';

function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addPost = async ({ uid, content }: Pick<Post, 'uid' | 'content'>) => {
    setLoading(true);
    try {
      const id = nanoid();
      const newPost: Post = {
        id,
        uid,
        content,
        totalLikes: 0,
        totalBookmarks: 0,
        totalComments: 0,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      await setDoc(doc(collections.post, id), newPost);
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
