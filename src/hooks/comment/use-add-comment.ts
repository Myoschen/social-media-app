import { FirebaseError } from 'firebase/app';
import {
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { collections } from '@/libs/firebase';
import { Comment } from '@/types';
import { useToast } from '@chakra-ui/react';

export function useAddComment() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  const addComment = async ({
    uid,
    pid,
    content,
  }: Pick<Comment, 'uid' | 'pid' | 'content'>) => {
    setLoading(true);
    try {
      const id = nanoid();
      const newComment: Comment = {
        id,
        uid,
        pid,
        content,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      await setDoc(doc(collections.comment, id), newComment);
      await updateDoc(doc(collections.post, pid), {
        totalComments: increment(1),
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
