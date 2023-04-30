import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Comment } from '@/types';
import { useToast } from '@chakra-ui/react';

type HookParams = Pick<Comment, 'uid' | 'postId'>;

export function useAddComment({ uid, postId }: HookParams) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addComment = async (text: string) => {
    setLoading(true);
    try {
      const id = nanoid();
      await setDoc(doc(collections.comment, id), {
        id,
        uid,
        postId,
        text,
        date: Date.now(),
      });
      toast({
        title: 'Comment added successfully',
        status: 'success',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: 'Failed to add comment',
          status: 'error',
          description: error.code,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { addComment, isLoading };
}

export default useAddComment;
